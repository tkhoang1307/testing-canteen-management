const crypto = require('crypto');
const configMomo = require('./configMomo.json')

const axios = require('axios')

const requestType = "captureWallet" 
const extraData = "";

const redirectUrl = configMomo.redirectUrl // thay đổi đường dẫn trả về khi thanh toán xong

// const ipnUrl = configMomo.redirectUrl +'payment-momo/callback'
// const ipnUrl = configMomo.redirectUrl +'payment-momo/callback' // api cung cấp cho Server momo để trả kq thanh toán
// const ipnUrl = "https://webhook.site/92b4028d-b566-4d2f-a4c7-213f09f36286"
const ipnUrl = configMomo.redirectUrl +'callback'
// const ipnUrl = configMomo.ipn

class Momo {
    constructor() {

    }
    CreateSignature(rawSignature) {

        var signature = crypto.createHmac('sha256', configMomo.secretkey)
            .update(rawSignature)
            .digest('hex');
        return signature
    }
    NewOrder({ amount, description }) {
        var requestId = configMomo.partnerCode + new Date().getTime()
        var orderId =requestId
        var rawSignature = "accessKey=" + configMomo.accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl="
            + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + description + "&partnerCode=" + configMomo.partnerCode
            + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType

        // console.log(rawSignature)
        return {
            partnerCode: configMomo.partnerCode,
            accessKey: configMomo.accessKey,
            requestId: requestId,
            amount: amount, // cần thêm
            orderId: orderId,
            orderInfo: description, // đoạn text hiển thị có thể sửa, có thẻ cho vào ID đơn hàng
            redirectUrl: redirectUrl, // link  trả về sau thanh toán
            ipnUrl: ipnUrl,
            extraData: extraData,  // rỗng
            requestType: requestType,
            signature: this.CreateSignature(rawSignature),
            lang: 'en'
        }

    }
    async CreateOrder(params = {}) {
        const order = this.NewOrder(params)
        // console.log(order)
        try {
            const res = await axios({
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                url: 'https://test-payment.momo.vn/v2/gateway/api/create',
                data: order,
            });
            return res.data;
        } catch (error) {
            // console.log(error)
            return error
        }
    }

    async VerifyCallback(data)
    {
        // console.log(data)
        console.log('da vao Callback')
        
        const res = await axios({
            method: 'POST',

            headers: { 'content-type': 'application/json' },
            url: ipnUrl,
            data: data,

        });
        console.log(res)

        return res
    }


}
module.exports = new Momo()