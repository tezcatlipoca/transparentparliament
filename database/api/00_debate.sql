--- Create API
GRANT web_anon TO postgres;
GRANT USAGE ON SCHEMA api TO web_anon;

DROP VIEW IF EXISTS api.debate;
CREATE VIEW api.debate AS
SELECT debate.id,
       debate_date,
       debate_errata,
       debate_section,
       debate_sentence,
       debate_speech,
       debate_category.name     AS debate_category,
       debate_column.name       AS debate_column,
       debate_constituency.name AS debate_constituency,
       debate_entity.name       AS debate_entity,
       debate_file.name         AS debate_file,
       debate_house.name        AS debate_house,
       debate_image.name        AS debate_image,
       debate_label.name        AS debate_label,
       debate_name.name         AS debate_name,
       debate_speaker.name      AS debate_speaker,
       debate_text.fulltext     AS debate_text
FROM private.debate
         JOIN private.debate_category ON debate_category.id = debate.debate_category
         JOIN private.debate_column ON debate_column.id = debate.debate_column
         JOIN private.debate_constituency ON debate_constituency.id = debate.debate_constituency
         JOIN private.debate_entity ON debate_entity.id = debate.debate_entity
         JOIN private.debate_file ON debate_file.id = debate.debate_file
         JOIN private.debate_house ON debate_house.id = debate.debate_house
         JOIN private.debate_image ON debate_image.id = debate.debate_image
         JOIN private.debate_label ON debate_label.id = debate.debate_label
         JOIN private.debate_name ON debate_name.id = debate.debate_name
         JOIN private.debate_speaker ON debate_speaker.id = debate.debate_speaker
         JOIN private.debate_text ON debate_text.id = debate.debate_text;

GRANT ALL PRIVILEGES ON api.debate TO web_anon;
