const app = require('express');
const router = app.Router();
const statisticController=require('../controllers/statisticController')

router.get('/', statisticController.loadPage)
// router.post('/',manageCategory.addProToCart)
module.exports = router;