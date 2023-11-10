const app = require('express');
const path=require('path')
const router = app.Router();
const dailyTurnoverController=require('../controllers/dailyTurnoverController')
router.get('/',dailyTurnoverController.loadPage)
module.exports=router;
