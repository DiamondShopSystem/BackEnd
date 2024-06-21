const Accounts = require("../../models/account.model");
const generateHelper = require("../../../../helpers/generate.helper");
const md5 = require('md5');
const jwt = require("jsonwebtoken");

// [GET] /api/v1/admin/account
module.exports.getAccount = async (req, res) => {
    try {
        const record = await Accounts.find({
            deleted: false
        })
        return res.status(200).json({
            account: record,
            msg: "Lấy danh sách tài khoản thành công"
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Không thể lấy danh sách tài khoản"
        })
    }
}

// [POST] /api/v1/admin/account/create
module.exports.createPost = async (req, res) => {
    try {
        const email = req.body.email;
        const account = await Accounts.findOne({
            email: email,
            deleted: false
        });
        if (account) {
            return res.json({
                code: 401,
                msg: "Email đã tồn tại!"
            });
        } else {
            // tạo accessToken
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
            req.body.password = md5(req.body.password);
            const record = new Accounts(req.body);
            record.status = "active";
            const data = await record.save();
            return res.json({
                code: 200,
                msg: "Tạo tài khoản thành công",
                account: record,
                token: accessToken
            });
        }

    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể tạo tài khoản!"
        })
    }

};