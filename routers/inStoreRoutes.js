const app=require('express');
const router=app.Router();
const inStoreController=require('../controllers/inStoreController');

router.get('/',inStoreController.loadStorePage);
router.post('/',inStoreController.deleteProductInStore)
module.exports=router;