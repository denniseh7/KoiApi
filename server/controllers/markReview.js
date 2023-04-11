const models = require('../models');

module.exports = {
  markHelpful: async (req, res) => {
    console.log('inside meta controller helpful');
    const queryParams = {};
    if (req.params.review_id) {
      queryParams.reviewId = req.params.review_id;
    } else {
      res.status(500).send('Error: invalid review_id query param provided');
    }
    console.log('req params', req.params, 'passing to model:', queryParams);
    try {
      await models.markReview.markHelpful(queryParams);
      res.status(204).send(`Marked Helpful: ${req.params.review_id}`);
    } catch (err) {
      console.log('Error', err);
      res.status(500).send(`Error marking helpful ${req.params.review_id}: ${err}`);
    }
  },
  report: async (req, res) => {
    console.log('inside meta controller reported');
    const queryParams = {};
    if (req.params.review_id) {
      queryParams.reviewId = req.params.review_id;
    } else {
      res.status(500).send('Error: invalid review_id query param provided');
    }
    console.log('req params', req.params, 'passing to model:', queryParams);
    try {
      await models.markReview.report(queryParams);
      res.status(204).send(`Marked report: ${req.params.review_id}`);
    } catch (err) {
      console.log('Error', err);
      res.status(500).send(`Error reporting ${req.params.review_id}: ${err}`);
    }
  },
};
