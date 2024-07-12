const Account = require("../../models/account.model");
// const md5 = require("md5");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();

// [POST] /api/v1/admin/login
module.exports.login = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        const password = req.body.password;
        console.log(password);
        const account = await Account.findOne({
            email: email,
            deleted: false
        });
        console.log(account);
        if (!account) {
            return res.json({
                code: 401,
                msg: "Không thành công!"
            });
        }
        const checkPassword = await bcrypt.compare(password, account.password);
        if (checkPassword && (account.status === "active")) {
            const accessToken = jwt.sign(
                { 'email': account.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            const refreshToken = jwt.sign(
                { 'email': account.email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 });
            res.cookie('email', email, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7 * 24 * 60 * 60 * 1000 })
            return res.json({
                code: 200,
                msg: "Đăng nhập thành công!",
                accessToken: accessToken
            })
        } else {
            return res.json({
                code: 401,
                msg: "Không thành công!"
            });
        }
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thành công!"
        });
    }
}

// [GET] /api/v1/admin/auth/refresh
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
            const account = await Account.findOne({ email: decoded.email });

            if (!account) {
                return res.json({
                    code: 401,
                    msg: "Không thể xác thực"
                })
            }
            const accessToken = jwt.sign(
                { 'email': account.email },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            res.json({
                code: 200,
                accessToken: accessToken
            });
        })

}

// [GET] /api/v1/admin/logout
module.exports.logout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.sendStatus(204);
    }
    const refreshToken = cookies.jwt;
    const account = await Account.findOne({
        refreshToken: refreshToken
    })
    if (!account) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    }

    res.json({
        code: 200,
        msg: "Đã xóa Cookie"
    });
}

