-- CALL DROP TABLE IF EXISTS if needed

CREATE TABLE IF NOT EXISTS characteristics (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL,
  name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id BIGSERIAL PRIMARY KEY,
  product_id BIGINT NOT NULL,
  rating SMALLINT NOT NULL,
  date BIGINT DEFAULT extract(epoch from now()),
  summary VARCHAR,
  body VARCHAR,
  recommend BOOLEAN,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR,
  reviewer_email VARCHAR,
  response VARCHAR,
  helpfulness SMALLINT NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews_photos (
  id BIGSERIAL PRIMARY KEY,
  review_id BIGINT NOT NULL,
  url VARCHAR,
  CONSTRAINT fk_review_id
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id BIGSERIAL PRIMARY KEY,
  characteristic_id BIGINT NOT NULL,
  review_id BIGINT NOT NULL,
  value INTEGER,
  CONSTRAINT fk_char_id
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
      ON DELETE CASCADE
);

-- Indexes
CREATE INDEX IF NOT EXISTS char_index ON characteristics (product_id);
CREATE INDEX IF NOT EXISTS review_prod_index ON reviews(product_id);
CREATE INDEX IF NOT EXISTS review_help_index ON reviews(helpfulness DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS review_date_index ON reviews(date DESC NULLS LAST);
CREATE INDEX IF NOT EXISTS photo_index ON reviews_photos(review_id);
CREATE INDEX IF NOT EXISTS char_review_index ON characteristic_reviews(characteristic_id);

-- DROP INDEX IF EXISTS review_help_date_index;

-- CREATE TABLE IF NOT EXISTS temp_characteristic_reviews (
--   id BIGSERIAL PRIMARY KEY,
--   characteristic_id INTEGER NOT NULL,
--   review_id INTEGER NOT NULL,
--   value INTEGER,
--   CONSTRAINT fk_char_id
--     FOREIGN KEY(characteristic_id)
--       REFERENCES characteristics(id)
--       ON DELETE CASCADE
-- );



-- COPY characteristic_reviews(id, characteristic_id,review_id,value)
-- FROM '/Users/sdcImport/characteristic_reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY reviews_photos(id,review_id,url)
-- FROM '/Users/sdcImport/reviews_photos.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY reviews(id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response, helpfulness)
-- FROM '/Users/sdcImport/reviews.csv'
-- DELIMITER ','
-- CSV HEADER;

-- COPY characteristics(id, product_id, name)
-- FROM '/Users/sdcImport/characteristics.csv'
-- DELIMITER ','
-- CSV HEADER;

-- -- Change serial ID to proper last value due to ETL not incrementing the ID due to direct ID import
-- select setval('characteristic_reviews_id_seq', max(id)) from characteristic_reviews;