

const dbModel = require('../models/dbHelpers/dbHelpers');

const loadPage = async (req, res) => {
    user = {}
    if (req.session.user) {
        user = req.session.user
        console.log(user)
    }
    message=""
    try {
        var category=""
        if(req.query.category){
            category = req.query.category
        }
        console.log(category)
        const result = await dbModel.getAllGoodsOfCategory(category)
        
        res.render('categoryPage',
        {
            title:category,
            user: user,
            key: category,
            arrResult : result,

        })

    } catch (error) {
        res.render('errorPage',{
            title:'Lỗi',
            user:user,
            message:error.message
        })
    }
}
module.exports = { loadPage }