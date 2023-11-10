const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 12
var totalPage = 0
var currentPage = 0

const loadHistory = async (req, res, next) => {
  user = {}
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    const getUserId = req.session.user.id
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page)
      }
    }

    var receiptIDArr
    if (req.query.searchID) {
      if (req.query.searchID != "") {
        receiptIDArr = await dbModel.getUserReCeiptByID(req.query.searchID);
      }
    }
    else {

      console.log(getUserId)
      receiptIDArr = await dbModel.getUserReCeiptID(getUserId);
      console.log('list items',receiptIDArr)
    }

    var tempReceiptIDArr = receiptIDArr.slice(currentPage * itemPerPage, currentPage * itemPerPage + itemPerPage)
    totalPage = parseInt(receiptIDArr.length / itemPerPage) + (receiptIDArr.length % itemPerPage > 0 ? 1 : 0)
    // console.log(receiptIDArr)
    detailArr = [];
    temp = {};
    // console.log(Array.from({hehe:3}))
    for (i = 0; i < tempReceiptIDArr.length; i++) {
      temp[tempReceiptIDArr[i].ma_don_hang] = { ngaynhap: tempReceiptIDArr[i].ngay_mua };
      detailArr.push(temp);
      temp = {};
    }
    var preparedArr = [];
    for (i = 0; i < tempReceiptIDArr.length; i++) {
      var result;
      foodDetail = await dbModel.getFoodInfoForCartHistory(tempReceiptIDArr[i].ma_don_hang);
      goodDetail = await dbModel.getGoodsInfoForCartHistory(tempReceiptIDArr[i].ma_don_hang);
      detail = foodDetail.concat(goodDetail);

      //detail = await dbModel.getReCeiptInfo(tempReceiptIDArr[i].ma_don_hang);
      result = Object.keys(detailArr[i]).map((key) => [
        key,
        Object.keys(detailArr[i][key]).map((key1) => [
          key1,
          detailArr[i][key][key1],
        ]),
      ]);
      var c = result;
      result[0][1][0].push(detail);
      var a = result[0][1][0].reduce(function (result1, item, index, array) {
        if (index == 0) {
          result1[array[0]] = array[1];
        }
        if (index == 1) {
          result1["chi_tiet"] = array[2];
        }
        return result1;
      }, {});
      c[0][1] = a;
      var b = c[0].reduce(function (result1, item, index, array) {
        if (index == 0) {
          result1["ma_phieu"] = array[0];
        }
        if (index == 1) {
          result1["chi_tiet_phieu"] = array[1];
        }
        return result1;
      }, {});
      c[0] = b;
      preparedArr.push(c[0]);
    }

    console.log('haha',user,user,totalPage,currentPage)
    if (preparedArr.length > 0) {
      res.render("customerCartHistoryPage", {
        title:'Lịch sử mua hàng',
        user: user,
        transactionsList: preparedArr,
        totalPage: totalPage,
        currentPage: currentPage
      });
    } else {
      res.render("customerCartHistoryPage", {
        title:'Lịch sử mua hàng',
        user: user,
        transactionsList: preparedArr,
      });
    }
    // console.log(preparedArr)
  } catch (err) {
    console.log(err)
    res.render('errorPage', {
      title:'Lỗi',
      user: user,
      message: err.message
    })
  }
};

module.exports = { loadHistory };
