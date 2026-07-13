ALTER TABLE reviews
ADD COLUMN privacy_consent BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN privacy_consent_at TIMESTAMPTZ,
ADD COLUMN privacy_policy_version TEXT;

ALTER TABLE reviews
ADD CONSTRAINT reviews_privacy_consent_evidence_check
CHECK (
  NOT privacy_consent
  OR (privacy_consent_at IS NOT NULL AND privacy_policy_version IS NOT NULL)
);
