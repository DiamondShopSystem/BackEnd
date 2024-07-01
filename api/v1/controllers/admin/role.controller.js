const Role = require("../../models/role.model");

// [POST] api/v1/admin/role/create
module.exports.createRole = async (req, res) => {
    try {
        const record = new Role(req.body);
        console.log(req.body)
        console.log(record);
        await record.save();
        return res.json({
            code: 200,
            msg: "Tạo mới thành công"
        });
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thành công!"
        })
    }
}