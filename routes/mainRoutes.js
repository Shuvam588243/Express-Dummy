const router = require('express').Router();
const Student = require('../models/User.js');
const Controller = require('../controllers/studentController');




router.get('/',Controller.form_get);


router.get('/showData',Controller.show_data);

module.exports = router;