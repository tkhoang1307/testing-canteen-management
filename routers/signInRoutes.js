const app = require('express');
const router = app.Router();
const signInController=require('../controllers/signInController')
// const usersModels = require('../models/dbHelpers/dbHelpers');


router.get('/', signInController.loadSignInPage)

router.post('/', signInController.authentication)

module.exports = router;