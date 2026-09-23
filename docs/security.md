# Genius Hub — Security Architecture & Standards

## 1. Security Philosophy

Genius Hub handles sensitive organizational data, beneficiary records, student applications, e-commerce transactions, and administrative governance. The platform is designed following **OWASP Top 10** and **OWASP Application Security Verification Standard (ASVS)** benchmarks:

- **Defense in Depth**: Security controls operate across multiple layers (network, gateway, application runtime, database, storage).
- **Least Privilege**: Users, services, and background workers operate with the minimum permissions required.
- **Secure by Default**: Default configurations are hardened; security mechanisms cannot be bypassed by omitting configuration.

---

## 2. Implemented Foundation (Phase 01)

The following baseline security measures are actively implemented in the Phase 01 foundation:

### A. Strict Environment Variable Isolation & Validation
- Environment variables are categorized into server-only and browser-public (`NEXT_PUBLIC_`) in `.env.example`.
- All runtime variables are validated via strict Zod schemas in `src/config/env.ts`.
- Server secrets are blocked from client runtime leaking.

### B. HTTP Hardening Headers
Configured in `next.config.ts` across all incoming routes:
- **Strict-Transport-Security (HSTS)**: `max-age=63072000; includeSubDomains; preload`
- **X-Content-Type-Options**: `nosniff` (mitigates MIME-type sniffing attacks)
- **X-Frame-Options**: `SAMEORIGIN` (mitigates clickjacking)
- **Referrer-Policy**: `origin-when-cross-origin`
- **Permissions-Policy**: `camera=(), microphone=(), geolocation=()` (restricts browser hardware access)
- **X-Powered-By**: Disabled (`poweredByHeader: false`) to avoid technology disclosure.

### C. Git Hygiene & Secret Exclusion
- Comprehensive `.gitignore` preventing `.env`, `.env.local`, `.env.production`, logs, build outputs, and local database files from entering version control.
- CI pipeline validates lockfile integrity (`--frozen-lockfile`) to protect against dependency drift.

### D. Strict Static Type Checking & Code Quality
- Strict TypeScript configuration (`noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`) prevents runtime `undefined` vulnerabilities and prototype pollution vectors.
- ESLint rules enforce code quality and prevent dangerous constructs.

---

## 3. Planned Security Architecture (Subsequent Phases)

The following security systems will be implemented as their corresponding product domains are developed:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        WAF / Cloudflare Proxy                          │
│               DDoS Mitigation • Rate Limiting • Bot Filter             │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │
┌──────────────────────────────────▼─────────────────────────────────────┐
│                       Next.js Edge Middleware                          │
│          Session Validation • Dynamic Nonce CSP • IP Throttling        │
└──────────────────┬───────────────────┬─────────────────────────────────┘
                   │                   │
┌──────────────────▼───────────┐ ┌─────▼─────────────────────────────────┐
│        Public Domains        │ │     Admin / Protected Operations      │
│ CSRF Checks • Zod Validation │ │ MFA • RBAC Enforcement • Audit Logger │
└──────────────────┬───────────┘ └─────┬─────────────────────────────────┘
                   │                   │
┌──────────────────▼───────────────────▼─────────────────────────────────┐
│             PostgreSQL Data Layer (Encrypted at Rest)                  │
│       Role-based DB credentials • Parameterized Queries • PITR         │
└────────────────────────────────────────────────────────────────────────┘
```

### 1. Authentication & Session Management
- Multi-factor authentication (MFA) using TOTP (authenticator apps) for all staff and administrative accounts.
- Password hashing using Argon2id or bcrypt with high work factor.
- Secure HTTP-only, `SameSite=Lax`/`Strict`, `Secure` session cookies.
- Absolute session timeouts and sliding inactivity timeouts.

### 2. Role-Based Access Control (RBAC) & Approvals
- Granular permissions model supporting roles such as:
  - `Super Admin`
  - `Programme Manager`
  - `Admissions Reviewer`
  - `Editorial Staff`
  - `Finance Administrator`
  - `Beneficiary / Student`
  - `Partner`
- Multi-stage approval workflows for sensitive actions (grant disbursement, applicant admissions, product price overrides).

### 3. Immutable Audit Logging
- Dedicated audit table capturing: actor ID, action type, resource ID, IP address, user agent, timestamp, before/after state diff.
- Append-only audit logs protected from administrative tampering.

### 4. Rate Limiting & Abuse Prevention
- Distributed rate limiting powered by Redis (sliding window algorithm):
  - Strict limits on `/api/auth/*` (brute-force defense).
  - Throttling on public application submission endpoints.
  - Payment webhook endpoints limited by IP/signature.

### 5. Content Security Policy (CSP) & Nonces
- Dynamic CSP generated via Next.js Middleware with cryptographic nonces for scripts and styles.
- Strict `connect-src`, `img-src`, and `frame-ancestors` directives.

### 6. Payment Security & Webhook Verification
- Never storing sensitive raw cardholder data (delegated to PCI-DSS compliant providers: Paystack / Flutterwave).
- Cryptographic HMAC SHA-512 signature validation on all incoming webhook payloads before processing events.
- Idempotency keys on all transaction records to prevent double billing or replay attacks.

### 7. File Upload Safety & Media Storage
- All uploaded files (resumes, beneficiary verification documents, gallery media) validated for:
  - Genuine MIME type (magic byte inspection, not file extension).
  - Maximum size constraints.
- Storage in isolated private S3 buckets with time-limited pre-signed download URLs.
- Automated malware/virus scanning pipeline on upload.

### 8. Email Security & Anti-Spoofing
- Amazon SES integration configured with SPF, DKIM, and DMARC enforcement.
- Rate-limited notification queues to prevent outbound spam abuse.

