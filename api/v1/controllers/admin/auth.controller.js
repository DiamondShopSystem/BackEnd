const Account = require("../../models/account.model");
const md5 = require("md5");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// [POST] /api/v1/admin/login
module.exports.loginPost = async (req, res) => {
    try {
        // Lấy email từ frontend 
        const email = req.body.email;
        console.log(email)
        // Lấy password từ frontend 
        const password = req.body.password;
        console.log(password)
        //tìm trong data có account map với email và chưa bị xóa
        const account = await Account.findOne({
            email: email,
            deleted: false
        });
        console.log(account);
        // tạo accessToken
        const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
        res.cookie("token", accessToken, {
            withCredentials: true,
            httpOnly: false,
        });
        // Kiểm tra có tài khoản hay chưa
        if (!account) {
            return res.json({
                code: 401,
                msg: "Không thành công!"
            });
        }
        // Kiểm tra mật khẩu
        if (md5(password) != account.password) {
            return res.json({
                code: 402,
                msg: "Không thành công!"
            });
        }
        // Kiểm tra trạng thái, nếu ko active tức bị khóa => ko cho xài
        if (account.status != "active") {
            return res.json({
                code: 403,
                msg: "Không thành công!"
            });
        }
        
        // Thành công
        return res.json({
            code: 200,
            msg: "Đăng nhập thành công!",
            token: accessToken
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thành công!"
        });
    }
}