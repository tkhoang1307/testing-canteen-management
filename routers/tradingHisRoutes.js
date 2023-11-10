const app = require('express');
const path=require('path')
const router = app.Router();
const tradingHistoryController=require('../controllers/tradingHistoryController')
router.get('/',tradingHistoryController.loadHistory)
module.exports=router;
