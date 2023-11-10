const app = require('express');
const router = app.Router();
const goodsInfoController=require('../controllers/goodsInfoController')

router.post('/', goodsInfoController.getAllGoods)
module.exports = router;