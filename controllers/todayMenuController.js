
const dbModel = require('../models/dbHelpers/dbHelpers');
const schedule=require('node-schedule')
schedule.scheduleJob('55 23 * * *',()=>{
    dbModel.resetFood()
})
const loadTodayMenuPage=async(req,res,next)=>{
    user={}
    if(req.session.user){
        user=req.session.user
    }
    try{
        var todayMenu=await dbModel.getTodayFood();
        var foodList=await dbModel.getAllFood();
        res.render('todayMenuPage',{
            title:'Menu hôm nay',
            user:user,
            todayMenu:todayMenu,
            foodList:foodList
        })
        
    }catch(err){
        res.render('errorPage',{
            title:'Lỗi',
            user:user,
            message:err.message
        })
    }
}
const updateTodayMenu=async(req,res,next)=>{
    try{
        const food_id=req.body.id;
        const amount=req.body.amount; 

        var food_idStr='ARRAY['
        var amountStr='ARRAY['


        for(i=0;i<food_id.length;i++){
            if(i!=food_id.length-1){
                food_idStr= food_idStr.concat("'",food_id[i],"'",",")
                amountStr= amountStr.concat(amount[i],",")
            }
            else{
                food_idStr=food_idStr.concat("'",food_id[i],"']")
                amountStr= amountStr.concat(amount[i],"]")
            }
        }
        queryStr=food_idStr+","+amountStr

        result=await dbModel.updateTodayFood(queryStr);
        res.send('Cập nhật menu hôm nay thành công')
        
    }catch(err){
        res.send('Đã xảy ra lỗi')
    }
}

module.exports={loadTodayMenuPage,updateTodayMenu};