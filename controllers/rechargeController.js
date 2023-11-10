
const dbModel = require('../models/dbHelpers/dbHelpers');
const addBalance = async (req, res) => {
    try {
        const idBank = req.body.idBank
        const val = req.body.val
        const idUser = req.session.user.id
        var cardValue = 0
        var check = true
        if (idBank == '1') {
            if (val == 'VIETTEL100') {
                cardValue = 100
            } else if (val == 'VIETTEL50') {
                cardValue = 50
            }
            else{
                check = false
            }
        }
        else if (idBank == '2') {
            if (val == 'MOBI100') {
                cardValue = 100
            } else if (val == 'MOBI50') {
                cardValue = 50
            }else{
                check = false
            }
        }
        else {
            res.send({ res: 'failed', check: check })
        }

        if (cardValue == 100) {
            var result = await dbModel.rechargeBalance(idUser, 100)
            var balance = await dbModel.getUserBalance(idUser)
            res.send({res:'success', balance: balance})
        }
        else if( cardValue == 50)
        {
            var result = await dbModel.rechargeBalance(idUser, 50)
            var balance = await dbModel.getUserBalance(idUser)
            res.send({res:'success', balance: balance})
        }
        else{
            res.send({res: 'failed', check: check})
        }


        console.log(idBank, val)

    } catch (error) {

    }
}

const getIndex = (req, res) => {
    var user = {}
    if (req.session.user) {
        user = req.session.user
    }
    res.render('rechargePage', { title:'Nạp tiền vào tài khoản',user: user })
}
module.exports = { addBalance, getIndex }