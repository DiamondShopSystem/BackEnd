const Product = require("../../models/product.model");
const Category = require("../../models/category.model");

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    try {
        const slugCategory = req.params.slugCategory;
        console.log(slugCategory);

        const category = await Category.findOne({
            slug: slugCategory,
            status: "active",
            deleted: false
        });
        console.log(category);
        const getSubCategory = async (parentId) => {
            const subs = await Category.find({
                parent_id: parentId,
                status: "active",
                deleted: false
            });

            let allSubs = [...subs];

            for (const sub of subs) {
                const childs = await getSubCategory(sub.id);
                allSubs = allSubs.concat(childs);
            }

            return allSubs;
        }

        const allCagegory = await getSubCategory(category.id);
        console.log(allCagegory);
        const allCagegoryId = allCagegory.map(item => item.id);
        console.log(allCagegoryId);
        const products = await Product.find({
            category_id: {
                $in: [
                    category.id,
                    ...allCagegoryId
                ]
            },
            status: "active",
            deleted: false
        });
        // for (const item of products) {
        //     item.priceNew = (item.price * (100 - item.discountPercentage) / 100).toFixed(0);
        // }

        console.log(products);

        return res.json({
            records: products,
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

// [GET] /:id
module.exports.productDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findOne({
            _id: id,
            deleted: false,
            status: "active"
        });

        res.json({
            code: 200,
            msg: "Thành công",
            record: product
        })
    } catch (error) {
        res.json({
            code: 400,
            msg: "Không thành công"
        })
    }
}