const app = require('express');
const authRoutes = app.Router();
const user = require('../models/usersModel');
const CryptoJS = require("crypto-js");
const hashLength = 64;


authRoutes.post('/', async (req, res, next) => {
    try {

      
        // console.log(rs);
        var account = req.body.account;
        var password = req.body.password;
      //  console.log(account,password);
        const uDb = await user.queryUser(account);
        console.log(uDb);
    
        const pwDb = uDb[0].f_Password;
        console.log(pwDb);
        const salt = pwDb.slice(hashLength);
        console.log(pwDb);
        const pwSalt = password + salt;
        const pwHashed = CryptoJS.SHA3(pwSalt, { outputLength: hashLength * 4 }).toString
            (CryptoJS.enc.Hex);
        console.log(pwHashed+salt);
        if (pwDb === (pwHashed + salt)) {
            if(parseInt(uDb[0].f_Permission)){
                req.session.user ='admin';
            }
            else{
                req.session.user ='user'
            }
             //{'role':'admin', "id":'id','cart':'cart'};
            //req.session.uid = uDb[0].f_ID;
            res.redirect('/product-details?id=10')
            // res.render('main', {
            //     admin: true, //admin= true if you are admin, false if you are user.
            //     show: false   //false if you are logged-in.
            // })
        }
            //check account and password if they are in the db or not ?
            if (!(account && password)) {
                res.redirect('/');
            }
            //check user in database logic here:
            //...
            //
            // else if (isInDB(account, rs)) {
            //     console.log('yes')
            //     req.session.user = 'admin'  //assign session.user= admin if you are admin.
            //     res.render('adminMain', {
            //         admin: true, //admin= true if you are admin, false if you are user.
            //         show: false   //false if you are logged-in.
            //     });
            // }
            // else {
            //     req.session.user = 'user' //assign session.user= user if you are admin.
            //     res.render('main', {
            //         admin: false,
            //         show: false  //false if you are logged-in.
            //     });
            // }
        }
    catch (err) { 
        console.log(err);
    }
    })
authRoutes.get('/', (req, res, next) => {
    try {
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.log(err);
                }
            })

            res.redirect('/');
        }
        else {
            res.redirect('/');
        }
    } catch (Err) {
        console.log(Err);
    }

})
module.exports = authRoutes;
