const router = require('express').Router();
const thoughtsRoutes = require('./thoughtsRoutes');
const reactionsRoutes = require('./reactionsRoutes');
const usersRoutes = require('./usersRoutes');

router.use('/thoughts', thoughtsRoutes);
router.use('/reactions', reactionsRoutes);
router.use('/users', usersRoutes);

module.exports = router;