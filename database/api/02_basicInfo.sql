DROP MATERIALIZED VIEW IF EXISTS api.info;
CREATE MATERIALIZED VIEW api.info AS
SELECT 'debates' as "key", count(distinct val) as val
FROM private.debate_text
UNION
SELECT 'category' as "key", count(*) as val
from private.debate_category
UNION
SELECT 'sources' as "key", count(*) as val
from private.debate_source
UNION
SELECT 'speakers' as "key", count(*) as val
from private.debate_speaker
UNION
SELECT 'min_date' as "key", min(extract(year from speechdate::TIMESTAMP)) as val
from private.debate
UNION
SELECT 'max_date' as "key", max(extract(year from speechdate::TIMESTAMP)) as val
from private.debate
UNION
SELECT 'houses' as "key", count(distinct val) as val
FROM private.debate_speaker_house
UNION
SELECT 'constituencies' as "key", count(*) as val
from private.debate_constituency;
GRANT ALL PRIVILEGES ON api.info TO web_anon;
