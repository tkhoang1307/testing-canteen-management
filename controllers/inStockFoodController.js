const dbModel = require('../models/dbHelpers/dbHelpers');
const moment = require('moment')
var itemPerPage = 10;
var totalPage = 0;
var currentPage = 0;
loadStockFoodPage= async (req,res,next)=>{
    try{
        var user={}
        if(req.session.user){
            user=req.session.user
        }
        if (req.query.page) {
            if (req.query.page != "") {
              currentPage = parseInt(req.query.page);
            }
          }
        var product=await dbModel.getCurrentRemainedFood();
        if(product.rows){
            product=product.rows
            totalPage =
            parseInt( product.length / itemPerPage) +
            ( product.length % itemPerPage > 0 ? 1 : 0);
   
            var  product = product.slice(
                currentPage * itemPerPage,
                currentPage * itemPerPage + itemPerPage
                );
            console.log(product)
            res.render('inStockFoodPage',{
                title:'Hàng trong canteen',
                user:user,
                product:product,
                currentPage:currentPage,
                totalPage:totalPage
            })
        }
        else{
            res.render('inStockFoodPage',{
                title:'Hàng trong canteen',
                user:user,
                message:product
            })
        }

        

    }catch(err){
        console.log(err)
    }
}

deleteProductInStockFood=async(req,res,next)=>{
    try{
        const id=req.body.id;
        const dateStr=req.body.dateM.toString();
        // console.log(dateStr);
        // console.log(Date.parse(dateStr) )
        const date =moment(new Date(dateStr)).format('YYYY-MM-DD')
        //console.log(moment(Date.parse(dateStr)).format())
        // const dateExp=req.body.dateExp;
        // console.log(dateM)
        const result=await dbModel.deleteProductInCanteen(id,date)
        res.send('Xóa sản phẩm thành công')

    }catch(err){
        console.log(err)
        res.send('Đã xảy ra lỗi')
    }
}

module.exports={
    loadStockFoodPage,deleteProductInStockFood
}