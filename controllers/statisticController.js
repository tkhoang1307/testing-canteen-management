const dbModel = require("../models/dbHelpers/dbHelpers");
var itemPerPage = 15;
var totalPage = 0;
var currentPage = 0;
const loadPage = async (req, res) => {
  user = {};
  if (req.session.user) {
    user = req.session.user;
    console.log(user);
  }
  message = "";
  try {
    currentDate = new Date();
    if (req.query.month) {
      currentMonth = req.query.month;
    } else {
      currentMonth = currentDate.getMonth() + 1;
    }
    currentYear = currentDate.getFullYear();
    var result = await dbModel.getStatistical(currentMonth, currentYear);
    if (result.rows) {
      result = result.rows;
      if (req.query.page) {
        if (req.query.page != "") {
          currentPage = parseInt(req.query.page);
        }
      }
      productList=[]
      number=[]
      color=[]
      for (i =0;i<result.length;i++){
        productList.push(`'${result[i].ten_mat_hang}'`)
        number.push(result[i].so_luong)
        color.push(`'#${Math.floor(Math.random()*16777215).toString(16)}'`)
      }
      totalPage =
        parseInt(result.length / itemPerPage) +
        (result.length % itemPerPage > 0 ? 1 : 0);
      var newResult = result.slice(
        currentPage * itemPerPage,
        currentPage * itemPerPage + itemPerPage
      );
      res.render("statisticPage", {
        title: "Thống kê",
        user: user,
        product: newResult,
        currentPage,
        totalPage,
        productList:productList,
        number:number,
        color:color
      });
      return;
    } else {
      res.render("statisticPage", {
        title: "Thống kê",
        message: result.message,
        user: user,
        product: result,
      });
      return;
    }
  } catch (error) {
    res.render("errorPage", {
      title: "Lỗi",
      user: user,
      message: error.message,
    });
  }
};
module.exports = { loadPage };
