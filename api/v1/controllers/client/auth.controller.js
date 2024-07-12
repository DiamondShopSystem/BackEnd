const Cart = require("../../models/cart.model");
const User = require("../../models/user.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// [POST] /api/v1/login/verify/otp
module.exports.login = async (req, res) => {
    try {
        const phoneNumber = req.body.phoneNumber;

        const user = await User.findOne({
            phoneNumber: phoneNumber,
            deleted: false,
        });
        const accessToken = jwt.sign(
            { 'phoneNumber': phoneNumber },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3600s' }
        );
        const refreshToken = jwt.sign(
            { 'phoneNumber': phoneNumber },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        if (!user) {
            const record = new User(req.body);
            await record.save();

            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.cookie("user", user, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            return res.json({
                record: record,
                accessToken: accessToken,
                code: 200,
                msg: "Tạo tài khoản thành công!"
            });
        } else {
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.cookie("user", user, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            return res.json({
                record: user,
                accessToken: accessToken,
                code: 200,
                msg: "Đăng nhập thành công!",
            })
        }
    } catch (error) {
        return res.json({
            code: 400,
            msg: error.message
        });
    }
}

// [GET] /api/v1/auth/refresh
module.exports.refreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(401);
    }
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {
                return res.json({
                    code: 403,
                    msg: 'Không thể xác thực'
                });
            }
            const user = await User.findOne({ phone: decoded.phone });

            if (!user) {
                return res.json({
                    code: 401,
                    msg: "Không thể xác thực"
                })
            }
            const accessToken = jwt.sign(
                { 'phone': user.phone },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            res.json({
                code: 200,
                accessToken: accessToken
            });
        })

}


// [GET] /api/v1/logout
module.exports.logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;
    const account = await User.findOne({
        refreshToken: refreshToken
    })
    if (!account) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        res.clearCookie('user', { httpOnly: true, sameSite: 'None', secure: true });
    }

    res.json({
        code: 200,
        msg: "Đã xóa Cookie"
    });
}