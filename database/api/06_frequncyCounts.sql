DROP MATERIALIZED VIEW IF EXISTS api.wordcount;
CREATE MATERIALIZED VIEW api.wordcount AS
SELECT *
from ts_stat('select to_tsvector(val) FROM private.debate_text')
ORDER BY nentry;

GRANT ALL PRIVILEGES ON api.wordcount TO web_anon;

DROP VIEW IF EXISTS api.top_speaker_per_year;
CREATE VIEW api.top_speaker_per_year AS
SELECT DISTINCT ON (date_year) date_year,
                          words_spoken,
                          speaker_name
FROM api.top_speakers
ORDER BY date_year, words_spoken DESC, speaker_name;

GRANT ALL PRIVILEGES ON api.top_speaker_per_year TO web_anon;
