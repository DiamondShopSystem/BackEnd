const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.authenticateToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        // Ko có quyền truy cập
        return res.json({
            code: 401,
            msg: "Không có quyền truy cập"
        })
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) {
            // Hết hạn token
            return res.json({
                code: 403,
                msg: "hết hạn token"
            })
        }
        req.user = user;
        next();
    })
};