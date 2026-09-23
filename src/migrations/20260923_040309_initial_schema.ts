import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload: _payload, req: _req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'fr', 'de');
  CREATE TYPE "public"."enum_media_media_type" AS ENUM('image', 'document', 'video');
  CREATE TYPE "public"."enum_people_status" AS ENUM('active', 'alumni', 'inactive');
  CREATE TYPE "public"."enum_partners_partner_type" AS ENUM('international_development', 'donor', 'government', 'ngo', 'corporate', 'academic_research', 'investor', 'media', 'community_organization', 'other');
  CREATE TYPE "public"."enum_partners_relationship_type" AS ENUM('strategic_partner', 'funding_partner', 'implementing_partner', 'technical_partner', 'ecosystem_partner');
  CREATE TYPE "public"."enum_programmes_delivery_format" AS ENUM('in_person', 'virtual', 'hybrid');
  CREATE TYPE "public"."enum_programmes_application_status" AS ENUM('open', 'upcoming', 'closed', 'by_invitation');
  CREATE TYPE "public"."enum_programmes_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_projects_project_status" AS ENUM('planned', 'active', 'completed', 'on_hold');
  CREATE TYPE "public"."enum_events_event_type" AS ENUM('workshop', 'summit', 'hackathon', 'exhibition', 'webinar', 'meetup', 'ceremony', 'other');
  CREATE TYPE "public"."enum_events_format" AS ENUM('in_person', 'virtual', 'hybrid');
  CREATE TYPE "public"."enum_events_status" AS ENUM('draft', 'published', 'postponed', 'cancelled', 'completed');
  CREATE TYPE "public"."enum_success_stories_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_articles_status" AS ENUM('draft', 'published', 'archived');
  CREATE TYPE "public"."enum_locations_location_type" AS ENUM('hub_facility', 'office', 'training_center', 'community_venue', 'partner_facility', 'other');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_type" "enum_media_media_type" DEFAULT 'image',
  	"attribution_photographer_or_source" varchar,
  	"attribution_copyright_notes" varchar,
  	"location" varchar,
  	"date_captured" timestamp(3) with time zone,
  	"external_video_url" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"title" varchar,
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "media_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"tags_id" integer
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"full_name" varchar NOT NULL,
  	"slug" varchar,
  	"profile_image_id" integer,
  	"primary_location_id" integer,
  	"designations_is_leadership" boolean DEFAULT false,
  	"designations_is_board_member" boolean DEFAULT false,
  	"designations_is_team_member" boolean DEFAULT true,
  	"designations_is_facilitator" boolean DEFAULT false,
  	"designations_is_speaker" boolean DEFAULT false,
  	"designations_is_author" boolean DEFAULT false,
  	"social_links_linkedin" varchar,
  	"social_links_twitter" varchar,
  	"social_links_instagram" varchar,
  	"social_links_website" varchar,
  	"contact_info_email" varchar,
  	"contact_info_show_email_publicly" boolean DEFAULT false,
  	"contact_info_phone" varchar,
  	"contact_info_show_phone_publicly" boolean DEFAULT false,
  	"display_order" numeric DEFAULT 0,
  	"status" "enum_people_status" DEFAULT 'active',
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "people_locales" (
  	"role" varchar NOT NULL,
  	"organization" varchar DEFAULT 'Genius Hub Global',
  	"division" varchar,
  	"short_bio" varchar,
  	"full_bio" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar,
  	"logo_id" integer NOT NULL,
  	"website" varchar,
  	"partner_type" "enum_partners_partner_type" DEFAULT 'international_development' NOT NULL,
  	"relationship_type" "enum_partners_relationship_type" DEFAULT 'strategic_partner',
  	"timeline_start_year" numeric,
  	"timeline_end_year" numeric,
  	"is_featured" boolean DEFAULT false,
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_locales" (
  	"description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "focus_areas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"icon_id" integer,
  	"hero_media_id" integer,
  	"display_order" numeric DEFAULT 0,
  	"is_featured" boolean DEFAULT false,
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "focus_areas_locales" (
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "programmes_impact_statistics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metric_value" varchar NOT NULL
  );
  
  CREATE TABLE "programmes_impact_statistics_locales" (
  	"metric_label" varchar NOT NULL,
  	"metric_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "programmes" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"delivery_format" "enum_programmes_delivery_format" DEFAULT 'hybrid',
  	"schedule_start_date" timestamp(3) with time zone,
  	"schedule_end_date" timestamp(3) with time zone,
  	"schedule_is_ongoing" boolean DEFAULT true,
  	"application_status" "enum_programmes_application_status" DEFAULT 'open',
  	"application_url" varchar,
  	"hero_media_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"status" "enum_programmes_status" DEFAULT 'published',
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "programmes_locales" (
  	"title" varchar NOT NULL,
  	"short_description" varchar NOT NULL,
  	"full_description" jsonb,
  	"target_audience" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "programmes_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer,
  	"locations_id" integer,
  	"media_id" integer,
  	"partners_id" integer,
  	"tags_id" integer
  );
  
  CREATE TABLE "projects_beneficiary_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metric_value" varchar NOT NULL
  );
  
  CREATE TABLE "projects_beneficiary_metrics_locales" (
  	"metric_name" varchar NOT NULL,
  	"unit_or_context" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"parent_programme_id" integer,
  	"timeline_start_date" timestamp(3) with time zone,
  	"timeline_end_date" timestamp(3) with time zone,
  	"project_status" "enum_projects_project_status" DEFAULT 'active',
  	"funding_and_support_donor_or_funder" varchar,
  	"funding_and_support_grant_details" varchar,
  	"hero_media_id" integer,
  	"is_featured" boolean DEFAULT false,
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"full_content" jsonb,
  	"outcomes" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer,
  	"partners_id" integer,
  	"locations_id" integer,
  	"tags_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"event_type" "enum_events_event_type" DEFAULT 'workshop' NOT NULL,
  	"format" "enum_events_format" DEFAULT 'in_person',
  	"schedule_start_date_time" timestamp(3) with time zone NOT NULL,
  	"schedule_end_date_time" timestamp(3) with time zone,
  	"schedule_timezone" varchar DEFAULT 'Africa/Lagos',
  	"venue_location_id" integer,
  	"online_access_meeting_url" varchar,
  	"related_programme_id" integer,
  	"related_project_id" integer,
  	"hero_media_id" integer,
  	"status" "enum_events_status" DEFAULT 'published',
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar NOT NULL,
  	"description" jsonb,
  	"custom_venue_notes" varchar,
  	"online_access_access_instructions" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "events_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer,
  	"people_id" integer,
  	"partners_id" integer,
  	"tags_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "success_stories_impact_metrics" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"metric_value" varchar NOT NULL
  );
  
  CREATE TABLE "success_stories_impact_metrics_locales" (
  	"metric_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "success_stories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"beneficiary_name" varchar NOT NULL,
  	"location_id" integer,
  	"related_programme_id" integer,
  	"related_project_id" integer,
  	"hero_media_id" integer,
  	"story_date" timestamp(3) with time zone,
  	"is_featured" boolean DEFAULT false,
  	"status" "enum_success_stories_status" DEFAULT 'published',
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "success_stories_locales" (
  	"title" varchar NOT NULL,
  	"beneficiary_role" varchar,
  	"quote" varchar,
  	"summary" varchar,
  	"full_story" jsonb,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "success_stories_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer,
  	"tags_id" integer,
  	"media_id" integer
  );
  
  CREATE TABLE "articles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"category_id" integer NOT NULL,
  	"published_at" timestamp(3) with time zone,
  	"hero_media_id" integer,
  	"status" "enum_articles_status" DEFAULT 'published',
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articles_locales" (
  	"title" varchar NOT NULL,
  	"excerpt" varchar NOT NULL,
  	"content" jsonb NOT NULL,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "articles_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"focus_areas_id" integer,
  	"tags_id" integer,
  	"people_id" integer,
  	"programmes_id" integer,
  	"projects_id" integer,
  	"events_id" integer
  );
  
  CREATE TABLE "article_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"display_order" numeric DEFAULT 0,
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "article_categories_locales" (
  	"name" varchar NOT NULL,
  	"description" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "tags" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tags_locales" (
  	"name" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "locations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"location_type" "enum_locations_location_type" DEFAULT 'hub_facility' NOT NULL,
  	"coordinates_latitude" numeric,
  	"coordinates_longitude" numeric,
  	"flags_is_office" boolean DEFAULT false,
  	"flags_is_programme_location" boolean DEFAULT true,
  	"flags_is_event_venue" boolean DEFAULT true,
  	"contact_info_phone" varchar,
  	"contact_info_email" varchar,
  	"map_display" boolean DEFAULT true,
  	"is_public_page_enabled" boolean DEFAULT false,
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "locations_locales" (
  	"name" varchar NOT NULL,
  	"address" varchar,
  	"city" varchar DEFAULT 'Benin City' NOT NULL,
  	"state_or_region" varchar DEFAULT 'Edo State' NOT NULL,
  	"country" varchar DEFAULT 'Nigeria' NOT NULL,
  	"opening_hours" varchar,
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"people_id" integer,
  	"partners_id" integer,
  	"focus_areas_id" integer,
  	"programmes_id" integer,
  	"projects_id" integer,
  	"events_id" integer,
  	"success_stories_id" integer,
  	"articles_id" integer,
  	"article_categories_id" integer,
  	"tags_id" integer,
  	"locations_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand_brand_name" varchar DEFAULT 'Genius Hub' NOT NULL,
  	"brand_legal_name" varchar DEFAULT 'Genius Hub Global' NOT NULL,
  	"brand_organization_origin" varchar DEFAULT 'Nigeria',
  	"contact_general_email" varchar DEFAULT 'info@geniushubglobal.com',
  	"contact_admissions_email" varchar DEFAULT 'admissions@geniushubglobal.com',
  	"contact_partnerships_email" varchar DEFAULT 'partnerships@geniushubglobal.com',
  	"contact_phone_number" varchar DEFAULT '+234 800 000 0000',
  	"social_channels_linkedin" varchar DEFAULT 'https://linkedin.com/company/geniushubglobal',
  	"social_channels_twitter" varchar DEFAULT 'https://twitter.com/geniushubglobal',
  	"social_channels_instagram" varchar DEFAULT 'https://instagram.com/geniushubglobal',
  	"social_channels_facebook" varchar DEFAULT 'https://facebook.com/geniushubglobal',
  	"social_channels_youtube" varchar DEFAULT 'https://youtube.com/@geniushubglobal',
  	"seo_canonical_url" varchar,
  	"seo_og_image_id" integer,
  	"seo_no_index" boolean DEFAULT false,
  	"seo_no_follow" boolean DEFAULT false,
  	"seo_custom_json_ld" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_locales" (
  	"brand_tagline" varchar DEFAULT 'Human impact and the future of work',
  	"brand_founder_storytelling" varchar DEFAULT 'Founded by Isimeme Whyte',
  	"contact_headquarters_address" varchar DEFAULT 'Benin City, Edo State, Nigeria',
  	"seo_meta_title" varchar,
  	"seo_meta_description" varchar,
  	"seo_og_title" varchar,
  	"seo_og_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_rels" ADD CONSTRAINT "media_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_profile_image_id_media_id_fk" FOREIGN KEY ("profile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_primary_location_id_locations_id_fk" FOREIGN KEY ("primary_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "people_locales" ADD CONSTRAINT "people_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "focus_areas" ADD CONSTRAINT "focus_areas_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "focus_areas" ADD CONSTRAINT "focus_areas_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "focus_areas" ADD CONSTRAINT "focus_areas_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "focus_areas_locales" ADD CONSTRAINT "focus_areas_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_impact_statistics" ADD CONSTRAINT "programmes_impact_statistics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_impact_statistics_locales" ADD CONSTRAINT "programmes_impact_statistics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes_impact_statistics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes" ADD CONSTRAINT "programmes_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "programmes_locales" ADD CONSTRAINT "programmes_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "programmes_rels" ADD CONSTRAINT "programmes_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_beneficiary_metrics" ADD CONSTRAINT "projects_beneficiary_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_beneficiary_metrics_locales" ADD CONSTRAINT "projects_beneficiary_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_beneficiary_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_parent_programme_id_programmes_id_fk" FOREIGN KEY ("parent_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_venue_location_id_locations_id_fk" FOREIGN KEY ("venue_location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_related_programme_id_programmes_id_fk" FOREIGN KEY ("related_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events_rels" ADD CONSTRAINT "events_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_impact_metrics" ADD CONSTRAINT "success_stories_impact_metrics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_impact_metrics_locales" ADD CONSTRAINT "success_stories_impact_metrics_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories_impact_metrics"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_related_programme_id_programmes_id_fk" FOREIGN KEY ("related_programme_id") REFERENCES "public"."programmes"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_related_project_id_projects_id_fk" FOREIGN KEY ("related_project_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories" ADD CONSTRAINT "success_stories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "success_stories_locales" ADD CONSTRAINT "success_stories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "success_stories_rels" ADD CONSTRAINT "success_stories_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_article_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."article_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_hero_media_id_media_id_fk" FOREIGN KEY ("hero_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles" ADD CONSTRAINT "articles_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "articles_locales" ADD CONSTRAINT "articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articles_rels" ADD CONSTRAINT "articles_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "article_categories" ADD CONSTRAINT "article_categories_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "article_categories_locales" ADD CONSTRAINT "article_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tags_locales" ADD CONSTRAINT "tags_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "locations" ADD CONSTRAINT "locations_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "locations_locales" ADD CONSTRAINT "locations_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_focus_areas_fk" FOREIGN KEY ("focus_areas_id") REFERENCES "public"."focus_areas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programmes_fk" FOREIGN KEY ("programmes_id") REFERENCES "public"."programmes"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_success_stories_fk" FOREIGN KEY ("success_stories_id") REFERENCES "public"."success_stories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articles_fk" FOREIGN KEY ("articles_id") REFERENCES "public"."articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_article_categories_fk" FOREIGN KEY ("article_categories_id") REFERENCES "public"."article_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tags_fk" FOREIGN KEY ("tags_id") REFERENCES "public"."tags"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_locations_fk" FOREIGN KEY ("locations_id") REFERENCES "public"."locations"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_seo_og_image_id_media_id_fk" FOREIGN KEY ("seo_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_locales" ADD CONSTRAINT "site_settings_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_rels_order_idx" ON "media_rels" USING btree ("order");
  CREATE INDEX "media_rels_parent_idx" ON "media_rels" USING btree ("parent_id");
  CREATE INDEX "media_rels_path_idx" ON "media_rels" USING btree ("path");
  CREATE INDEX "media_rels_tags_id_idx" ON "media_rels" USING btree ("tags_id");
  CREATE UNIQUE INDEX "people_slug_idx" ON "people" USING btree ("slug");
  CREATE INDEX "people_profile_image_idx" ON "people" USING btree ("profile_image_id");
  CREATE INDEX "people_primary_location_idx" ON "people" USING btree ("primary_location_id");
  CREATE INDEX "people_seo_seo_og_image_idx" ON "people" USING btree ("seo_og_image_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE UNIQUE INDEX "people_locales_locale_parent_id_unique" ON "people_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "partners_slug_idx" ON "partners" USING btree ("slug");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE INDEX "partners_seo_seo_og_image_idx" ON "partners" USING btree ("seo_og_image_id");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "partners_locales_locale_parent_id_unique" ON "partners_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "focus_areas_slug_idx" ON "focus_areas" USING btree ("slug");
  CREATE INDEX "focus_areas_icon_idx" ON "focus_areas" USING btree ("icon_id");
  CREATE INDEX "focus_areas_hero_media_idx" ON "focus_areas" USING btree ("hero_media_id");
  CREATE INDEX "focus_areas_seo_seo_og_image_idx" ON "focus_areas" USING btree ("seo_og_image_id");
  CREATE INDEX "focus_areas_updated_at_idx" ON "focus_areas" USING btree ("updated_at");
  CREATE INDEX "focus_areas_created_at_idx" ON "focus_areas" USING btree ("created_at");
  CREATE UNIQUE INDEX "focus_areas_locales_locale_parent_id_unique" ON "focus_areas_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "programmes_impact_statistics_order_idx" ON "programmes_impact_statistics" USING btree ("_order");
  CREATE INDEX "programmes_impact_statistics_parent_id_idx" ON "programmes_impact_statistics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "programmes_impact_statistics_locales_locale_parent_id_unique" ON "programmes_impact_statistics_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "programmes_slug_idx" ON "programmes" USING btree ("slug");
  CREATE INDEX "programmes_hero_media_idx" ON "programmes" USING btree ("hero_media_id");
  CREATE INDEX "programmes_seo_seo_og_image_idx" ON "programmes" USING btree ("seo_og_image_id");
  CREATE INDEX "programmes_updated_at_idx" ON "programmes" USING btree ("updated_at");
  CREATE INDEX "programmes_created_at_idx" ON "programmes" USING btree ("created_at");
  CREATE UNIQUE INDEX "programmes_locales_locale_parent_id_unique" ON "programmes_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "programmes_rels_order_idx" ON "programmes_rels" USING btree ("order");
  CREATE INDEX "programmes_rels_parent_idx" ON "programmes_rels" USING btree ("parent_id");
  CREATE INDEX "programmes_rels_path_idx" ON "programmes_rels" USING btree ("path");
  CREATE INDEX "programmes_rels_focus_areas_id_idx" ON "programmes_rels" USING btree ("focus_areas_id");
  CREATE INDEX "programmes_rels_locations_id_idx" ON "programmes_rels" USING btree ("locations_id");
  CREATE INDEX "programmes_rels_media_id_idx" ON "programmes_rels" USING btree ("media_id");
  CREATE INDEX "programmes_rels_partners_id_idx" ON "programmes_rels" USING btree ("partners_id");
  CREATE INDEX "programmes_rels_tags_id_idx" ON "programmes_rels" USING btree ("tags_id");
  CREATE INDEX "projects_beneficiary_metrics_order_idx" ON "projects_beneficiary_metrics" USING btree ("_order");
  CREATE INDEX "projects_beneficiary_metrics_parent_id_idx" ON "projects_beneficiary_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_beneficiary_metrics_locales_locale_parent_id_unique" ON "projects_beneficiary_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_parent_programme_idx" ON "projects" USING btree ("parent_programme_id");
  CREATE INDEX "projects_hero_media_idx" ON "projects" USING btree ("hero_media_id");
  CREATE INDEX "projects_seo_seo_og_image_idx" ON "projects" USING btree ("seo_og_image_id");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_focus_areas_id_idx" ON "projects_rels" USING btree ("focus_areas_id");
  CREATE INDEX "projects_rels_partners_id_idx" ON "projects_rels" USING btree ("partners_id");
  CREATE INDEX "projects_rels_locations_id_idx" ON "projects_rels" USING btree ("locations_id");
  CREATE INDEX "projects_rels_tags_id_idx" ON "projects_rels" USING btree ("tags_id");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "events_slug_idx" ON "events" USING btree ("slug");
  CREATE INDEX "events_venue_location_idx" ON "events" USING btree ("venue_location_id");
  CREATE INDEX "events_related_programme_idx" ON "events" USING btree ("related_programme_id");
  CREATE INDEX "events_related_project_idx" ON "events" USING btree ("related_project_id");
  CREATE INDEX "events_hero_media_idx" ON "events" USING btree ("hero_media_id");
  CREATE INDEX "events_seo_seo_og_image_idx" ON "events" USING btree ("seo_og_image_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_rels_order_idx" ON "events_rels" USING btree ("order");
  CREATE INDEX "events_rels_parent_idx" ON "events_rels" USING btree ("parent_id");
  CREATE INDEX "events_rels_path_idx" ON "events_rels" USING btree ("path");
  CREATE INDEX "events_rels_focus_areas_id_idx" ON "events_rels" USING btree ("focus_areas_id");
  CREATE INDEX "events_rels_people_id_idx" ON "events_rels" USING btree ("people_id");
  CREATE INDEX "events_rels_partners_id_idx" ON "events_rels" USING btree ("partners_id");
  CREATE INDEX "events_rels_tags_id_idx" ON "events_rels" USING btree ("tags_id");
  CREATE INDEX "events_rels_media_id_idx" ON "events_rels" USING btree ("media_id");
  CREATE INDEX "success_stories_impact_metrics_order_idx" ON "success_stories_impact_metrics" USING btree ("_order");
  CREATE INDEX "success_stories_impact_metrics_parent_id_idx" ON "success_stories_impact_metrics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "success_stories_impact_metrics_locales_locale_parent_id_uniq" ON "success_stories_impact_metrics_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "success_stories_slug_idx" ON "success_stories" USING btree ("slug");
  CREATE INDEX "success_stories_location_idx" ON "success_stories" USING btree ("location_id");
  CREATE INDEX "success_stories_related_programme_idx" ON "success_stories" USING btree ("related_programme_id");
  CREATE INDEX "success_stories_related_project_idx" ON "success_stories" USING btree ("related_project_id");
  CREATE INDEX "success_stories_hero_media_idx" ON "success_stories" USING btree ("hero_media_id");
  CREATE INDEX "success_stories_seo_seo_og_image_idx" ON "success_stories" USING btree ("seo_og_image_id");
  CREATE INDEX "success_stories_updated_at_idx" ON "success_stories" USING btree ("updated_at");
  CREATE INDEX "success_stories_created_at_idx" ON "success_stories" USING btree ("created_at");
  CREATE UNIQUE INDEX "success_stories_locales_locale_parent_id_unique" ON "success_stories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "success_stories_rels_order_idx" ON "success_stories_rels" USING btree ("order");
  CREATE INDEX "success_stories_rels_parent_idx" ON "success_stories_rels" USING btree ("parent_id");
  CREATE INDEX "success_stories_rels_path_idx" ON "success_stories_rels" USING btree ("path");
  CREATE INDEX "success_stories_rels_focus_areas_id_idx" ON "success_stories_rels" USING btree ("focus_areas_id");
  CREATE INDEX "success_stories_rels_tags_id_idx" ON "success_stories_rels" USING btree ("tags_id");
  CREATE INDEX "success_stories_rels_media_id_idx" ON "success_stories_rels" USING btree ("media_id");
  CREATE UNIQUE INDEX "articles_slug_idx" ON "articles" USING btree ("slug");
  CREATE INDEX "articles_category_idx" ON "articles" USING btree ("category_id");
  CREATE INDEX "articles_hero_media_idx" ON "articles" USING btree ("hero_media_id");
  CREATE INDEX "articles_seo_seo_og_image_idx" ON "articles" USING btree ("seo_og_image_id");
  CREATE INDEX "articles_updated_at_idx" ON "articles" USING btree ("updated_at");
  CREATE INDEX "articles_created_at_idx" ON "articles" USING btree ("created_at");
  CREATE UNIQUE INDEX "articles_locales_locale_parent_id_unique" ON "articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "articles_rels_order_idx" ON "articles_rels" USING btree ("order");
  CREATE INDEX "articles_rels_parent_idx" ON "articles_rels" USING btree ("parent_id");
  CREATE INDEX "articles_rels_path_idx" ON "articles_rels" USING btree ("path");
  CREATE INDEX "articles_rels_focus_areas_id_idx" ON "articles_rels" USING btree ("focus_areas_id");
  CREATE INDEX "articles_rels_tags_id_idx" ON "articles_rels" USING btree ("tags_id");
  CREATE INDEX "articles_rels_people_id_idx" ON "articles_rels" USING btree ("people_id");
  CREATE INDEX "articles_rels_programmes_id_idx" ON "articles_rels" USING btree ("programmes_id");
  CREATE INDEX "articles_rels_projects_id_idx" ON "articles_rels" USING btree ("projects_id");
  CREATE INDEX "articles_rels_events_id_idx" ON "articles_rels" USING btree ("events_id");
  CREATE UNIQUE INDEX "article_categories_slug_idx" ON "article_categories" USING btree ("slug");
  CREATE INDEX "article_categories_seo_seo_og_image_idx" ON "article_categories" USING btree ("seo_og_image_id");
  CREATE INDEX "article_categories_updated_at_idx" ON "article_categories" USING btree ("updated_at");
  CREATE INDEX "article_categories_created_at_idx" ON "article_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "article_categories_locales_locale_parent_id_unique" ON "article_categories_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "tags_slug_idx" ON "tags" USING btree ("slug");
  CREATE INDEX "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  CREATE INDEX "tags_created_at_idx" ON "tags" USING btree ("created_at");
  CREATE UNIQUE INDEX "tags_locales_locale_parent_id_unique" ON "tags_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "locations_slug_idx" ON "locations" USING btree ("slug");
  CREATE INDEX "locations_seo_seo_og_image_idx" ON "locations" USING btree ("seo_og_image_id");
  CREATE INDEX "locations_updated_at_idx" ON "locations" USING btree ("updated_at");
  CREATE INDEX "locations_created_at_idx" ON "locations" USING btree ("created_at");
  CREATE UNIQUE INDEX "locations_locales_locale_parent_id_unique" ON "locations_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_focus_areas_id_idx" ON "payload_locked_documents_rels" USING btree ("focus_areas_id");
  CREATE INDEX "payload_locked_documents_rels_programmes_id_idx" ON "payload_locked_documents_rels" USING btree ("programmes_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_success_stories_id_idx" ON "payload_locked_documents_rels" USING btree ("success_stories_id");
  CREATE INDEX "payload_locked_documents_rels_articles_id_idx" ON "payload_locked_documents_rels" USING btree ("articles_id");
  CREATE INDEX "payload_locked_documents_rels_article_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("article_categories_id");
  CREATE INDEX "payload_locked_documents_rels_tags_id_idx" ON "payload_locked_documents_rels" USING btree ("tags_id");
  CREATE INDEX "payload_locked_documents_rels_locations_id_idx" ON "payload_locked_documents_rels" USING btree ("locations_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_seo_seo_og_image_idx" ON "site_settings" USING btree ("seo_og_image_id");
  CREATE UNIQUE INDEX "site_settings_locales_locale_parent_id_unique" ON "site_settings_locales" USING btree ("_locale","_parent_id");`);
}

export async function down({ db, payload: _payload, req: _req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "media_rels" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "people_locales" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "focus_areas" CASCADE;
  DROP TABLE "focus_areas_locales" CASCADE;
  DROP TABLE "programmes_impact_statistics" CASCADE;
  DROP TABLE "programmes_impact_statistics_locales" CASCADE;
  DROP TABLE "programmes" CASCADE;
  DROP TABLE "programmes_locales" CASCADE;
  DROP TABLE "programmes_rels" CASCADE;
  DROP TABLE "projects_beneficiary_metrics" CASCADE;
  DROP TABLE "projects_beneficiary_metrics_locales" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "events_rels" CASCADE;
  DROP TABLE "success_stories_impact_metrics" CASCADE;
  DROP TABLE "success_stories_impact_metrics_locales" CASCADE;
  DROP TABLE "success_stories" CASCADE;
  DROP TABLE "success_stories_locales" CASCADE;
  DROP TABLE "success_stories_rels" CASCADE;
  DROP TABLE "articles" CASCADE;
  DROP TABLE "articles_locales" CASCADE;
  DROP TABLE "articles_rels" CASCADE;
  DROP TABLE "article_categories" CASCADE;
  DROP TABLE "article_categories_locales" CASCADE;
  DROP TABLE "tags" CASCADE;
  DROP TABLE "tags_locales" CASCADE;
  DROP TABLE "locations" CASCADE;
  DROP TABLE "locations_locales" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "site_settings_locales" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_media_media_type";
  DROP TYPE "public"."enum_people_status";
  DROP TYPE "public"."enum_partners_partner_type";
  DROP TYPE "public"."enum_partners_relationship_type";
  DROP TYPE "public"."enum_programmes_delivery_format";
  DROP TYPE "public"."enum_programmes_application_status";
  DROP TYPE "public"."enum_programmes_status";
  DROP TYPE "public"."enum_projects_project_status";
  DROP TYPE "public"."enum_events_event_type";
  DROP TYPE "public"."enum_events_format";
  DROP TYPE "public"."enum_events_status";
  DROP TYPE "public"."enum_success_stories_status";
  DROP TYPE "public"."enum_articles_status";
  DROP TYPE "public"."enum_locations_location_type";`);
}
