DROP VIEW IF EXISTS api.vocab_classes;
CREATE VIEW api.vocab_classes AS
SELECT *
FROM private.vocab_classes;
GRANT ALL PRIVILEGES ON api.vocab_classes TO web_anon;

DROP VIEW IF EXISTS api.vocab_concerns;
CREATE VIEW api.vocab_concerns AS
SELECT *
FROM private.vocab_concerns;
GRANT ALL PRIVILEGES ON api.vocab_concerns TO web_anon;

DROP VIEW IF EXISTS api.vocab_dp;
CREATE VIEW api.vocab_dp AS
SELECT *
FROM private.vocab_dp;
GRANT ALL PRIVILEGES ON api.vocab_dp TO web_anon;

DROP VIEW IF EXISTS api.vocab_eminent_domain;
CREATE VIEW api.vocab_eminent_domain AS
SELECT *
FROM private.vocab_eminent_domain;
GRANT ALL PRIVILEGES ON api.vocab_eminent_domain TO web_anon;

DROP VIEW IF EXISTS api.vocab_infrastructure;
CREATE VIEW api.vocab_infrastructure AS
SELECT *
FROM private.vocab_infrastructure;
GRANT ALL PRIVILEGES ON api.vocab_infrastructure TO web_anon;

DROP VIEW IF EXISTS api.vocab_offices;
CREATE VIEW api.vocab_offices AS
SELECT *
FROM private.vocab_offices;
GRANT ALL PRIVILEGES ON api.vocab_offices TO web_anon;

DROP VIEW IF EXISTS api.vocab_rights_of_common;
CREATE VIEW api.vocab_rights_of_common AS
SELECT *
FROM private.vocab_rights_of_common;
GRANT ALL PRIVILEGES ON api.vocab_rights_of_common TO web_anon;
