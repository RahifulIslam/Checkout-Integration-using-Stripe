const router = require('express').Router();
const { 
    stripePayment,
} = require('../controllers/stripeControllers')

router.route('/create-checkout-session')
            .post(stripePayment);

module.exports = router;