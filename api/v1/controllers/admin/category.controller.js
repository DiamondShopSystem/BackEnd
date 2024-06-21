const Category = require("../../models/category.model");
const createTreeHelper = require("../../../../helpers//create-tree.helper")
const filterStateHelper = require("../../../../helpers/filter-state.helper");
// [GET] /api/v1/admin/category
module.exports.getCategory = async (req, res) => {
    try {
        //Status Filter
        const filterState = filterStateHelper(req.query);
        //End Status Filter
        const find = {
            deleted: false,
        }
        if (req.query.status) {
            find.status = req.query.status;
        }
        //Search
        if (req.query.keyword) {
            const regex = new RegExp(req.query.keyword, "i");
            find.title = regex;
        } else {
            req.query.keyword = "";
        }
        //End Search
        const records = await Category.find(find)
        return res.json({
            records: records,
            filterState: filterState,
            keyword: req.query.keyword,
            code: 200,
            msg: "Thành công"
        });
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Thất bại"
        })
    }
}

// [GET] /api/v1/admin/category/create
module.exports.createGet = async (req, res) => {
    try {
        const find = {
            deleted: false,
        }

        const records = await Category.find(find);

        const newRecords = createTreeHelper(records);
        console.log(newRecords);
        return res.json({
            records: newRecords,
            code: 200,
            msg: "Thành công"
        });
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Thất bại"
        })
    }
}
// [POST] /api/v1/admin/category/create
module.exports.createPost = async (req, res) => {
    try {
        const record = new Category(req.body);
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
        if (data.parent_id === "") {

        } else {
            const parent = await Category.findOne({
                _id: data.parent_id,
                deleted: false
            });
            console.log(parent.title);
            data.parentTitle = parent.title;
        }
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

// [GET] /api/v1/admin/category/edit/:id
module.exports.editGetCategory = async (req, res) => {
    try {
        // console.log(req.params.id);
        const data = await Category.findOne({
            _id: req.params.id,
            deleted: false
        });

        console.log(data._id);
        const records = await Category.find({
            deleted: false,
        });
        
        let newRecords = createTreeHelper(records);
        newRecords = newRecords.filter(item => item.slug != data.slug)
        // console.log(updateNewRecords);
        res.json({
            code: 200,
            category: data,
            records: newRecords,
            msg: "Lấy thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            msg: "Lấy không thành công!"
        });
    }
}

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

