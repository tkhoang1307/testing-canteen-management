const app = require('express');
const router = app.Router();
const itemDetailController=require('../controllers/itemDetailController')

router.get('/', itemDetailController.loadItemDetail)
router.post('/',itemDetailController.addProToCart)
module.exports = router;