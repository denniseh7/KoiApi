const router = require('express').Router();
const controller = require('./controllers');

router.get('/', controller.reviews.get); // get reviews
// router.post('/', controller.reviews.post); // post reviews

// router.get('/meta', controller.meta.get);

// router.put('/:review_id/helpful', controller.markReview.markHelpful);
// router.put('/:review_id/report', controller.markReview.report);
module.exports = router;
