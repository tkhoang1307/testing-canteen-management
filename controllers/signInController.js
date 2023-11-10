const dbModel = require("../models/dbHelpers/dbHelpers");
const CryptoJS = require("crypto-js");
const hashLength = 64;
const loadSignInPage = async (req, res, next) => {
  try {
    res.render("signInPage", {title:'Đăng nhập', user: {} });
  } catch (err) {
    next();
  }
};
const authentication = async (req, res, next) => {
  try {
    var username = req.body.username;
    var password = req.body.password;
    var role = req.body.role;
    console.log(req.body);
    user = {
      username: username,
      password: password,
    };
    var uDb;

    if (role == "user") {
      uDb = await dbModel.userAuthentication(user);
    } else if (role == "admin") {
      uDb = await dbModel.adminAuthentication(user);
    }
    if(uDb.rows){
      uDb=uDb.rows
      if (uDb.length == 0) {
        res.send("Tài khoản hoặc mật khẩu không đúng");
      } else {
        const passwordDb = uDb[0].mat_khau;
        const salt = passwordDb.slice(hashLength);
        const passwordSalt = password + salt;
        const passwordHashed = CryptoJS.SHA3(passwordSalt, {
          outputLength: hashLength * 4,
        }).toString(CryptoJS.enc.Hex);
        if (passwordDb === passwordHashed + salt) {
          if (uDb[0].id.includes("CTMS")) {
            req.session.user = {
              role: "user",
              id: uDb[0].id,
              cartID: uDb[0].id_gio_hang,
              img_url: uDb[0].img_url,
              username: uDb[0].tai_khoan
            };
            req.session.role = "user";
          } else if (uDb[0].id.includes("ADMS")) {
            req.session.user = {
              role: "admin",
              id: uDb[0].id,
              img_url: uDb[0].img_url,
            };
            req.session.role = "admin";
          }
          res.send("Đăng nhập thành công");
        } else {
          res.send("Tài khoản hoặc mật khẩu không đúng");
        }
      }
    }
    else{
      res.send(uDb);
    }
  
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = {
  authentication,
  loadSignInPage,
};
