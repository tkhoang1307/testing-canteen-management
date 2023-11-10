
const { query } = require('express');
const dbModel = require('../models/dbHelpers/dbHelpers');
const loadPage=async(req,res,next)=>{
    try{
        user={}
        if(req.session.user){
            user=req.session.user
        }
        allGoods=await dbModel.getAllGoods()
        if(allGoods.rows){
            allGoods=allGoods.rows
            res.render('importGoodsPage',{title:'Nhập sản phẩm',user:user,goodsList:allGoods})
        }
        else{
            res.render('importGoodsPage',{title:'Nhập sản phẩm',user:user,message:allGoods})
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

const addNewReceipt=async(req,res,next)=>{
    try{

        // console.log(req.body)
        list=req.body;

        category=list.category
        amount=list.amount
        price=list.price
        mfDate=list.mfDate

        categoryStr='ARRAY['
        amountStr='ARRAY['
        priceStr='ARRAY['
        mfDateStr="'{"

        console.log(category.length)
        for(i=0;i<category.length;i++){
            if(i!=category.length-1){
                categoryStr= categoryStr.concat("'",category[i],"'",",")
                amountStr= amountStr.concat(amount[i],",")
                priceStr= priceStr.concat(price[i],",")
                mfDateStr= mfDateStr.concat(mfDate[i],",")
            }
            else{
                categoryStr=categoryStr.concat("'",category[i],"']")
                amountStr= amountStr.concat(amount[i],"]")
                priceStr= priceStr.concat(price[i],"]")
                mfDateStr= mfDateStr.concat(mfDate[i],"}'")
            }
        }
        queryStr=categoryStr+","+amountStr+","+priceStr+","+mfDateStr

        result=await dbModel.addNewReceipt(queryStr)
        if(result.rows){
            res.send(result.rows[0])
        }
        else{
            res.send(result)
        }
        
    }
    catch(err){
        res.send(err.message)
    }
}
module.exports={loadPage,addNewReceipt};