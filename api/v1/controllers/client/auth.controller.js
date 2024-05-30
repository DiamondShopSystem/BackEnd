const User = require("../../models/user.model");
const md5 = require("md5");

// [POST] /api/v1/user/login
module.exports.loginPost = async (req, res) => {
    try {
        const phone = req.body.phone;

        const user = await User.findOne({
            phone: phone,
            deleted: false
        });
        console.log(user);
        if (!user) {
            return res.json({
                code: 205,
                msg: "Chưa có tài khoản!"
            });
        }
        if (account.status != "active") {
            return res.json({
                code: 403,
                msg: "Tài khoản đang bị khóa!"
            });
        }
        return res.json({
            code: 200,
            msg: "Tìm thấy tài khoản!",
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: error.message
        });
    }
}