const app = require('express');
const router = app.Router();
const rechargeController=require('../controllers/rechargeController')

router.get('/', rechargeController.getIndex)
router.post('/',rechargeController.addBalance)
module.exports = router;