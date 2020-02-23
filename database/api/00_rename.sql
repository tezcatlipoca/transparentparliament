--- Make names more reasonable
ALTER TABLE IF EXISTS private.debate_debate
RENAME TO debate_name;

ALTER TABLE IF EXISTS private.constituency
RENAME TO debate_constituency;

ALTER TABLE IF EXISTS private.entity_labels
RENAME TO debate_entity_label;

ALTER TABLE IF EXISTS private.section_category
RENAME TO debate_category;

ALTER TABLE IF EXISTS private.sentence_entities
RENAME TO debate_sentence_entity;

ALTER TABLE IF EXISTS private.speaker
RENAME TO debate_speaker;

ALTER TABLE IF EXISTS private.speaker_house
RENAME TO debate_speaker_house;

ALTER TABLE IF EXISTS private.src_file_id
RENAME TO debate_source;

ALTER TABLE IF EXISTS private.x20
RENAME TO debate_x20;

ALTER TABLE IF EXISTS private.debate RENAME src_file_id TO debate_source_id;
ALTER TABLE IF EXISTS private.debate RENAME sentence_errata TO sentence_has_errata;
ALTER TABLE IF EXISTS private.debate RENAME debate_debate TO debate_name_id;
ALTER TABLE IF EXISTS private.debate RENAME section_category TO debate_category_id;
ALTER TABLE IF EXISTS private.debate RENAME debate_text TO debate_text_id;
ALTER TABLE IF EXISTS private.debate RENAME speaker TO debate_speaker_id;
ALTER TABLE IF EXISTS private.debate RENAME constituency TO debate_constituency_id;
ALTER TABLE IF EXISTS private.debate RENAME speaker_house TO debate_speaker_house_id;
ALTER TABLE IF EXISTS private.debate RENAME sentence_entities TO debate_sentence_entity_id;
ALTER TABLE IF EXISTS private.debate RENAME entity_labels TO debate_entity_label_id ;
ALTER TABLE IF EXISTS private.debate RENAME x20 TO debate_x20_id;
