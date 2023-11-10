const app = require('express');
const router = app.Router();
const homeController=require('../controllers/homeController')
// const usersModels = require('../models/dbHelpers/dbHelpers');


router.get('/', homeController.loadHomePage)

//router.post('/', homeController.authentication)

module.exports = router;