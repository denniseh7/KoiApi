const router = require('express').Router();
const controller = require('./controllers');

router.get('/reviews', controller.reviews.get); // get reviews
router.post('/reviews', controller.reviews.post); // post reviews

router.get('/reviews/meta', controller.meta.get);

router.put('/reviews/:review_id/helpful', controller.markReview.markHelpful);
router.put('/reviews/:review_id/report', controller.markReview.report);

// loader.io route
router.get('/loaderio-a5fd6887c7c7abdfd3aff07667745c84', (req, res) => res.send('loaderio-a5fd6887c7c7abdfd3aff07667745c84'));

module.exports = router;
