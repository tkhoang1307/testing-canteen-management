const { query } = require('express');
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadPage=async(req,res,next)=>{
    try{
        user={}
        if(req.session.user){
            user=req.session.user
        }
        currentStorage=await dbModel.getCurrentStorage()
        if(currentStorage.rows){
            currentStorage=currentStorage.rows
            res.render('exportGoodsPage',{title:'Xuất sản phẩm',user:user,list:currentStorage})
        }
        else{
            res.render('exportGoodsPage',{title:'Xuất sản phẩm',user:user,message:currentStorage})
        }

    }
    catch(err){
        console.log(err)
    }
}
const addNewCTReceipt =async(req,res,next)=>{
    try{
        list=req.body;

        idArr=list.id
        amountArr=list.amount
       

        idStr='ARRAY['
        amountStr='ARRAY['
        

        for(i=0;i<idArr.length;i++){
            if(i!=idArr.length-1){
                idStr= idStr.concat("'",idArr[i],"'",",")
                amountStr= amountStr.concat(amountArr[i],",")
       
            }
            else{
                idStr= idStr.concat("'",idArr[i],"'","]")
                amountStr= amountStr.concat(amountArr[i],"]")
       
            }
        }
        queryStr=idStr+","+amountStr
        result=await dbModel.addNewReceiptCT(queryStr)
        // console.log(result.rows[0])
        if(result.rows){
            res.send(result.rows[0])
        }
        else{
            res.send(result)
        }
    }
    catch(err){
        res.render('errorPage',{
            title:'Lỗi',
            user:user,
            message:err.message
        })
    }
}
module.exports={loadPage,addNewCTReceipt};