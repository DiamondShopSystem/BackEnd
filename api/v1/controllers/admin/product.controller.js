const Product = require("../../models/product.model");
const createTreeHelper = require("../../../../helpers//create-tree.helper")
const filterStateHelper = require("../../../../helpers/filter-state.helper");
// [GET] /api/v1/admin/product
module.exports.getProduct = async (req, res) => {
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
        const records = await Product.find(find)
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

// [GET] /api/v1/admin/product/create
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
// [POST] /api/v1/admin/product/create
module.exports.createProduct = async (req, res) => {
    try {
        const record = new Product(req.body);
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
module.exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await Product.updateOne({
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

// [GET] /api/v1/admin/product/detail/:id
module.exports.detailProduct = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Product.findOne({
            _id: req.params.id,
            deleted: false
        });
        // if (data.parent_id === "") {

        // } else {
        //     const parent = await Category.findOne({
        //         _id: data.parent_id,
        //         deleted: false
        //     });
        //     console.log(parent.title);
        //     data.parentTitle = parent.title;
        // }
        // console.log(data);

        res.json({
            code: 200,
            data: data,
            msg: "Lấy thành công"
        });
    } catch (error) {
        res.json({
            code: 400,
            msg: "Lấy không thành công!"
        });
    }
};