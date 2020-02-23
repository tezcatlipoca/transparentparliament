CREATE INDEX debate_errata_idx ON private.debate (debate_errata);
CREATE INDEX debate_date_idx ON private.debate (debate_date);
CREATE INDEX debate_section_idx ON private.debate (debate_section);
CREATE INDEX debate_sentence_idx ON private.debate (debate_sentence);
CREATE INDEX debate_house_idx ON private.debate (debate_house);
CREATE INDEX debate_image_idx ON private.debate (debate_image);
CREATE INDEX debate_constituency_idx ON private.debate (debate_constituency);

CREATE INDEX debateText_idx ON private.debate_text USING GIN (to_tsvector('english', fulltext));
