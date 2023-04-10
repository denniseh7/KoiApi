const models = require('../models');

module.exports = {
  get: async (req, res) => {
    console.log('inside meta controller');
    const queryParams = {};
    if (req.query.product_id) {
      queryParams.productId = req.query.product_id;
    } else {
      res.status(500).send('Error: invalid product_id provided');
    }
    console.log('req params', req.query, 'passing to model:', queryParams);
    try {
      const ratings = await models.meta.getRatings(queryParams);
      const recommends = await models.meta.getRecs(queryParams);
      const charsData = await models.meta.getCharacteristics(queryParams);
      const data = {
        product: req.query.product_id,
        ratings: ratings[0].ratings,
        recommend: recommends,
        characteristics: charsData,
      };
      console.log('data:', data);
      res.status(200).send(data);
    } catch (err) {
      console.log('Error', err);
      res.status(500).send(`Error getting reviews: ${err}`);
    }
  },
};
