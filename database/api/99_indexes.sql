CREATE INDEX debate_id_idx ON private.debate (id);
CREATE INDEX debate_sentence_id_idx ON private.debate (sentence_id);
CREATE INDEX debate_section_sentence_id_idx ON private.debate (section_sentence_id);
CREATE INDEX debate_section_monologue_id_idx ON private.debate (section_monologue_id);
CREATE INDEX debate_speech_id_idx ON private.debate (speech_id);
CREATE INDEX debate_debate_id_idx ON private.debate (debate_id);
CREATE INDEX debate_speechdate_idx ON private.debate (speechdate);
CREATE INDEX debate_src_image_idx ON private.debate (src_image);
CREATE INDEX debate_src_column_idx ON private.debate (src_column);
CREATE INDEX debate_sentence_has_errata_idx ON private.debate (sentence_has_errata);

CREATE INDEX debate_text_idx ON private.debate_text USING GIN (to_tsvector('english', val));
