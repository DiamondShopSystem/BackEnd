const Diamond = require("../../models/diamond.model");
const Category = require("../../models/category.model");
const createTreeHelper = require("../../../../helpers//create-tree.helper");
const filterStateHelper = require("../../../../helpers/filter-state.helper");
const convertToSlugHelper = require("../../../../helpers/convert-to-slug.helper");
const paginationHelper = require("../../../../helpers/pagination.helper");
module.exports.index = async (req, res) => {
    try {
        let total = [];
        //Status Filter

        const filterState = filterStateHelper(req.query);
        //End Status Filter
        const find = {
            deleted: false,
        }
        // Pagination
        const countProducts = await Diamond.countDocuments(find);
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
            // End Search
            total = await Diamond.find({
                $and: [
                    {
                        $or: [
                            { title: keywordRegex },
                            { slug: keywordSlugRegex }
                        ]
                    },
                    find
                ]
            });
            records = await Diamond.find({
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
            total = await Diamond.find(find);
            records = await Diamond.find(find)
                .sort(sort)
                .limit(objectPagination.limitItems)
                .skip(objectPagination.skip);
        }
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
module.exports.createDiamond = async (req, res) => {
    try {
        console.log(req.body)
        const record = new Diamond(req.body);
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
};