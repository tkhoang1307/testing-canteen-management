const app = require('express');
const router = app.Router();
const getAllUserInfoController=require('../controllers/getAllUserInfoController')

router.get('/',getAllUserInfoController.loadAllUserInfoPage);
router.post('/',getAllUserInfoController.updateUserBalance);
module.exports=router;