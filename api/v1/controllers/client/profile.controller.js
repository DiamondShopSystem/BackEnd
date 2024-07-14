const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    try {
        const userId = req.cookies.user;
        const user = await User.findOne({
            _id: userId
        });
        return res.json({
            user: user,
            code: 200,
            msg: "Thành công"
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thành công"
        })
    }
}

module.exports.patchInfo = async (req, res) => {
    try {
        const userId = req.cookies.user;
        const user = await User.findOne({
            _id: userId
        });
        await User.updateOne({
            _id: user._id,
            deleted: false
        }, req.body)
        return res.json({
            user: user,
            code: 200,
            msg: "Thành công"
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thành công"
        })
    }
}