let express = require('express');
let router =express.Router();
let mongoose = require('mongoose');
const { response } = require('../config/app');


let contact = require('../models/contact');

let contactController = require('../controllers/contact');

/* GET Route for the contact List page - READ Operation */
router.get('/', contactController.displaycontactList);
/* GET Route for the Displaying the add page  - Create Operation */
router.get('/add',contactController.displayAddpage);

/*Post  Route for processing the add  page  - Create Operation */
router.post('/add',contactController.processAddpage);

/* GET Route for Diplaying the edit  page - Update   Operation */
router.get('/edit/:id',contactController.displayEditPage);


/* Post  Route for processing the edit   page -Update   Operation */

router.post('/edit/:id',contactController.processEditPage);

/* GET Route to perform delete  -Delete   Operation */
router.get('/delete/:id',contactController.performDelete);


module.exports = router;