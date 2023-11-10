const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 12;
var totalPage = 0;
var currentPage = 0;
const loadPage = async (req, res, next) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
  }
  try {
   
    var today = new Date().toISOString().slice(0, 10)
    console.log("Today:",today)
    // var updateTurnover = await dbModel.updateDailyTurnover();
    // console.log(updateTurnover)
    var dateAndTotalTurnover =await dbModel.getUpdatedDailyTurnoverTime(today);
    dateAndTotalTurnover=dateAndTotalTurnover.rows[0]
    dateAndTotalTurnover.doanh_thu=parseInt(dateAndTotalTurnover.doanh_thu)
    // console.log('loi nhuan', dateAndTotalTurnover)
    if (req.query.page) {
      if (req.query.page != "") {
        currentPage = parseInt(req.query.page);
      }
    }
    var updateTurnover
    var receiptIDArr;

    // console.log('REQ: ',req.query)
    if (req.query.date) {
      if (req.query.date != "") {
        console.log(req.query.date)
        dateAndTotalTurnover = await dbModel.getUpdatedDailyTurnoverTime(req.query.date);
        dateAndTotalTurnover = dateAndTotalTurnover.rows[0]
        // console.log('THOI GIAN CAP NHAT 15: ',dateAndTotalTurnover)
        dateAndTotalTurnover.doanh_thu=parseInt(dateAndTotalTurnover.doanh_thu)

        updateTurnover = await dbModel.updateDailyTurnover(req.query.date);
        receiptIDArr = await dbModel.getTurnoverByDate(req.query.date);
      }
    } else {
      
      receiptIDArr = await dbModel.getTodayReciept();
   
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
        temp["id"] = tempReceiptIDArr[i].id;
        temp["tong_tien"]=parseInt(tempReceiptIDArr[i].tong_tien)
        temp["thong_tin"] = {
          ngaynhap: tempReceiptIDArr[i].ngay_mua,
          trang_thai: tempReceiptIDArr[i].trang_thai,
        };
        detailArr.push(temp);
        temp = {};
      }
  
      
      if (detailArr.length > 0) {
        res.render("dailyTurnoverPage", {
          title:'Doanh thu hôm nay',
          user: user,
          transactionsList: detailArr,
          totalPage: totalPage,
          currentPage: currentPage,
          total:dateAndTotalTurnover
        });
      } else {
        res.render("dailyTurnoverPage", {
          title:'Doanh thu hôm nay',
          user: user,
          transactionsList: detailArr,
          message:'Đã xảy ra lỗi'
        });
      }
    }
    else{
      res.render("dailyTurnoverPage", {
        title:'Doanh thu hôm nay',
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
      title:'Chi tiết giao dịch',
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

    var result
    result=await dbModel.updateState(id)
   
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
module.exports = { loadPage, loadDetails,updateState };
