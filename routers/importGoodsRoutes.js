const app = require('express');
const router = app.Router();
const importGoodsController=require('../controllers/importGoodsController')
router.get('/', importGoodsController.loadPage)
router.post('/', importGoodsController.addNewReceipt)
//router.post('/', homeController.authentication)

module.exports = router;