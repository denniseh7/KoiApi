const { sql } = require('../db');

module.exports = {
  get: async ({
    productId, page = 0, count = 5, sort = 'newest',
  }) => {
    let pageNum = 0;
    if (Number(page !== 0)) { pageNum = (Number(page) - 1) * Number(count); }

    let sortField = 'date DESC';
    if (sort === 'helpful') {
      sortField = 'helpfulness DESC';
    } else if (sort === 'relevant') {
      sortField = 'helpfulness DESC, date DESC';
    }
    // console.log('Offset page is:', pageNum, 'page:', page);
    return sql`
      select reviews.id as review_id,
        rating,
        summary,
        recommend,
        response,
        body,
        to_char(to_timestamp(date/1000), 'YYYY-MM-DD"T"HH:MI:SS.MS"Z"') as date,
        reviewer_name,
        helpfulness,
        ARRAY(select json_build_object('id', id, 'url', url)
          from reviews_photos
          where reviews.id=review_id) as photos
      from reviews
      where product_id=${productId}
      order by ${sortField}
      limit ${count}
      offset ${pageNum}
      `;
  },
  create: async ({
    product_id, rating, summary, body, recommend, name,
    email, photos, characteristics,
  }) => sql`
      WITH insReview AS (
        INSERT INTO reviews(product_id, rating, summary, body, recommend, reviewer_name, reviewer_email,
          helpfulness)
        VALUES (
          ${product_id}, ${rating}, ${summary}, ${body}, ${recommend}, ${name}, ${email}, 0
        )
        RETURNING id
      ), insPhoto AS (
        INSERT INTO reviews_photos(review_id, url)
        VALUES((SELECT id FROM insReview), unnest(${photos}::text[]))
      )
      INSERT INTO characteristic_reviews(review_id, characteristic_id, value)
      SELECT (SELECT id FROM insReview), charObj.key::INTEGER, charObj.charVal::INTEGER
      FROM (
        SELECT key, value as charVal FROM json_each_text(${characteristics})
      ) charObj
    `
  ,
};
