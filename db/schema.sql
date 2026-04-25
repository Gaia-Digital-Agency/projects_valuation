-- M&A Valuations schema

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS companies (
    id              TEXT PRIMARY KEY,
    name            TEXT NOT NULL,
    drive_folder_id TEXT NOT NULL,
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dd_files (
    id              BIGSERIAL PRIMARY KEY,
    company_id      TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    drive_id        TEXT NOT NULL,
    name            TEXT NOT NULL,
    mime_type       TEXT,
    size_bytes      BIGINT,
    folder_path     TEXT,
    web_view_link   TEXT,
    modified_time   TIMESTAMPTZ,
    extracted_text  TEXT,
    extracted_at    TIMESTAMPTZ,
    indexed_at      TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (company_id, drive_id)
);

CREATE INDEX IF NOT EXISTS idx_dd_files_company ON dd_files(company_id);

CREATE TABLE IF NOT EXISTS valuation_runs (
    id              BIGSERIAL PRIMARY KEY,
    company_id      TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    status          TEXT NOT NULL DEFAULT 'pending',  -- pending|running|done|error
    model           TEXT,
    error           TEXT,
    started_at      TIMESTAMPTZ DEFAULT NOW(),
    finished_at     TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_runs_company ON valuation_runs(company_id, started_at DESC);

CREATE TABLE IF NOT EXISTS valuation_metrics (
    id              BIGSERIAL PRIMARY KEY,
    run_id          BIGINT NOT NULL REFERENCES valuation_runs(id) ON DELETE CASCADE,
    sort_order      INT NOT NULL,
    metric          TEXT NOT NULL,
    value           TEXT NOT NULL,
    source_file     TEXT
);

CREATE INDEX IF NOT EXISTS idx_metrics_run ON valuation_metrics(run_id, sort_order);

CREATE TABLE IF NOT EXISTS findings (
    id              BIGSERIAL PRIMARY KEY,
    run_id          BIGINT NOT NULL REFERENCES valuation_runs(id) ON DELETE CASCADE,
    severity        TEXT NOT NULL,  -- high|med|low
    category        TEXT NOT NULL,
    quote           TEXT NOT NULL,
    source_file     TEXT,
    page            INT
);

CREATE INDEX IF NOT EXISTS idx_findings_run ON findings(run_id);

CREATE TABLE IF NOT EXISTS chat_messages (
    id              BIGSERIAL PRIMARY KEY,
    company_id      TEXT NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
    role            TEXT NOT NULL,  -- user|assistant
    content         TEXT NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_company ON chat_messages(company_id, created_at);

-- Seed first company
INSERT INTO companies (id, name, drive_folder_id, notes)
VALUES ('greenviro', 'Greenviro', '1O7eAJk24Dnio1_2tDJ2t15ahwazb4xNv', 'First valuations target')
ON CONFLICT (id) DO UPDATE SET drive_folder_id = EXCLUDED.drive_folder_id, name = EXCLUDED.name;
