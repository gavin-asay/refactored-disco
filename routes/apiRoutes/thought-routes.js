const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	createReaction,
	deleteReaction,
} = require('../../controllers/thought-controllers');

const router = require('express').Router();

router.route('/').get(getThoughts).post(createThought);
router.route('/:id').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:id/reactions').post(createReaction);
router.route('/:id/reactions/:reactionId').delete(deleteReaction);

module.exports = router;
