
const dbModel = require('../models/dbHelpers/dbHelpers');
const getAllGoods=async(req,res,next)=>{
    try{
        var allGoodsInfo
        allGoodsInfo=await dbModel.getAllGoods()
        res.send(allGoodsInfo)
    }
    catch(err){
        res.send(err.message);
    }
}
module.exports={getAllGoods};