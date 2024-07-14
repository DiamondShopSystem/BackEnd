const axios = require('axios');
const { v4: uuidv4 } = require('uuid'); // npm install uuid
const moment = require('moment'); // npm install moment
const CryptoJS = require('crypto-js'); // npm install crypto-js
const express = require('express'); // npm install express
const bodyParser = require('body-parser'); // npm install body-parser
const qs = require('qs');
const Order = require('../../models/order.model');
const Cart = require("../../models/cart.model");
module.exports.index = async (req, res) => {
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = "  https://db39-1-53-43-238.ngrok-free.app/api/v1/callback";
    var requestType = "payWithMethod";
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    //signature
    const crypto = require('crypto');
    var signature = crypto.createHmac('sha256', secretKey)
        .update(rawSignature)
        .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature
    });
    //option for axios
    const options = {
        method: "POST",
        url: "https://test-payment.momo.vn/v2/gateway/api/create",
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody)
        },
        data: requestBody
    }
    let result;
    try {
        result = await axios(options);
        return res.status(200).json(result.data);
    } catch (error) {
        return res.status(500).json({
            statusCode: 500,
            message: "Server error"
        })
    }
}

module.exports.callback = async (req, res) => {
    console.log("Call back:: ");
    console.log(req.body);
    res.status(200).json(req.body)
}

module.exports.redirectZalo = async (req, res) => {
    const config = {
        key2: "Iyz2habzyr7AG8SgvoBCbKwKi3UzlLi3"
    };
    let data = req.query;
    let checksumData = data.appid + '|' + data.apptransid + '|' + data.pmcid + '|' + data.bankcode + '|' + data.amount + '|' + data.discountamount + '|' + data.status;
    let checksum = CryptoJS.HmacSHA256(checksumData, config.key2).toString();

    if (checksum != data.checksum) {
        res.sendStatus(400);
    } else {
        // kiểm tra xem đã nhận được callback hay chưa, nếu chưa thì tiến hành gọi API truy vấn trạng thái thanh toán của đơn hàng để lấy kết quả cuối cùng
        res.sendStatus(200);
    }
}
// [POST] /api/v1/payment/zalo
module.exports.paymentZalo = async (req, res) => {
    console.log(req.body);
    const price = req.body.totalPrice;
    const fullName = req.body.fullName;
    const phone = req.body.phone;
    const address = req.body.address;
    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    const embed_data = {
        redirecturl: ""
    };

    const items = [{}];
    const transID = Math.floor(Math.random() * 1000000);
    const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format('YYMMDD')}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: "user123",
        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: price,
        description: `Thanh toán #${transID}`,
        bank_code: "",
        callback_url: "https://7200-42-117-255-15.ngrok-free.app/api/v1/payment/zalo/callback"
    };

    // appid|app_trans_id|appuser|amount|apptime|embeddata|item
    const data = config.app_id + "|" + order.app_trans_id + "|" + order.app_user + "|" + order.amount + "|" + order.app_time + "|" + order.embed_data + "|" + order.item;
    order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();
    try {
        const result = await axios.post(config.endpoint, null, { params: order })
        return res.status(200).json(result.data);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports.callbackZalo = async (req, res) => {
    console.log("Hi")
    let result = {};
    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };
    try {
        let dataStr = req.body.data;
        let reqMac = req.body.mac;

        let mac = CryptoJS.HmacSHA256(dataStr, config.key2).toString();
        console.log("mac =", mac);


        // kiểm tra callback hợp lệ (đến từ ZaloPay server)
        if (reqMac !== mac) {
            console.log("Hi1")
            // callback không hợp lệ
            result.return_code = -1;
            result.return_message = "mac not equal";
        }
        else {
            console.log("Hi2")
            // thanh toán thành công
            // merchant cập nhật trạng thái cho đơn hàng
            let dataJson = JSON.parse(dataStr, config.key2);
            console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

            result.return_code = 1;
            result.return_message = "success";
        }
        // thông báo kết quả cho ZaloPay server
        console.log(result)
        res.status(200).json(result);
    } catch (ex) {
        result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
        result.return_message = ex.message;
    }


};

module.exports.checkStatusZalo = async (req, res) => {

    const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/query"
    };
    const app_trans_id = req.params.app_trans_id;
    let postData = {
        app_id: config.app_id,
        app_trans_id: app_trans_id, // Input your app_trans_id
    }

    let data = postData.app_id + "|" + postData.app_trans_id + "|" + config.key1; // appid|app_trans_id|key1
    postData.mac = CryptoJS.HmacSHA256(data, config.key1).toString();


    let postConfig = {
        method: 'post',
        url: config.endpoint,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: qs.stringify(postData)
    };

    try {
        const result = await axios(postConfig)
        return res.status(200).json(result.data);
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Lỗi"
        })
    }
}

module.exports.paymentCod = async (req, res) => {
    try {
        const userId = req.cookies.user;
        const price = req.body.totalPrice;
        const fullName = req.body.fullName;
        const phone = req.body.phone;
        const address = req.body.address;
        const order = new Order(req.body);
        const cart = await Cart.findOne({
            _id: req.cookies.cart
        });
        console.log(cart);
        order.user_id = userId;
        const orderId = order._id;
        await order.save();
        await Order.updateOne({
            _id: orderId
        },
            {
                $push: { products: cart.products }
            },
        );
        await Cart.updateOne({
            user_id: userId
        }, {
            $set: { products: []}
        })
        console.log(order);
        res.json({
            code: 200,
            order: order,
            msg: "Thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            msg: "Không thành công"
        })
    }

}