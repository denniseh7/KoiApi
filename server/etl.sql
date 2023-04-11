-- CALL DROP TABLE IF EXISTS if needed

CREATE TABLE IF NOT EXISTS characteristics (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating SMALLINT NOT NULL,
  date VARCHAR NOT NULL,
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
  id SERIAL PRIMARY KEY,
  review_id INTEGER NOT NULL,
  url VARCHAR,
  CONSTRAINT fk_review_id
    FOREIGN KEY(review_id)
      REFERENCES reviews(id)
      ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS characteristic_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER NOT NULL,
  review_id INTEGER NOT NULL,
  value INTEGER,
  CONSTRAINT fk_char_id
    FOREIGN KEY(characteristic_id)
      REFERENCES characteristics(id)
      ON DELETE CASCADE
);

-- Indexes
-- CREATE INDEX helpful ON reviews (
--   helpfulness DESC NULLS LAST
-- );

-- COPY characteristic_reviews(id,characteristic_id,review_id,value)
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