const User = require("../../models/user.model");
const generateHelper = require("../../../../helpers/generate.helper");
const md5 = require("md5");

// [POST] /api/v1/user/login
module.exports.loginPost = async (req, res) => {
    try {
        const phone = req.body.phoneNumber;
        console.log(phone);
        const user = await User.findOne({
            phone: phone,
            deleted: false,
        });
        console.log(user);
        if (!user) {
            if (user.status != "active") {
                return res.json({
                    code: 403,
                    msg: "Tài khoản đang bị khóa!"
                });
            }
            req.body.token = generateHelper.generateRandomString(30);
            console.log(req.body);
            const record = new User(req.body);
            record.phone = phone;
            record.status = "active";
            record.deleted = "false";
            console.log(record);
            const data = await record.save();
            return res.json({
                code: 200,
                msg: "Tạo tài khoản thành công!",
                token: data.token
            });
        } else {
            return res.json({
                code: 205,
                msg: "Đã có tài khoản!",
            })
        }


    } catch (error) {
        return res.json({
            code: 400,
            msg: error.message
        });
    }
}