const app = require('express');
const router = app.Router();
const signUpController=require('../controllers/signUpController')
// const usersModels = require('../models/dbHelpers/dbHelpers');
const CryptoJS = require("crypto-js");
const hashLength = 64;

router.get('/', signUpController.loadSignUpPage)
router.post('/', signUpController.addNewUser)
// function getcurrday() {
//     var today = new Date();
//     var dd = String(today.getDate()).padStart(2, '0');
//     var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
//     var yyyy = today.getFullYear();

//     return today = mm + '/' + dd + '/' + yyyy;
// }
// router.post('/', async (req, res, next) => {
//     try {
//         const currhighestid= await usersModels.getHighestId();
//         const id=parseInt(currhighestid[0].max) +1;

//         var permission=0;
//         if(req.body.admin_check=='on'){
//              permission =1 ;
//         }
//         console.log(req.body.admin_check);
//         const name = req.body.name;
//         const email=req.body.email;
//         const date=getcurrday();
//         const un = req.body.username;
//         const pw = req.body.password;
//         const salt = Date.now().toString(16);
//         const pwSalt = pw + salt;
//         const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString
//             (CryptoJS.enc.Hex);
//         const u = {
//             id:id,
//             name:name,
//             username: un,
//             password: pwHashed + salt,
//             email:email,
//             date:date,
//             permission:permission
//         };
//         const uNew = await usersModels.addUsers(u);
//         res.redirect('/sign_in');

//     } catch (err) {
//         console.log(err);
//     }
// })
module.exports = router;