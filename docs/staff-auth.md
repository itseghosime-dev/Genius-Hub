# Staff Authentication, Lifecycle & Invitation System

This guide outlines the authentication architecture, cryptographic invitation lifecycle, and account management for Genius Hub staff members.

---

## 1. Staff Identity Model

Staff accounts are managed in the `users` collection within Payload CMS:

- **Authentication**: Managed natively by Payload using robust cryptographic password hashing (Argon2 / bcrypt / scrypt).
- **Required Identity**: Valid email address and full name.
- **Account Statuses**:
  - `invited`: Initial state when an onboarding invitation is dispatched.
  - `active`: Operational account capable of authenticating and executing permitted actions.
  - `suspended`: Temporarily blocked account (cannot log in; retains audit attribution).
  - `disabled`: Permanently deactivated account (cannot log in; retains audit attribution).

> [!IMPORTANT]
> Staff records are **never hard-deleted** when access is revoked. Inactive accounts are marked `disabled` or `suspended` to maintain historical attribution across audit trails and editorial authorship.

---

## 2. Cryptographic Invitation Workflow

Staff onboarding follows a zero-trust, cryptographic token workflow:

```mermaid
sequenceDiagram
    autonumber
    actor Admin as Super Admin / Admin
    participant Server as Genius Hub Backend
    participant DB as PostgreSQL Database
    participant Email as Email Service
    actor Staff as New Staff Member

    Admin->>Server: Create Invitation (email, name, roles)
    Server->>Server: Generate secure 32-byte token
    Server->>Server: Compute SHA-256 token hash
    Server->>DB: Save Invitation (tokenHash, status: 'pending', expiresAt: 7d)
    Server->>Email: Send Activation Email with single-use URL
    Server->>DB: Record Audit Log (user.invited)

    Staff->>Server: Open Activation URL & Submit Password
    Server->>DB: Lookup Invitation by SHA-256 hash
    Server->>Server: Verify token validity (not expired, pending)
    Server->>DB: Create/Activate User (status: 'active', password, roles)
    Server->>DB: Mark Invitation 'accepted'
    Server->>DB: Record Audit Logs (invitation.accepted, user.activated)
    Server-->>Staff: Return Success (Redirect to /admin login)
```

### Security Properties:

1. **No Plaintext Token Persistence**: Only the SHA-256 hash of the 32-byte token is stored in the database.
2. **Single-Use Enforcement**: Upon successful password creation, the invitation status changes to `accepted` and cannot be reused.
3. **Time-Limited Expiration**: Invitations expire 7 days after issuance by default.
4. **Revocability**: Administrators can revoke pending invitations at any time before acceptance.
5. **No Password Transmission**: Passwords are never sent via email or generated as reusable defaults.

---

## 3. Account Lifecycle Management

Administrators with `users.suspend` or `users.disable` permissions can manage account states:

- **Suspension**: Setting `status: 'suspended'` immediately blocks authentication across the Payload Admin Panel and APIs.
- **Reactivation**: Setting `status: 'active'` restores account privileges.
- **Role Reassignment**: Setting `roles` requires `users.update_roles` or `super_admin`. Every status or role mutation is recorded in `AuditLogs` with before/after state snapshots.

---

## 4. Multi-Factor Authentication (MFA) & Session Security

- **MFA Readiness**: A readiness configuration flag `mfaRequired` is incorporated into the `users` schema in preparation for production TOTP enforcement. Active second-factor enforcement is explicitly deferred to later phases.
- **Brute-Force Protection**: Configured with `maxLoginAttempts: 5` and a 10-minute lockout window (`lockTime: 600000`).
- **Session & Reset Token Expiration**: Configured with `tokenExpiration: 7200` (2-hour lifetime for sessions and password reset tokens).
- **Session Cookies**: In production, Payload session cookies are configured with `httpOnly`, `sameSite: 'lax'`, and `secure: true`.
- **Immediate Revocation upon Disablement/Suspension**: All server-side permission checks (`hasPermission`, `hasAnyPermission`, `hasAllPermissions`, `hasRole`, `superAdminOnlyAccess`, etc.) strictly require `user.status === 'active'`. If an active staff account is suspended or disabled, any subsequent operation by that authenticated identity is immediately denied.

---

## 5. Password Reset Lifecycle

1. **Standard Cryptographic Handling**: Uses Payload's native password reset flow with high-entropy cryptographic reset tokens.
2. **Token Expiration**: Password reset tokens expire after 2 hours (`tokenExpiration: 7200`).
3. **No Plaintext Passwords**: Passwords are never sent via email. They are securely hashed using Payload's standard cryptographic algorithms (Argon2 / bcrypt) prior to storage.
4. **Account Enumeration Mitigation**: Generic responses are provided to prevent verifying whether an email address exists in the system.
5. **Disabled Account Exclusion**: Suspended or disabled staff cannot use password reset to regain authorized operational access, as server-side access controls require `status === 'active'`.
