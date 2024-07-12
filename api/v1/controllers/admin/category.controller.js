const Category = require("../../models/category.model");
const createTreeHelper = require("../../../../helpers//create-tree.helper");
const filterStateHelper = require("../../../../helpers/filter-state.helper");
const convertToSlugHelper = require("../../../../helpers/convert-to-slug.helper");
const paginationHelper = require("../../../../helpers/pagination.helper");

// [GET] /api/v1/admin/category
module.exports.getCategory = async (req, res) => {
    try {
        let total = [];
        //Status Filter
        const filterState = filterStateHelper(req.query);
        //End Status Filter

        let records = [];

        const find = {
            deleted: false,

        }
        // Pagination
        const countProducts = await Category.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countProducts);
        // End Pagination
        const keyword = req.query.keyword;
        if (req.query.status) {
            find.status = req.query.status;
        }

        // Sort
        const sort = {};
        if (req.query.sortKey && req.query.sortValue) {
            sort[req.query.sortKey] = req.query.sortValue;
        } else {
            sort["position"] = "desc";
        }
        // End Sort

        //Search
        console.log(keyword);
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            const slug = convertToSlugHelper.convertToSlug(keyword);
            const keywordSlugRegex = new RegExp(slug, "i");
            //End Search
            total = await Category.find(find);
            records = await Category.find({
                $and: [
                    {
                        $or: [
                            { title: keywordRegex },
                            { slug: keywordSlugRegex }
                        ]
                    },
                    find
                ]
            })
                .sort(sort)
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);

        } else {
            total = await Category.find(find);
            records = await Category.find(find)
                .sort(sort)
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);
        }
        console.log(total);
        let counter = 0;
        for (let i = 0; i < total.length; i++) {
            counter++;
        }
        return res.json({
            records: records,
            filterState: filterState,
            keyword: keyword,
            total: counter,
            pagination: objectPagination,
            find: find,
            sort: sort,
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
        const countRecords = await Category.countDocuments();
        req.body.position = countRecords + 1;
        console.log(req.body);
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
        // Kiểm tra có danh mục cha hay không
        if (data.parent_id === "") {
            // Ko có thì ko làm gì cả
        } else {
            // Nếu có tìm ra danh mục đó và dán Title Danh mục cha vào
            const parent = await Category.findOne({
                _id: data.parent_id,
                deleted: false
            });
            data.parentTitle = parent.title;
        }
        res.json({
            code: 200,
            record: data,
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
        const data = await Category.findOne({
            _id: req.params.id,
            deleted: false
        });

        const records = await Category.find({

        });

        let newRecords = createTreeHelper(records);

        res.json({
            code: 200,
            record: data,
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
        if (req.params.id === req.body.parent_id) {
            return res.json({
                code: 401,
                msg: "Không thể cập nhật!"
            })
        }
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

