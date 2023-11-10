const app = require('express');
const router = app.Router();
const createBillController=require('../controllers/createBillController')
router.get('/', createBillController.loadPage)
router.post('/', createBillController.getRemainAmount,createBillController.createOrder)
//router.post('/', homeController.authentication)

module.exports = router;