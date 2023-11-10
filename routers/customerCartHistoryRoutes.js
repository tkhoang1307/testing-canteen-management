const app = require('express');
const router = app.Router();
const customerCartHistoryController=require('../controllers/customerCartHistoryController')

router.get('/', customerCartHistoryController.loadHistory)

module.exports = router;