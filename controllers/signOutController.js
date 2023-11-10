const signOut=(req,res,next)=>{
    user={}
    if(req.session.user){
        user=req.session.user;
    }
    
    try{
        msg='Bạn đã đăng xuất thành công'
        if (req.session) {
            req.session.destroy(error => {
                if (error) {
                    console.log(err);
                }
            })

            res.render('signOutPage.hbs',{title:'Đăng xuất', message: msg,user:{}});
        }
        else {
            res.render('signOutPage.hbs',{title:'Đăng xuất',message: msg,user:{}});
        }
    }catch(err){
        res.render('signOutPage.hbs',{title:'Đăng xuất',message: err.message,user:user});
    }
}
module.exports={
    signOut
}