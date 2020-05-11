var express     = require('express');
var router      = express.Router();

const adminRoute    = require('./admin/adminRoute');
const userRoute     = require('./user/userRoute');

//========================== Export Module Start ==========================

//API version 1
router.use('/admin', adminRoute);
router.use('/user', userRoute);

module.exports = router;
//========================== Export Module End ============================