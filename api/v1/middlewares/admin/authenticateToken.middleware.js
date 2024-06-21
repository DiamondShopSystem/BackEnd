const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports.authen(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        // Ko có quyền truy cập
        return res.sendStatus(401)
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) =>{
        if(err) {
            // Hết hạn token
            return res.sendStatus(403)
        }
        req.user = user;
        next();
    })
}