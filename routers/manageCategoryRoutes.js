const app = require('express');
const router = app.Router();
const manageCategoryController=require('../controllers/manageCategoryController')

router.get('/', manageCategoryController.loadPage)
// router.post('/',manageCategory.addProToCart)
module.exports = router;