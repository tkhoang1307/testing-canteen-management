const dbModel = require("../models/dbHelpers/dbHelpers");
const loadPage = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    currentCanteen = await dbModel.getCurrentCanteen();
    todayFood = await dbModel.getTodayFood();
    console.log('current: ',currentCanteen)
    console.log('today: ',todayFood)
    if(currentCanteen.rows)
    {
      currentCanteen = currentCanteen.rows
    }
      

    var allGoods;
    if (Array.isArray(todayFood) && Array.isArray(currentCanteen)) {
      for (i = 0; i < todayFood.length; i++) {
        delete Object.assign(todayFood[i], {
          ["ma_mat_hang"]: todayFood[i]["ma_mon_an"],
        })["ma_mon_an"];
        delete Object.assign(todayFood[i], {
          ["ten_mat_hang"]: todayFood[i]["ten_mon_an"],
        })["ten_mon_an"];
      }

      allGoods = currentCanteen.concat(todayFood);
      res.render("createBillPage", { title:'Tạo hóa đơn', user: user, goodsList: allGoods });
    } else {
      res.render("createBillPage", {title:'Tạo hóa đơn', user: user, message: "Đã xảy ra lỗi" });
    }
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};

const getRemainAmount = async (req, res, next) => {
  try {
    var id = "";
    if (req.body.command) {
      next();
    } else {
      if (req.body.id) {
        id = req.body.id;
        result = await dbModel.getFoodById(id);
        if (result.rows) {
          result = result.rows;

          if (result[0].ma_mon_an) {
            for (i = 0; i < result.length; i++) {
              delete Object.assign(result[i], {
                ["ma_mat_hang"]: result[i]["ma_mon_an"],
              })["ma_mon_an"];
              delete Object.assign(result[i], {
                ["ten_mat_hang"]: result[i]["ten_mon_an"],
              })["ten_mon_an"];
              delete Object.assign(result[i], {
                ["gia_ban_ra"]: result[i]["gia_ban"],
              })["gia_ban"];
            }
          }
          res.send(result);
        } else {
          res.send(result);
        }
      } else {
        res.send("Không tìm thấy món hàng");
      }
    }
  } catch (err) {
    res.send(err.message);
  }
};
const createOrder = async (req, res, next) => {
  try {
    const idUser = req.session.user.id;
    // console.log(req.body);
    if (req.body.id) {
      const arrProID = req.body.id;
      const arrQuantity = req.body.amount;

      idStr = "ARRAY[";
      amountStr = "ARRAY[";

      for (i = 0; i < arrProID.length; i++) {
        if (i != arrProID.length - 1) {
          idStr = idStr.concat("'", arrProID[i], "'", ",");
          amountStr = amountStr.concat(arrQuantity[i], ",");
        } else {
          idStr = idStr.concat("'", arrProID[i], "'", "]");
          amountStr = amountStr.concat(arrQuantity[i], "]");
        }
      }
      queryStr = idStr + "," + amountStr;
      console.log(queryStr);
      const result = await dbModel.createOrder(idUser, queryStr);
    //   console.log(result.rows);
      if (result.rows) {
        orderID = result.rows[0].madonhang;
        res.send({ result: "OK", orderID: orderID });
      } else {
        res.send({ result: "fail" });
      }
    }
    else {
        res.send({ result: "fail" });
    }
  } catch (error) {
    console.log(error);
    res.send("Đã xảy ra lỗi");
  }
};

module.exports = { loadPage, getRemainAmount, createOrder };
