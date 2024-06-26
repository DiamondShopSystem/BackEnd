const Account = require("../../models/account.model");
const generateHelper = require("../../../../helpers/generate.helper");
const md5 = require('md5');
const jwt = require("jsonwebtoken");
const createTreeHelper = require("../../../../helpers//create-tree.helper")
const filterStateHelper = require("../../../../helpers/filter-state.helper");
const convertToSlugHelper = require("../../../../helpers/convert-to-slug.helper");
const paginationHelper = require("../../../../helpers/pagination.helper");
// [GET] /api/v1/admin/account
module.exports.getAccount = async (req, res) => {
    try {
        let records = [];
        //Status Filter
        const filterState = filterStateHelper(req.query);
        //End Status Filter
        const find = {
            deleted: false,
        }
        // Pagination
        const countProducts = await Account.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countProducts);
        // End Pagination
        const keyword = req.query.keyword;
        if (req.query.status) {
            find.status = req.query.status;
        }
        //Search
        console.log(keyword);
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            const slug = convertToSlugHelper.convertToSlug(keyword);
            const keywordSlugRegex = new RegExp(slug, "i");
            //End Search
            records = await Account.find({
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
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);

        } else {
            records = await Account.find(find)
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);
        }
        return res.status(200).json({
            account: records,
            msg: "Lấy danh sách tài khoản thành công",
            filterState: filterState,
            pagination: objectPagination
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Không thể lấy danh sách tài khoản"
        })
    }
}

// [POST] /api/v1/admin/account/create
module.exports.createPost = async (req, res) => {
    try {
        const email = req.body.email;
        const account = await Account.findOne({
            email: email,
            deleted: false
        });
        if (account) {
            return res.json({
                code: 401,
                msg: "Email đã tồn tại!"
            });
        } else {
            // tạo accessToken
            const accessToken = jwt.sign(email, process.env.ACCESS_TOKEN_SECRET);
            req.body.password = md5(req.body.password);
            const record = new Account(req.body);
            record.status = "active";
            const data = await record.save();
            return res.json({
                code: 200,
                msg: "Tạo tài khoản thành công",
                account: record,
                token: accessToken
            });
        }

    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể tạo tài khoản!"
        })
    }

};

// [DELETE] /api/v1/admin/account/delete/:id
module.exports.deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await Account.updateOne({
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


// [GET] /api/v1/admin/account/detail/:id
module.exports.detailAccount = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        });

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

// [GET] /api/v1/admin/account/edit/:id
module.exports.editAccount = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        });
        
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

// [PATCH] /api/v1/admin/account/edit/:id
module.exports.editPatchAccount = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        await Account.updateOne({
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

