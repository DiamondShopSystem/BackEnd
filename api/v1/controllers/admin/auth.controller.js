const Accounts = require("../../models/account.model");
const md5 = require("md5");

// [POST] /api/v1/admin/login
module.exports.loginPost = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log(email);
        console.log(password);

        const account = await Accounts.findOne({
            email: email,
            deleted: false
        });
        console.log(account);
        if (!account) {
            return res.json({
                code: 401,
                msg: "Email không tồn tại!"
            });
        }
        if (md5(password) != account.password) {
            return res.json({
                code: 402,
                msg: "Sai mật khẩu!"
            });
        }
        if (account.status != "active") {
            return res.json({
                code: 403,
                msg: "Tài khoản đang bị khóa!"
            });
        }
        const token = account.token;
        return res.json({
            code: 200,
            msg: "Đăng nhập thành công!",
            token: token
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: error.message
        });
    }
}