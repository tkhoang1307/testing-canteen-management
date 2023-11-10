const dbModel = require('../models/dbHelpers/dbHelpers');
const moment = require('moment')
var itemPerPage = 10;
var totalPage = 0;
var currentPage = 0;
loadStockPage= async (req,res,next)=>{
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
        if(req.query.section=='details'){
            var productDetails=await dbModel.getCurrentCanteenDetails();
            if(productDetails.rows){

                productDetails=productDetails.rows
        
                totalPage =
                parseInt(productDetails.length / itemPerPage) +
                (productDetails.length % itemPerPage > 0 ? 1 : 0);
                var productDetails = productDetails.slice(
                    currentPage * itemPerPage,
                    currentPage * itemPerPage + itemPerPage
                    );
        
           
                res.render('inStockDetailsPage',{
                    title:'Hàng trong canteen',
                    user:user,
                    product:productDetails,
                    currentPage:currentPage,
                    totalPage:totalPage
                })
            }
            else{
                res.render('inStockDetailsPage',{
                    title:'Hàng trong canteen',
                    user:user,
                    message:productDetails,          
                    currentPage:currentPage,
                    totalPage:totalPage
                })
            }
            // console.log(productDetails)

        }
        else{
            var product=await dbModel.getCurrentCanteen();
            if(product.rows){
                product=product.rows
                totalPage =
                parseInt( product.length / itemPerPage) +
                ( product.length % itemPerPage > 0 ? 1 : 0);
                console.log(totalPage)
                var  product = product.slice(
                    currentPage * itemPerPage,
                    currentPage * itemPerPage + itemPerPage
                    );
                res.render('inStockPage',{
                    title:'Hàng trong canteen',
                    user:user,
                    product:product,  
                    currentPage:currentPage,
                    totalPage:totalPage
                })
            }
            else{
                res.render('inStockPage',{
                    title:'Hàng trong canteen',
                    user:user,
                    message:product,
                    currentPage:currentPage,
                    totalPage:totalPage
                })
            }

        }

    }catch(err){
        console.log(err)
    }
}

deleteProductInStock=async(req,res,next)=>{
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

updatePrice=async(req,res,next)=>{
    try{
        const products=req.body.products;
        console.log(products)
        for( var i =0;i<products.length;i++){
            id=products[i].id
            price=products[i].balance
            const result=await dbModel.updatePrice(id,price)
        }
        // const result=await dbModel.updatePrice(id,price)
        res.send('Cập nhật giá thành công')

    }catch(err){
        console.log(err)
        res.send('Đã xảy ra lỗi')
    }
}
module.exports={
    loadStockPage,deleteProductInStock,updatePrice
}