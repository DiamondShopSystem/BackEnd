const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");

// [GET] /cart/get
module.exports.index = async (req, res) => {
    try {
        const user = req.cookies.user;
        console.log(user);

        const cart = await Cart.findOne({
            user_id: user._id
        });
        console.log(cart);
        cart.totalPrice = 0;
        if (cart.products.length > 0) {
            for (const item of cart.products) {
                const product = await Product.findOne({
                    _id: item.product_id
                });

                product.priceNew = (product.price * (100 - product.discountPercentage) / 100).toFixed(0);

                item.productInfo = product;
                
                item.totalPrice = item.quantity * product.price;

                cart.totalPrice += item.totalPrice;
            }
            return res.json({
                code: 200,
                msg: "Thành công",
                cart: cart
            })

        }
    } catch (error) {
        return res.json({
            code: 400,
            msg: "Không thành công"
        })
    }
};

// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
    try {
        const productId = req.params.productId;
        const product = await Product.findOne({
            _id : productId
        });
        const quantity = 1;
        // const quantity = parseInt(req.body.quantity);
        console.log(productId);
        const user = req.cookies.user;
        console.log(user);
        const cart = await Cart.findOne({
            user_id: user._id
        });
        console.log(cart);
        if (cart) {
            const existProductInCart = cart.products.find(item => item.product_id == productId);
            console.log(existProductInCart);
            if (existProductInCart) {
                const quantityNew = existProductInCart.quantity + quantity;
                await Cart.updateOne({
                    _id: cart._id,
                    "products.product_id": productId
                }, {
                    $set: { "products.$.quantity": quantityNew }
                });
            } else {
                const objectCart = {
                    product_id: productId,
                    quantity: quantity,
                };
                await Cart.updateOne(
                    { _id: cart._id },
                    {
                        $push: { products: objectCart },
                    }
                );
            }
        }
        res.json({
            code: 200,
            cart: cart,
            msg: "Thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            msg: "Không thành công"
        })
    }
};