const router = require('express').Router();
const Routes = require('./routes');


router.use('/routes', Routes);


module.exports = router;