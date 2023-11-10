const app = require('express');
const router = app.Router();
const todayMenuController=require('../controllers/todayMenuController')

router.get('/',todayMenuController.loadTodayMenuPage);
router.post('/',todayMenuController.updateTodayMenu);
module.exports=router;
