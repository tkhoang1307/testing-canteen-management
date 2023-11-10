const express=require("express");
const router=express.Router()
const MomoController=require('../controllers/momoPaymentController.js')



// router.get('/', MomoController.getIndex) 
// router.post('/callback', MomoController.processPaymentResult)
router.post('/', MomoController.makePayment)
// router.put('/',)
module.exports = router