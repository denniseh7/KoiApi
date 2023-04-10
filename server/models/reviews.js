const { sql } = require('../db');

module.exports = {
  get: async ({
    productId, page = 0, count = 5, sort = 'newest',
  }) => {
    console.log('in models get');
    let pageNum = 0;
    if (Number(page !== 0)) { pageNum = (Number(page) - 1) * Number(count); }

    let sortField = 'date DESC';
    if (sort === 'helpful') {
      sortField = 'helpfulness DESC';
    } else if (sort === 'relevant') {
      sortField = 'helpfulness DESC, date DESC';
    }
    console.log('Offset page is:', pageNum, 'page:', page);
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
