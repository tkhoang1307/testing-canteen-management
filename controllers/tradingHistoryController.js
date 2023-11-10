const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;
const loadHistory = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }

    var receiptIDArr;
    if (req.query.searchID) {
      if (req.query.searchID != "") {
        receiptIDArr = await dbModel.getReCeiptsByID(req.query.searchID);
      }
    } else {
      receiptIDArr = await dbModel.getAllOrder();
    }
    if( receiptIDArr.rows){
      receiptIDArr=receiptIDArr.rows
      var tempReceiptIDArr = receiptIDArr.slice(
        currentPage * itemPerPage,
        currentPage * itemPerPage + itemPerPage
      );
      totalPage =
        parseInt(receiptIDArr.length / itemPerPage) +
        (receiptIDArr.length % itemPerPage > 0 ? 1 : 0);
      detailArr = [];
      temp = {};
  
      for (i = 0; i < tempReceiptIDArr.length; i++) {
        temp["ma_don_hang"] = tempReceiptIDArr[i].ma_don_hang;
        temp["thong_tin"] = {
          ngaynhap: tempReceiptIDArr[i].ngay_mua,
          trang_thai: tempReceiptIDArr[i].trang_thai,
        };
        detailArr.push(temp);
        temp = {};
      }
  
      if (detailArr.length > 0) {
        res.render("tradingHistoryPage", {
          title:'Lịch sử giao dịch',
          user: user,
          transactionsList: detailArr,
          totalPage: totalPage,
          currentPage: currentPage,
        });
      } else {
        res.render("tradingHistoryPage", {
          title:'Lịch sử giao dịch',
          user: user,
          transactionsList: detailArr,
          message:'Đã xảy ra lỗi'
        });
      }
    }
    else{
      res.render("tradingHistoryPage", {
        title:'Lịch sử giao dịch',
        user: user,
        message:'Đã xảy ra lỗi'
      });
    }
  
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};

const loadDetails = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }
    id = "";
    if (req.query.id) {
      id = req.query.id;
    }
    const orderInfor = await dbModel.getOrderByID(id);
    const result = await dbModel.getDetailTrading(id);

    res.render("tradingDetailsPage", {
      title:'Chi tiết lịch sử giao dịch',
      user: user,
      details: result,
      header: orderInfor[0],
    });
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};

const updateState = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
    var id=''
    if(req.body.id){
      id=req.body.id
    }
    console.log(id)
    var result
    result=await dbModel.updateState(id)
    console.log(result)
    if(result.rows){
      result=result.rows
      res.send('Thành công')
    }
    else{
      res.send(result)
    }
  } catch (err) {
    res.render("errorPage", {
      title:'Lỗi',
      user: user,
      message: err.message,
    });
  }
};
module.exports = { loadHistory, loadDetails,updateState };
