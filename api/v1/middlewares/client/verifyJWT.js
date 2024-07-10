const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.json({
            code: 401,
            msg: "Không thể xác thực"
        });
    }
    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.json({
                    code: 403,
                    msg: "Không thể xác thực"
                });
            }
            req.user = decoded.phoneNumber;
            next();
        }
    )
}
module.exports = verifyJWT;