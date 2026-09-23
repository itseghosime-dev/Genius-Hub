import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Enums
    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_status" AS ENUM('active', 'invited', 'suspended', 'disabled');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_users_roles" AS ENUM(
        'super_admin', 'admin', 'content_editor', 'content_approver',
        'events_manager', 'programmes_manager', 'media_manager',
        'applications_manager', 'commerce_manager', 'communications_manager'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_staff_invitations_status" AS ENUM('pending', 'accepted', 'expired', 'revoked');
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      CREATE TYPE "public"."enum_staff_invitations_roles" AS ENUM(
        'super_admin', 'admin', 'content_editor', 'content_approver',
        'events_manager', 'programmes_manager', 'media_manager',
        'applications_manager', 'commerce_manager', 'communications_manager'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Alter Users Table
    ALTER TABLE "users" 
      ADD COLUMN IF NOT EXISTS "job_title" varchar,
      ADD COLUMN IF NOT EXISTS "status" "enum_users_status" DEFAULT 'active' NOT NULL,
      ADD COLUMN IF NOT EXISTS "invited_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "activated_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "disabled_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "last_login_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "must_change_password" boolean DEFAULT false,
      ADD COLUMN IF NOT EXISTS "mfa_enabled" boolean DEFAULT false;

    -- Users Roles Table (hasMany select)
    CREATE TABLE IF NOT EXISTS "users_roles" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_users_roles",
      "id" serial PRIMARY KEY NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "users_roles_order_idx" ON "users_roles" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "users_roles_parent_idx" ON "users_roles" USING btree ("parent_id");

    -- Users Direct Permissions Table (hasMany select)
    CREATE TABLE IF NOT EXISTS "users_direct_permissions" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" varchar NOT NULL,
      "id" serial PRIMARY KEY NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "users_direct_permissions" ADD CONSTRAINT "users_direct_permissions_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "users_direct_permissions_order_idx" ON "users_direct_permissions" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "users_direct_permissions_parent_idx" ON "users_direct_permissions" USING btree ("parent_id");

    -- Staff Invitations Table
    CREATE TABLE IF NOT EXISTS "staff_invitations" (
      "id" serial PRIMARY KEY NOT NULL,
      "email" varchar NOT NULL,
      "name" varchar NOT NULL,
      "job_title" varchar,
      "token_hash" varchar NOT NULL,
      "status" "enum_staff_invitations_status" DEFAULT 'pending' NOT NULL,
      "expires_at" timestamp(3) with time zone NOT NULL,
      "invited_by_id" integer,
      "accepted_at" timestamp(3) with time zone,
      "revoked_at" timestamp(3) with time zone,
      "revoked_by_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "staff_invitations_token_hash_idx" ON "staff_invitations" USING btree ("token_hash");
    CREATE INDEX IF NOT EXISTS "staff_invitations_email_idx" ON "staff_invitations" USING btree ("email");

    DO $$ BEGIN
      ALTER TABLE "staff_invitations" ADD CONSTRAINT "staff_invitations_invited_by_fk" FOREIGN KEY ("invited_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "staff_invitations" ADD CONSTRAINT "staff_invitations_revoked_by_fk" FOREIGN KEY ("revoked_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Staff Invitations Roles Table (hasMany select)
    CREATE TABLE IF NOT EXISTS "staff_invitations_roles" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_staff_invitations_roles",
      "id" serial PRIMARY KEY NOT NULL
    );

    DO $$ BEGIN
      ALTER TABLE "staff_invitations_roles" ADD CONSTRAINT "staff_invitations_roles_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."staff_invitations"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    CREATE INDEX IF NOT EXISTS "staff_invitations_roles_order_idx" ON "staff_invitations_roles" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "staff_invitations_roles_parent_idx" ON "staff_invitations_roles" USING btree ("parent_id");

    -- Audit Logs Table
    CREATE TABLE IF NOT EXISTS "audit_logs" (
      "id" serial PRIMARY KEY NOT NULL,
      "action" varchar NOT NULL,
      "resource_type" varchar NOT NULL,
      "resource_id" varchar,
      "actor_id" integer,
      "target_user_id" integer,
      "before" jsonb,
      "after" jsonb,
      "metadata" jsonb,
      "ip_address" varchar,
      "user_agent" varchar,
      "request_id" varchar,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );

    CREATE INDEX IF NOT EXISTS "audit_logs_action_idx" ON "audit_logs" USING btree ("action");
    CREATE INDEX IF NOT EXISTS "audit_logs_resource_type_idx" ON "audit_logs" USING btree ("resource_type");
    CREATE INDEX IF NOT EXISTS "audit_logs_created_at_idx" ON "audit_logs" USING btree ("created_at");

    DO $$ BEGIN
      ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actor_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    DO $$ BEGIN
      ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_target_user_fk" FOREIGN KEY ("target_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;

    -- Workflow Attribution Columns on Editorial Collections
    ALTER TABLE "articles"
      ADD COLUMN IF NOT EXISTS "workflow_submitted_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_submitted_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_approved_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_approved_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_published_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_published_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_review_notes" varchar;

    ALTER TABLE "events"
      ADD COLUMN IF NOT EXISTS "workflow_submitted_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_submitted_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_approved_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_approved_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_published_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_published_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_review_notes" varchar;

    ALTER TABLE "programmes"
      ADD COLUMN IF NOT EXISTS "workflow_submitted_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_submitted_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_approved_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_approved_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_published_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_published_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_review_notes" varchar;

    ALTER TABLE "projects"
      ADD COLUMN IF NOT EXISTS "status" varchar DEFAULT 'draft',
      ADD COLUMN IF NOT EXISTS "workflow_submitted_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_submitted_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_approved_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_approved_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_published_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_published_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_review_notes" varchar;

    ALTER TABLE "success_stories"
      ADD COLUMN IF NOT EXISTS "workflow_submitted_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_submitted_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_approved_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_approved_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_published_at" timestamp(3) with time zone,
      ADD COLUMN IF NOT EXISTS "workflow_published_by_id" integer,
      ADD COLUMN IF NOT EXISTS "workflow_review_notes" varchar;
  `);
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "success_stories"
      DROP COLUMN IF EXISTS "workflow_submitted_at",
      DROP COLUMN IF EXISTS "workflow_submitted_by_id",
      DROP COLUMN IF EXISTS "workflow_approved_at",
      DROP COLUMN IF EXISTS "workflow_approved_by_id",
      DROP COLUMN IF EXISTS "workflow_published_at",
      DROP COLUMN IF EXISTS "workflow_published_by_id",
      DROP COLUMN IF EXISTS "workflow_review_notes";

    ALTER TABLE "projects"
      DROP COLUMN IF EXISTS "status",
      DROP COLUMN IF EXISTS "workflow_submitted_at",
      DROP COLUMN IF EXISTS "workflow_submitted_by_id",
      DROP COLUMN IF EXISTS "workflow_approved_at",
      DROP COLUMN IF EXISTS "workflow_approved_by_id",
      DROP COLUMN IF EXISTS "workflow_published_at",
      DROP COLUMN IF EXISTS "workflow_published_by_id",
      DROP COLUMN IF EXISTS "workflow_review_notes";

    ALTER TABLE "programmes"
      DROP COLUMN IF EXISTS "workflow_submitted_at",
      DROP COLUMN IF EXISTS "workflow_submitted_by_id",
      DROP COLUMN IF EXISTS "workflow_approved_at",
      DROP COLUMN IF EXISTS "workflow_approved_by_id",
      DROP COLUMN IF EXISTS "workflow_published_at",
      DROP COLUMN IF EXISTS "workflow_published_by_id",
      DROP COLUMN IF EXISTS "workflow_review_notes";

    ALTER TABLE "events"
      DROP COLUMN IF EXISTS "workflow_submitted_at",
      DROP COLUMN IF EXISTS "workflow_submitted_by_id",
      DROP COLUMN IF EXISTS "workflow_approved_at",
      DROP COLUMN IF EXISTS "workflow_approved_by_id",
      DROP COLUMN IF EXISTS "workflow_published_at",
      DROP COLUMN IF EXISTS "workflow_published_by_id",
      DROP COLUMN IF EXISTS "workflow_review_notes";

    ALTER TABLE "articles"
      DROP COLUMN IF EXISTS "workflow_submitted_at",
      DROP COLUMN IF EXISTS "workflow_submitted_by_id",
      DROP COLUMN IF EXISTS "workflow_approved_at",
      DROP COLUMN IF EXISTS "workflow_approved_by_id",
      DROP COLUMN IF EXISTS "workflow_published_at",
      DROP COLUMN IF EXISTS "workflow_published_by_id",
      DROP COLUMN IF EXISTS "workflow_review_notes";

    DROP TABLE IF EXISTS "audit_logs" CASCADE;
    DROP TABLE IF EXISTS "staff_invitations_roles" CASCADE;
    DROP TABLE IF EXISTS "staff_invitations" CASCADE;
    DROP TABLE IF EXISTS "users_direct_permissions" CASCADE;
    DROP TABLE IF EXISTS "users_roles" CASCADE;

    ALTER TABLE "users"
      DROP COLUMN IF EXISTS "job_title",
      DROP COLUMN IF EXISTS "status",
      DROP COLUMN IF EXISTS "invited_at",
      DROP COLUMN IF EXISTS "activated_at",
      DROP COLUMN IF EXISTS "disabled_at",
      DROP COLUMN IF EXISTS "last_login_at",
      DROP COLUMN IF EXISTS "must_change_password",
      DROP COLUMN IF EXISTS "mfa_enabled";

    DROP TYPE IF EXISTS "public"."enum_staff_invitations_roles";
    DROP TYPE IF EXISTS "public"."enum_staff_invitations_status";
    DROP TYPE IF EXISTS "public"."enum_users_roles";
    DROP TYPE IF EXISTS "public"."enum_users_status";
  `);
}
