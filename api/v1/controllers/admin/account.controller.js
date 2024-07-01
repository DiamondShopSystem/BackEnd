const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const generateHelper = require("../../../../helpers/generate.helper");
const md5 = require('md5');
const jwt = require("jsonwebtoken");
const createTreeHelper = require("../../../../helpers//create-tree.helper")
const filterStateHelper = require("../../../../helpers/filter-state.helper");
const convertToSlugHelper = require("../../../../helpers/convert-to-slug.helper");
const paginationHelper = require("../../../../helpers/pagination.helper");
// [GET] /api/v1/admin/account/staff
module.exports.getStaff = async (req, res) => {
    try {
        let records = [];
        //Status Filter
        const filterState = filterStateHelper(req.query);
        //End Status Filter
        const find = {
            deleted: false,
        }
        // Pagination
        const countAccounts = await Account.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countAccounts);
        // End Pagination
        const keyword = req.query.keyword;
        if (req.query.status) {
            find.status = req.query.status;
        }
        //Search
        console.log(keyword);
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            // console.log(keywordSlugRegex)
            //End Search
            records = await Account.find({
                $and: [
                    {
                        $or: [
                            { email: keywordRegex },
                            { fullName: keywordRegex }
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
        return res.json({
            code: 200,
            account: records,
            msg: "Lấy danh sách tài khoản thành công",
            filterState: filterState,
            pagination: objectPagination
        });
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể lấy danh sách tài khoản"
        })
    }
}

// [POST] /api/v1/admin/account/staff/create
module.exports.createStaff = async (req, res) => {
    try {
        const email = req.body.email;
        const account = await Account.findOne({
            email: email,
            deleted: false
        });
        console.log(email);
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
            console.log(record);
            await record.save();
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

// [DELETE] /api/v1/admin/account/staff/delete/:id
module.exports.deleteStaff = async (req, res) => {
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


// [GET] /api/v1/admin/account/staff/detail/:id
module.exports.detailStaff = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        });

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

// [GET] /api/v1/admin/account/staff/edit/:id
module.exports.getEditStaff = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await Account.findOne({
            _id: req.params.id,
            deleted: false
        });

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

// [PATCH] /api/v1/admin/account/staff/edit/:id
module.exports.patchStaff = async (req, res) => {
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

// [GET] /api/v1/admin/account/user
module.exports.getUser = async (req, res) => {
    try {
        let records = [];
        //Status Filter
        const filterState = filterStateHelper(req.query);
        //End Status Filter
        const find = {
            deleted: false,
        }
        // Pagination
        const countAccounts = await User.countDocuments(find);
        const objectPagination = paginationHelper(4, req.query, countAccounts);
        // End Pagination
        const keyword = req.query.keyword;
        if (req.query.status) {
            find.status = req.query.status;
        }
        //Search
        console.log(keyword);
        if (keyword) {
            const keywordRegex = new RegExp(keyword, "i");
            // console.log(keywordSlugRegex)
            //End Search
            records = await User.find({
                $and: [
                    {
                        $or: [
                            { phone: keywordRegex },
                            { fullName: keywordRegex }
                        ]
                    },
                    find
                ]
            })
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);

        } else {
            records = await User.find(find)
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);
        }
        return res.json({
            code: 200,
            records: records,
            msg: "Lấy danh sách tài khoản thành công",
            filterState: filterState,
            pagination: objectPagination
        });
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thể lấy danh sách tài khoản"
        })
    }
}

// [POST] /api/v1/admin/account/user/create
module.exports.createUser = async (req, res) => {
    try {
        const phone = req.body.phone;
        console.log(phone);
        const user = await User.findOne({
            phone: phone,
            deleted: false
        });
        console.log(user);
        if (user) {
            return res.json({
                code: 401,
                msg: "Email đã tồn tại!"
            });
        } else {
            // tạo accessToken
            const accessToken = jwt.sign(phone, process.env.ACCESS_TOKEN_SECRET);
            const record = new User(req.body);
            console.log(record);
            await record.save();

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

// [DELETE] /api/v1/admin/account/user/delete/:id
module.exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        await User.updateOne({
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

// [GET] /api/v1/admin/account/user/detail/:id
module.exports.detailUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await User.findOne({
            _id: req.params.id,
            deleted: false
        });

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

// [GET] /api/v1/admin/account/user/edit/:id
module.exports.getEditUser = async (req, res) => {
    try {
        console.log(req.params.id);
        const data = await User.findOne({
            _id: req.params.id,
            deleted: false
        });

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

// [PATCH] /api/v1/admin/account/user/edit/:id
module.exports.patchUser = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        await User.updateOne({
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