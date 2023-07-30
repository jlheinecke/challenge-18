const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
  deleteAllThoughts
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought).delete(deleteAllThoughts);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reaction
router.route('/:thoughtId/reaction').post(createReaction);

// /api/reaction/:reactionId
router.route('/:reactionId').delete(deleteReaction);

module.exports = router;