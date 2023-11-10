const app = require('express');
const router = app.Router();
const cartController=require('../controllers/CartController')


router.get('/', cartController.getCart)
// router.get('/edit', cartController.getCartEdit)

router.post('/',cartController.editCart)
router.put('/',cartController.createOrder)

module.exports = router;
