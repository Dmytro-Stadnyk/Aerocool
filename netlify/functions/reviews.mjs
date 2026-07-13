import { createHash } from "node:crypto";
import { getDatabase } from "@netlify/database";

const VALID_LANGUAGES = new Set(["uk", "ru"]);
const VALID_TARGET_TYPES = new Set(["product"]);
const MIN_REVIEW_LENGTH = 20;
const MAX_REVIEW_LENGTH = 2000;
const MAX_NAME_LENGTH = 80;
const MAX_EMAIL_LENGTH = 254;
const PRIVACY_POLICY_VERSION = "2026-07-13";

const noStoreHeaders = {
  "Cache-Control": "no-store",
};

export default async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: {
        ...noStoreHeaders,
        Allow: "POST",
      },
    });
  }

  let form;

  try {
    form = await parseRequestBody(req);
  } catch {
    return textResponse("Unsupported review request.", 415);
  }

  const targetUrl = getFormValue(form, "target_url");

  if (getFormValue(form, "bot-field")) {
    return redirectToProduct(targetUrl, "received");
  }

  const review = {
    targetType: getFormValue(form, "target_type"),
    targetId: getFormValue(form, "target_id"),
    targetUrl,
    language: getFormValue(form, "language"),
    rating: Number.parseInt(getFormValue(form, "rating"), 10),
    authorName: normalizeInlineText(getFormValue(form, "author_name")),
    authorEmail: getFormValue(form, "author_email").toLowerCase(),
    body: normalizeReviewBody(getFormValue(form, "body")),
    privacyConsent: getFormValue(form, "privacy_consent"),
  };

  const validationError = validateReview(review);

  if (validationError) {
    return textResponse(validationError, 400);
  }

  const authorEmailHash = hashEmail(review.authorEmail);
  const db = getDatabase();

  try {
    await db.sql`
      INSERT INTO reviews (
        target_type,
        target_id,
        target_url,
        language,
        rating,
        author_name,
        author_email,
        author_email_hash,
        body,
        status,
        privacy_consent,
        privacy_consent_at,
        privacy_policy_version
      )
      VALUES (
        ${review.targetType},
        ${review.targetId},
        ${review.targetUrl},
        ${review.language},
        ${review.rating},
        ${review.authorName},
        ${review.authorEmail},
        ${authorEmailHash},
        ${review.body},
        ${"pending"},
        ${true},
        NOW(),
        ${PRIVACY_POLICY_VERSION}
      )
    `;
  } catch (error) {
    console.error("Failed to save review", error);
    return textResponse("Review could not be saved.", 500);
  }

  return redirectToProduct(review.targetUrl, "pending");
};

export const config = {
  path: "/api/reviews",
};

async function parseRequestBody(req) {
  const contentType = req.headers.get("content-type") || "";

  if (
    contentType.includes("application/x-www-form-urlencoded") ||
    contentType.includes("multipart/form-data")
  ) {
    return req.formData();
  }

  if (contentType.includes("application/json")) {
    const data = await req.json();
    return new Map(Object.entries(data));
  }

  throw new Error("Unsupported content type");
}

function getFormValue(form, name) {
  const value = form.get(name);

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

function normalizeInlineText(value) {
  return stripHtml(value).replace(/\s+/g, " ").trim();
}

function normalizeReviewBody(value) {
  return stripHtml(value)
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function stripHtml(value) {
  return value.replace(/<[^>]*>/g, " ");
}

function validateReview(review) {
  if (!VALID_TARGET_TYPES.has(review.targetType)) {
    return "Unknown review target type.";
  }

  if (!/^[a-z0-9][a-z0-9._:-]{1,120}$/i.test(review.targetId)) {
    return "Invalid review target.";
  }

  if (!isProductUrl(review.targetUrl)) {
    return "Invalid product URL.";
  }

  if (!VALID_LANGUAGES.has(review.language)) {
    return "Invalid review language.";
  }

  if (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5) {
    return "Rating must be between 1 and 5.";
  }

  if (!review.authorName || review.authorName.length > MAX_NAME_LENGTH) {
    return "Author name is required.";
  }

  if (!isValidEmail(review.authorEmail)) {
    return "Valid email is required.";
  }

  if (review.authorEmail.length > MAX_EMAIL_LENGTH) {
    return "Email is too long.";
  }

  if (
    review.body.length < MIN_REVIEW_LENGTH ||
    review.body.length > MAX_REVIEW_LENGTH
  ) {
    return "Review length is invalid.";
  }

  if (review.privacyConsent !== "accepted") {
    return "Privacy consent is required.";
  }

  return "";
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isProductUrl(value) {
  const path = getSafeProductPath(value);
  return Boolean(path);
}

function getSafeProductPath(value) {
  try {
    const url = new URL(value, "https://aerocool.ua");

    if (
      url.pathname.startsWith("/products/") ||
      url.pathname.startsWith("/ru/products/")
    ) {
      return url.pathname;
    }
  } catch {
    return "";
  }

  return "";
}

function hashEmail(email) {
  const salt = globalThis.process?.env?.REVIEW_EMAIL_HASH_SALT || "";

  return createHash("sha256")
    .update(`${salt}:${email}`)
    .digest("hex");
}

function redirectToProduct(targetUrl, state) {
  const path = getSafeProductPath(targetUrl) || "/";
  const separator = path.includes("?") ? "&" : "?";

  return new Response(null, {
    status: 303,
    headers: {
      ...noStoreHeaders,
      Location: `${path}${separator}review=${state}#reviews`,
    },
  });
}

function textResponse(message, status) {
  return new Response(message, {
    status,
    headers: {
      ...noStoreHeaders,
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
