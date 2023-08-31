const router = require('express').Router();

const { sendMail} = require('../controller/appController.js')


/** HTTP Reqeust */
// router.post('/user/signup', signup);
router.post('/mail', sendMail);


module.exports = router;