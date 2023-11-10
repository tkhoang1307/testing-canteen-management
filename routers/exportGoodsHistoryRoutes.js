const app = require('express');
const router = app.Router();
const exportGoodsHistoryController=require('../controllers/exportGoodsHistoryController')

router.get('/', exportGoodsHistoryController.loadHistory)

module.exports = router;