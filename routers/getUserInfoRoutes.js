const app = require('express');
const router = app.Router();
const getUserInfoController=require('../controllers/getUserInfoController')
// const usersModels = require('../models/dbHelpers/dbHelpers');
router.post('/', getUserInfoController.getUserInfo)
router.get('/', getUserInfoController.loadUserProfile)
router.put('/',getUserInfoController.updateUser)
module.exports = router;