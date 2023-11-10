const app = require('express');
const router = app.Router();
const exportGoodsController=require('../controllers/exportGoodsController')
router.get('/', exportGoodsController.loadPage)
router.post('/', exportGoodsController.addNewCTReceipt)
//router.post('/', homeController.authentication)

module.exports = router;