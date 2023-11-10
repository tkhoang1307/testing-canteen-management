const app=require('express');
const router=app.Router();
const inStockFoodController=require('../controllers/inStockFoodController');

router.get('/',inStockFoodController.loadStockFoodPage);
router.post('/',inStockFoodController.deleteProductInStockFood)
module.exports=router;