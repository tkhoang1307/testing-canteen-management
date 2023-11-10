const dbModel = require('../models/dbHelpers/dbHelpers');
var itemPerPage = 6;
var totalPage = 0;
var currentPage = 0;
const loadAllUserInfoPage=async(req,res,next)=>{
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
        var allUserInfo=await dbModel.getAllUserInfo();
        if(Array.isArray(allUserInfo)){

            totalPage =
            parseInt(allUserInfo.length / itemPerPage) +
            (allUserInfo.length % itemPerPage > 0 ? 1 : 0);
            console.log(totalPage)
            var allUserInfo = allUserInfo.slice(
                currentPage * itemPerPage,
                currentPage * itemPerPage + itemPerPage
              );
        }

        res.render('allUserInfoPage',{
            title:'Thông tin người dùng',
            users: allUserInfo,
            user:user,
            totalPage:totalPage,
            currentPage:currentPage
        })
        
    }catch(err){
        // res.render('errorPage',{
        //     user:user,
        //     message:err.message
        // })
    }
}
const updateUserBalance=async(req,res,next)=>{
    try{
        const users=req.body.users; 
        var allUserInfo=await dbModel.setUsersBalance(users);
        console.log(allUserInfo)
        if(allUserInfo.rows){
            res.send('Cập nhật giá thành công')
        }
        else{
            res.send('Đã xảy ra lỗi')
        }

        
    }catch(err){
        res.send(err)
    }
}

module.exports={loadAllUserInfoPage,updateUserBalance};