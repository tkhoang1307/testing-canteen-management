const CryptoJS = require('crypto-js')
// const config = require('../config.json')
// const moment = require('moment')
// const axios = require('axios')

// const ZaloPay = require('../Zalo pay/ZaloPay')
const Momo = require('../momoPayment/classMomo')
const getIndex = async(req, res) => {
    res.send('haha');


    try {
        const val = '12000'
        // const name = req.body.name
        const orderID = 'req.body.orderID'
        var result = ""
        console.log(val,orderID)


        // if (name == 'Zalo') {
        //     result = await ZaloPay.CreateOrder({ amount: val, description: orderID })

        // } else {
            result = await Momo.CreateOrder({ amount: val, description: orderID })
        // }
        console.log(result)
        res.send(result)
    } catch (error) {
        console.log(error)
    }
}


const makePayment = async (req, res) => {
    try {
        const val = parseInt(req.body.value)
        // const name = req.body.name
        const orderID = req.body.orderID
        var result = ""
        console.log(val,orderID)

        // if (name == 'Zalo') {
        //     result = await ZaloPay.CreateOrder({ amount: val, description: orderID })

        // } else {
        result = await Momo.CreateOrder({ amount: val, description: orderID })
        // }

        res.send(result)
    } catch (error) {
        console.log(error)
    }

}



var data = ''
var arr = []
const processPaymentResult = async (req, res) => {
    console.log('da vao callback')
    if (Object.keys(data).length !== 0) {
        arr.push(data)
    }
    if (Object.keys(req.body).length !== 0) {

        // NƠI LƯU KQ THANH TOÁN VÀO DATABASE
        data = req.body
        // res.send(data)
        console.log('KET QUA THANH TOAN: ',data)

        // console.log('da send')

    }
    console.log('arr: ', arr)
    res.send(data)
}
module.exports = {
     makePayment,
    processPaymentResult,getIndex
}