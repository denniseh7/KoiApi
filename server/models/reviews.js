const { sql } = require('../db');

module.exports = {
  get: async ({
    productId, page = 0, count = 5, sort = 'newest',
  }) => {
    console.log('in models get');
    let pageNum = 0;
    if (page !== '0') { pageNum = (Number(page) - 1) * Number(count); }

    let sortField = 'date DESC';
    if (sort === 'helpful') {
      sortField = 'helpfulness DESC';
    } else if (sort === 'relevant') {
      sortField = 'helpfulness DESC, date DESC';
    }
    console.log('Offset page is:', pageNum, 'page:', page);
    return sql`
      select id as review_id,
        rating,
        summary,
        recommend,
        response,
        body,
        date,
        reviewer_name,
        helpfulness
      from reviews
      where product_id=${productId}
      order by ${sortField}
      limit ${count}
      offset ${pageNum}
      `;
  },
};
