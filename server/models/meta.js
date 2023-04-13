const { sql } = require('../db');

module.exports = {
  getMeta: async ({ productId }) => sql`
    SELECT json_build_object(
      'product_id', ${productId}::text,
      'ratings', (
        SELECT json_object_agg(rating, total::text) ratings
        FROM (SELECT rating, count(rating) total
          FROM reviews
          WHERE product_id=${productId}
          GROUP BY rating
        ) AS derived_agg
      ),
      'recommended', (
        SELECT json_object_agg(recommend, total::text) recs
        FROM (SELECT recommend, count(recommend) total
          FROM reviews
          WHERE product_id=${productId}
          GROUP BY recommend
        ) AS derived_agg
      ),
      'characteristics', (
        SELECT json_object_agg(
          name,
          json_build_object('id', id, 'value', value::text)
        ) chars
        FROM (
          SELECT name, characteristic_id as id, avg(value) value
          FROM characteristic_reviews
          JOIN characteristics
          ON characteristic_id = characteristics.id
          WHERE product_id=${productId}
          GROUP BY characteristic_id, name
        ) derived
      )
    ) metadata
    `,
  getRatings: async ({ productId }) => sql`
    SELECT json_object_agg(rating, total::text) ratings
    FROM (SELECT rating, count(rating) total
      FROM reviews
      WHERE product_id=${productId}
      GROUP BY rating
    ) AS derived_agg
    `,
  getRecs: async ({ productId }) => sql`
    SELECT json_object_agg(recommend, total::text) recs
    FROM (SELECT recommend, count(recommend) total
      FROM reviews
      WHERE product_id=${productId}
      GROUP BY recommend
    ) AS derived_agg
    `,
  getCharacteristics: async ({ productId }) => sql`
    SELECT json_object_agg(
      name,
      json_build_object('id', id, 'value', value::text)
    ) chars
    FROM (
      SELECT name, characteristic_id as id, avg(value) value
      FROM characteristic_reviews
      JOIN characteristics
      ON characteristic_id = characteristics.id
      WHERE product_id=${productId}
      GROUP BY characteristic_id, name
    ) derived
    `,
};

// TODO: Optimization by combining above 3 into one query
// can combine the above 3 into one query using json_build_object
// const data = {
//   product: req.query.product_id,
//   ratings: ratings[0].ratings,
//   recommend: recommends[0].recs,
//   characteristics: charsData[0].chars,
// };

// getRatings: async ({ productId }) => sql`
// SELECT json_object_agg(rating, total::text) ratings
// FROM (SELECT rating, count(rating) total
//   FROM reviews
//   WHERE product_id=${productId}
//   GROUP BY rating
// ) AS derived_agg
// `,
// getRecs: async ({ productId }) => sql`
// SELECT json_object_agg(recommend, total::text) recs
// FROM (SELECT recommend, count(recommend) total
//   FROM reviews
//   WHERE product_id=${productId}
//   GROUP BY recommend
// ) AS derived_agg
// `,
// getCharacteristics: async ({ productId }) => sql`
// SELECT json_object_agg(
//   name,
//   json_build_object('id', id, 'value', value::text)
// ) chars
// FROM (
//   SELECT name, characteristic_id as id, avg(value) value
//   FROM characteristic_reviews
//   JOIN characteristics
//   ON characteristic_id = characteristics.id
//   WHERE product_id=${productId}
//   GROUP BY characteristic_id, name
// ) derived
// `,

// SELECT json_build_object(
//   'product_id', ${productId}::text,
//   'ratings', (
//     SELECT json_object_agg(rating, total::text) ratings
//     FROM (SELECT rating, count(rating) total
//       FROM reviews
//       WHERE product_id=${productId}
//       GROUP BY rating
//     ) AS derived_agg
//   ),
//   'recommended', (
//     SELECT json_object_agg(recommend, total::text) recs
//     FROM (SELECT recommend, count(recommend) total
//       FROM reviews
//       WHERE product_id=${productId}
//       GROUP BY recommend
//     ) AS derived_agg
//   ),
//   'characteristics', (
//     SELECT json_object_agg(
//       name,
//       json_build_object('id', id, 'value', value::text)
//     ) chars
//     FROM (
//       SELECT name, characteristic_id as id, avg(value) value
//       FROM characteristic_reviews
//       JOIN characteristics
//       ON characteristic_id = characteristics.id
//       WHERE product_id=${productId}
//       GROUP BY characteristic_id, name
//     ) derived
//   )
// ) metadata
// `,
