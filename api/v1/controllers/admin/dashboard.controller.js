const Category = require("../../models/category.model");
const Order = require("../../models/order.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");

module.exports.index = async (req, res) => {
    try {
        const productsTotal = await Product.countDocuments({
            deleted: false
        });

        const categoryTotal = await Category.countDocuments({
            deleted: false
        });
        const userTotal = await User.countDocuments({
            deleted: false
        })
        const orderTotal = await Order.countDocuments({
            deleted: false
        });
        return res.json({
            code: 200,
            msg: "Thành công",
            productsTotal: productsTotal,
            categoryTotal: categoryTotal,
            userTotal: userTotal,
            orderTotal: orderTotal
        })
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Lỗi"
        })
    }
}