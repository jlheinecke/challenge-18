const router = require('express').Router();
const Routes = require('./routes');


router.use('/thoughts', Routes);
router.use('/users', Routes);

module.exports = router;