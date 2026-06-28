-- Runs once, at first initialisation of an empty pg-data volume (Postgres
-- docker-entrypoint-initdb.d). Plain postgres:16 (unlike supabase/postgres) ships
-- with no `auth` schema, so GoTrue — which connects with search_path=auth — fails its
-- first migration with "no schema has been selected to create in (3F000)". Pre-create
-- the schema (and the extensions GoTrue/Postgres commonly need) so GoTrue can bootstrap.
CREATE SCHEMA IF NOT EXISTS auth;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
