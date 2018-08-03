var express = require('express');
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var product_controller = require('../controllers/index');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);


router.post('/create', product_controller.product_create);

router.get('/read', product_controller.product_details);

router.put('/update', product_controller.product_update);

router.delete('/delete', product_controller.product_delete);


module.exports = router;