DROP MATERIALIZED VIEW IF EXISTS api.member_names_mispelled_words;
CREATE MATERIALIZED VIEW api.member_names_mispelled_words AS
SELECT speechdate::timestamptz,
       debate_name.val                                                   AS debate_name,
       debate_speaker.val                                                AS speaker_name,
       debate_text.val                                               AS speech_act,
       array_length(regexp_split_to_array(debate_text.val, '\s'), 1) AS number_of_words
FROM private.debate
         JOIN private.debate_name ON debate_name.id = debate.debate_name_id
         JOIN private.debate_speaker ON debate_speaker.id = debate.debate_speaker_id
         JOIN private.debate_text ON debate_text.id = debate.debate_text_id;

GRANT ALL PRIVILEGES ON api.member_names_mispelled_words TO web_anon;
