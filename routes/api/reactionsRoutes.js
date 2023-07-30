const router = require('express').Router();
const {
  deleteReaction
} = require('../../controllers/reactionsController');

// /api/reactions/:reactionId
router.route('/:reactionId').delete(deleteReaction);

module.exports = router;