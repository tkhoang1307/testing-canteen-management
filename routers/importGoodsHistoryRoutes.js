const app = require('express');
const router = app.Router();
const importGoodsHistoryController=require('../controllers/importGoodsHistoryController')

router.get('/', importGoodsHistoryController.loadHistory)

module.exports = router;