const session = require("express-session");
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadHomePage=async(req,res,next)=>{
    try{
        var foodList
        var popularList
        user={}
        if(req.session.user){
            user=req.session.user
            console.log(user)
        }
        foodList=await dbModel.getTodayFood();
        popularList=await dbModel.getPopularItems(8)
        if(!(req.session&&req.session.role=='admin')){
            res.render('homePageNeutral',{
                title:'Trang chủ',
                role:req.session.role,
                foodList:foodList,
                user:user,
                popularList,
                
            });
        }
        else if(req.session&&req.session.role=='admin'){
            res.render('homeAdminPage',{
                title:'Trang chủ admin',
                role:req.session.role,
                user:user,
                popularList:popularList,
                

            });
        }
    }catch(err){
        res.render('errorPage',{
            user:user,
            message:err.message
        })
    }
}
module.exports={loadHomePage};