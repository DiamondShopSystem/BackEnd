const Category = require("../../models/category.model");
const createTreeHelper = require("../../../../helpers/create-tree.helper");
const Product = require("../../models/product.model");
// [GET] api/v1/
module.exports.getHome = async (req, res) => {
    try {
        const find = {
            deleted: false,
        }

        const records = await Category.find(find);
        const popularProducts = await Product.find({
            isHighlight: true
        });
        const newRecords = createTreeHelper(records);
        console.log(newRecords);
        return res.json({
            records: newRecords,
            popularProducts: popularProducts,
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