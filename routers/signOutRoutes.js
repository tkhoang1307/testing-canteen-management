const app = require('express');
const router = app.Router();
const signOutController=require('../controllers/signOutController')
// const usersModels = require('../models/dbHelpers/dbHelpers');


router.get('/', signOutController.signOut)

//router.post('/', signOutController.authentication)

module.exports = router;