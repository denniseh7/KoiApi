const { sql } = require('../db');

module.exports = {
  get: async ({ productId }) => {
    console.log('in models meta');
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
};
