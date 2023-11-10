const dbModel = require("../models/dbHelpers/dbHelpers");
const CryptoJS = require("crypto-js");
const hashLength = 64;
const loadSignUpPage = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    res.render("signUpPage", { title:'Đăng kí',user: user });
  } catch (err) {
    res.render('errorPage',{
         title:'Lỗi',
        user:user,
        message:err.message
    })
  }
};
const addNewUser = async (req, res, next) => {
  try {

    const name = req.body.name;
    const email = req.body.email;
    const phoneNumber = req.body.phone;
    const username = req.body.username;
    const password = req.body.password;
    const salt = Date.now().toString(16);
    const passwordSalt = password + salt;
    const passwordHashed = CryptoJS.SHA3(passwordSalt, {
      outputLength: hashLength * 4,
    }).toString(CryptoJS.enc.Hex);
    const u = {
      name: name,
      username: username,
      password: passwordHashed + salt,
      email: email,
      phoneNumber: phoneNumber,
    };
    const result = await dbModel.addNewUser(u);

    res.send("sign up successfully");
  } catch (err) {
    next();
  }
};
module.exports = {
  addNewUser,
  loadSignUpPage,
};
