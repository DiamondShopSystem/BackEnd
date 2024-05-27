const Accounts = require("../../models/account.model");
const generateHelper = require("../../../../helpers/generate.helper");
const md5 = require('md5');

// [POST] /api/v1/admin/accounts/create
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
            req.body.token = generateHelper.generateRandomString(30);
            req.body.password = md5(req.body.password);

            const record = new Accounts(req.body);
            record.status = "active";
            const data = await record.save();
            return res.json({
                code: 200,
                msg: "Tạo tài khoản thành công",
                token: data.token
            });
        }

    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể tạo tài khoản!"
        })
    }

};