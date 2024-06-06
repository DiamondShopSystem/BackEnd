const Category = require("../../models/category.model");

// [GET] /api/v1/admin/category
module.exports.getCategory = async (req, res) => {
    try {
        const record = await Category.find({
            deleted: false
        });
        return res.json({
            record: record,
            code: 200,
            msg: "Lấy danh sách thành công!"
        });
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không tìm thấy danh sách!"
        })
    }
}


// [POST] /api/v1/admin/category/create
module.exports.createPost = async (req, res) => {
    try {
        const record = new Category(req.body);
        console.log(record);
        await record.save();
        return res.json({
            code: 200,
            msg: "Tạo mới thành công"
        });

    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể tạo danh mục!"
        })
    }
};

// [DELETE] /api/v1/admin/category/delete/:id
module.exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await Category.updateOne({
            _id: id
        }, {
            deleted: true,
            deletedAt: new Date()
        });
        return res.json({
            code: 200,
            msg: "Xóa thành công!"
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể xóa!"
        })
    }

};

// [GET] /api/v1/admin/category/detail/:id
module.exports.detailCategory = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Category.findOne({
            _id: req.params.id,
            deleted: false
        });

        console.log(data);

        res.json({
            code: 200,
            category: data,
            msg: "Lấy thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            msg: "Lấy không thành công!"
        });
    }
};

// [PATCH] /api/v1/admin/category/edit/:id
module.exports.editPatchCategory = async (req, res) => {
    try {
        await Category.updateOne({
            _id: req.params.id,
            deleted: false
        }, req.body);
        return res.json({
            code: 200,
            msg: "Cập nhật thành công!"
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể cập nhật!"
        })
    }
}

// [GET] /api/v1/admin/category/edit/:id
module.exports.editGetCategory = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Category.findOne({
            _id: req.params.id,
            deleted: false
        });

        console.log(data);

        res.json({
            code: 200,
            category: data,
            msg: "Lấy thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            msg: "Lấy không thành công!"
        });
    }
}