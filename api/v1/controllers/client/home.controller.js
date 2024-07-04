const Category = require("../../models/category.model");
const createTreeHelper = require("../../../../helpers/create-tree.helper");
const Product = require("../../models/product.model");
// [GET] api/v1/
module.exports.getHome = async (req, res) => {
    try {
        // Sản phẩm nổi bật
        const popularProducts = await Product.find({
            isHighlight: true,
            status: "active",
            deleted: false,
        }).sort({ position: "desc"}).limit(10);
        // Hết sản phẩm nổi bật
        
        // Sản phẩm mới nhất
        const newProducts = await Product.find({
            status: "active",
            deleted: false,
        }).sort({ position: "desc"}).limit(10);
        // Hết sản phẩm mới nhất

        // Danh mục
        const findCategory = {
            deleted: false,
        }

        const records = await Category.find(findCategory);

        const newRecords = createTreeHelper(records);
        return res.json({
            category: newRecords,
            popularProducts: popularProducts,
            newProducts: newProducts,
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