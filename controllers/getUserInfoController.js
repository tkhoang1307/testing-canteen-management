
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadUserProfile=async(req,res,next)=>{
    try{
        var user={}
        if(req.session.user){
            user=req.session.user
        }
        var userInfo;
        userInfo =await dbModel.getUserInfo(req.session.user.id);
        if(userInfo.rows){
            userInfo=userInfo.rows;
            res.render('userProfilePage',{title:'Trang cá nhân',user:user,info:userInfo[0]})
        }
        else{
            res.render('userProfilePage',{title:'Trang cá nhân',user:user,message:userInfo[0]})
        }

    }catch(err){
        console.log(err);
    }
}
const getUserInfo=async(req,res,next)=>{
    try{
        var userInfo;
        console.log(req.session.user.id)
        userInfo =await dbModel.getUserInfo(req.session.user.id);
        console.log('value',userInfo)
        if(userInfo.rows){
     
            res.send(userInfo.rows)
        }else{
            res.send(userInfo)
        }
   
    }catch(err){
        console.log(err);
    }
}
const updateUser=async(req,res,next)=>{
    const idUser = req.session.user.id
    const name = req.body.name
    const email = req.body.email
    const phone = req.body.phone
    try {
        var res = await dbModel.updateUserInfo(idUser,name,email,phone)
    } catch (error) {
        res.render('errorPage',{
            title:'Lỗi',
            user:user,
            message:error.message
        })
    }
}
module.exports={getUserInfo,loadUserProfile,updateUser};