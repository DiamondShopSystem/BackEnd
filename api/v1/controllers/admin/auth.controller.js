const Accounts = require("../../models/account.model");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// [POST] /api/v1/admin/login
module.exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        
        const account = await Accounts.findOne({
            email: email,
            deleted: false
        });
        const accessToken = jwt.sign(email , process.env.ACCESS_TOKEN_SECRET);

        if (!account) {
            return res.json({
                code: 401,
                msg: error.message
            });
        }
        if (md5(password) != account.password) {
            return res.json({
                code: 402,
                msg: error.message
            });
        }
        if (account.status != "active") {
            return res.json({
                code: 403,
                msg: error.message
            });
        }
        // const token = account.token;
        return res.json({
            code: 200,
            msg: "Đăng nhập thành công!",
            accessToken: accessToken
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: error.message
        });
    }
}