--- Create API
GRANT web_anon TO postgres;
GRANT USAGE ON SCHEMA api TO web_anon;

DROP VIEW IF EXISTS api.debate;
CREATE VIEW api.debate AS
SELECT
  debate.id,
  sentence_id,
  section_sentence_id,
  section_monologue_id,
  speech_id,
  debate_id,
  speechdate,
  src_image,
  src_column,
  sentence_errata,
  debate_category.val as debate_category,
  debate_constituency.val as debate_constituency,
  debate_entity_label.val as   debate_entity_label,
  debate_name.val as debate_name,
  debate_sentence_entity.val as debate_sentence_entity,
  debate_source.val as debate_source,
  debate_speaker.val as debate_speaker,
  debate_speaker_house.val as debate_speaker_house,
  debate_text.val as debate_text,
  debate_x20.val as debate_x20
FROM private.debate
         JOIN private.debate_category ON debate_category.id = debate.debate_category_id
         JOIN private.debate_constituency ON debate_constituency.id = debate.debate_constituency_id
         JOIN private.debate_entity_label ON debate_entity_label.id = debate.debate_entity_label_id
         JOIN private.debate_name ON debate_name.id = debate.debate_name_id
         JOIN private.debate_sentence_entity ON debate_sentence_entity.id = debate.debate_sentence_entity_id
         JOIN private.debate_source ON debate_source.id = debate.debate_source_id
         JOIN private.debate_speaker ON debate_speaker.id = debate.debate_speaker_id
         JOIN private.debate_speaker_house ON debate_speaker_house.id = debate.debate_speaker_house_id
         JOIN private.debate_text ON debate_text.id = debate.debate_text_id
         JOIN private.debate_x20 ON debate_x20.id = debate.debate_x20_id;
GRANT ALL PRIVILEGES ON api.debate TO web_anon;
