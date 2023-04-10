const { sql } = require('../db');

module.exports = {
  getRatings: async ({ productId }) => sql`
    SELECT json_object_agg(rating, total) ratings
    FROM (SELECT rating, count(rating) total
      FROM reviews
      WHERE product_id=${productId}
      GROUP BY rating
    ) AS derived_agg
    `,
  getRecs: async ({ productId }) => sql`
    SELECT rating, count(rating)
    FROM reviews
    WHERE product_id=${productId}
    GROUP BY rating
    `,
  getCharacteristics: async ({ productId }) => sql`
    SELECT rating, count(rating)
    FROM reviews
    WHERE product_id=${productId}
    GROUP BY rating
    `,
};

// select json_object_agg(rating, total) ratings from (select rating, count(rating) total from reviews where product_id=20 group by rating) as derived;
