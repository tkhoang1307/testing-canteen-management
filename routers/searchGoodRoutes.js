const app = require('express');
const router = app.Router();
const searchGoodsController=require('../controllers/searchGoodsController')

router.get('/', searchGoodsController.getGoods)
module.exports = router;