
const dbModel = require('../models/dbHelpers/dbHelpers');

const loadPage = async(req,res)=>
{
    try {
        user={}
        if(req.session.user){
            user=req.session.user
        }
        goodCategory=await dbModel.getAllGoodCategory()
        if(Array.isArray(goodCategory)){
            res.render('addNewItemPage',{title:'Thêm sản phẩm', user:user,goodsCategory:goodCategory})
        }
        else{
            res.render('addNewItemPage',{title:'Thêm sản phẩm', user:user,message:goodCategory.message})
        }
        
    } catch (error) {
        console.log(error)
    }
    
}
const addNewItem= async(req,res)=>
{   
    user={}
    if(req.session.user){
        user=req.session.user
    }

    try {
        var result
        // console.log(req.body)
        if(req.body.type=='matHang'){
            ma_loai_hang=req.body.ma_loai_hang
            ten_mat_hang=req.body.ten_mat_hang
            tien_loi=req.body.tien_loi
            img_url=req.body.img_url
            han_su_dung=req.body.han_su_dung
            result=await dbModel.addNewGood(ma_loai_hang,ten_mat_hang,img_url,tien_loi,han_su_dung)
        }
        else if(req.body.type=='monAn'){
            ten_mon_an=req.body.ten_mon_an
            gia_ban=req.body.gia_ban
            img_url=req.body.img_url
            console.log(ten_mon_an,gia_ban,img_url)
            console.log('hehe')
            result=await dbModel.addNewFood(ten_mon_an,gia_ban,img_url)
        }
        if(result.rows){
            res.send('Thành công')
        }
        else{
            res.send(result)
        }
        // res.send('hehe')
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = { loadPage,addNewItem}