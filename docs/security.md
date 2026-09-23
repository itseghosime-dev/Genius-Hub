# Genius Hub — Security Architecture & Standards

## 1. Security Philosophy

Genius Hub handles sensitive organizational data, beneficiary records, student applications, e-commerce transactions, and administrative governance. The platform is designed following **OWASP Top 10** and **OWASP Application Security Verification Standard (ASVS)** benchmarks:

- **Defense in Depth**: Security controls operate across multiple layers (network, edge gateway, application runtime, database, storage).
- **Least Privilege**: Users, services, and background workers operate with the minimum permissions required.
- **Server-Side Enforcement**: Client UI elements are never treated as security boundaries.
- **Secure by Default**: Default configurations are hardened; security mechanisms cannot be bypassed by omitting configuration.

---

## 2. Implemented Security Controls

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

### C. Database Access & Parameterized Queries

- All standard database operations are executed through Payload's PostgreSQL adapter (`@payloadcms/db-postgres`), which issues parameterized SQL queries under the hood.
- Any future raw SQL queries or custom reporting views must explicitly use parameterized queries and prepared statements to eliminate SQL injection vulnerabilities.

### D. Staff Identity, Password Resets & Role-Based Access Control (Phase 03)

- **Strict Separation of Identities**: The `users` collection is dedicated solely to internal staff and governance. Public users, students, and applicants are separated into distinct domain models.
- **Role & Permission Mapping**: Centralized mapping in `src/lib/access/` resolving 10 staff roles (`super_admin`, `admin`, `content_editor`, `content_approver`, `events_manager`, `programmes_manager`, `media_manager`, `applications_manager`, `commerce_manager`, `communications_manager`) to namespaced permissions.
- **Founder / Super Admin Model**: The founder (**Isimeme Whyte**) is granted `super_admin` through role assignment rather than hardcoded string matching. Super Admin has full administrative and emergency publishing privileges while remaining subject to full audit logging.
- **Account State Enforcement**: Suspended (`status: 'suspended'`) and disabled (`status: 'disabled'`) staff accounts are immediately blocked from authentication and all server-side operations, even if an authenticated session previously existed.
- **Password Reset Security**: Native Payload password resets with 2-hour token expiration (`tokenExpiration: 7200`), Argon2/bcrypt password hashing, no plaintext transmission, and enumeration mitigation.
- **MFA Readiness**: A readiness flag `mfaRequired` is integrated into the schema; active multi-factor enforcement is scheduled for subsequent phases.

### E. Cryptographic Invitation System (Phase 03)

- Single-use, time-limited staff onboarding invitations stored in `staff-invitations`.
- **Zero Plaintext Storage**: Only SHA-256 hashes of high-entropy 32-byte tokens are stored in the database.
- **Lifecycle Guarantees**: Enforces single-use consumption, 7-day expiration, and administrative revocation. Passwords are never sent over email.

### F. Immutable Administrative Audit Logging (Phase 03)

- Dedicated `audit-logs` collection capturing actor, action, target resource, IP address, user agent, and before/after diffs.
- **Tamper-Resistance**: Client `create`, `update`, and `delete` access functions evaluate to `false`. Audit logs are strictly written by internal system services.
- **Data Sanitization**: All logged payloads pass through deep sanitization stripping passwords, hashes, salts, session tokens, and API keys.

### G. Content Review Governance & Separation of Duties (Phase 03)

- Draft $\rightarrow$ Review $\rightarrow$ Changes Requested $\rightarrow$ Approved $\rightarrow$ Published workflow.
- **Separation of Duties**: Authors cannot approve their own submissions. Approval requires an independent approver with `*.approve` permission (with emergency override reserved for `super_admin`).

---

## 3. Planned Security Architecture (Subsequent Phases)

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

### 1. Multi-Factor Authentication (MFA)

- TOTP authenticator enforcement for all privileged staff accounts.

### 2. Distributed Rate Limiting

- Redis-backed sliding window rate limiting on `/api/auth/*` and public submission forms.

### 3. Payment Security & Webhooks

- Delegated PCI-DSS processing (Paystack / Flutterwave) with HMAC SHA-512 signature validation and transaction idempotency keys.

### 4. Media Quarantine & Malware Scanning

- Automated scanning on object storage ingestion with isolated pre-signed URLs.
