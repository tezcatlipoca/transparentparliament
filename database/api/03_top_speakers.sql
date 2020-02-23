DROP MATERIALIZED VIEW IF EXISTS api.top_speakers;
CREATE MATERIALIZED VIEW api.top_speakers AS
SELECT extract(year from debate_date::TIMESTAMP) as date_year,
       speaker_name,
       sum(number_of_words) as words_spoken
FROM api.member_names_mispelled_words
GROUP BY date_year, speaker_name
ORDER BY date_year;

GRANT ALL PRIVILEGES ON api.top_speakers TO web_anon;


DROP VIEW IF EXISTS api.top_speaker_per_year;
CREATE VIEW api.top_speaker_per_year AS
SELECT DISTINCT ON (date_year) date_year,
                          words_spoken,
                          speaker_name
FROM api.top_speakers
ORDER BY date_year, words_spoken DESC, speaker_name;

GRANT ALL PRIVILEGES ON api.top_speaker_per_year TO web_anon;
