const models = require('../models');

module.exports = {
  get: async (req, res) => {
    const queryParams = {};
    if (req.query.product_id) {
      queryParams.productId = req.query.product_id;
    } else {
      res.status(500).send('Error: invalid product_id provided');
    }
    if (req.query.count) queryParams.count = req.query.count;
    if (req.query.page) queryParams.page = req.query.page;
    console.log('req params', req.query, 'passing to model:', queryParams);
    try {
      const data = {
        product: req.query.product_id,
        page: Number(req.query.page) || 0,
        count: Number(req.query.count) || 5,
        results: await models.reviews.get(queryParams),
      };
      console.log('data:', data);
      res.status(200).send(data);
    } catch (err) {
      console.log('Error', err);
      res.status(500).send(`Error getting reviews: ${err}`);
    }
  },
  // TODO: Post review
  // post: async (req, res) => {
  //   console.log(req.body);
  // }
};

// const test_data = {
//   "product_id": 40344,
//   "rating": 4,
//   "summary": "test summary",
//   "body": "test body",
//   "recommend": false,
//   "name": "test name",
//   "email": "test email",
//   "photos": ["test_url_photo1", "test_url_photo2"],
//   "characteristics": {"135219": 5, "135220": 3, "135221": 2, "135222": 1}
// }
