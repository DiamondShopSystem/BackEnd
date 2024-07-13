const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const User = require("../../models/user.model");
// [GET] /cart/get
module.exports.index = async (req, res) => {
    try {
        let records = [];
        // const user = req.cookies.user;
        const cart = await Cart.findOne({
            user_id: "6691057efbb258c025f7fa5a"
        });
        cart.totalPrice = 0;
        if (cart) {
            if (cart.products.length > 0) {
                for (let [index, item] of cart.products.entries()) {
                    const product = await Product.find({
                        _id: item.product_id
                    });
                    console.log(index, item);
                    item.productInfo = product;
                    let quantity = item.quantity;
                    let price = product[0].price;
                    const totalPrice = quantity * price;
                    // db.cart.update({},
                    //     { $set: { "productInfo": product } },
                    //     {
                    //         upsert: false,
                    //         multi: true
                    //     });
                    cart.totalPrice += totalPrice;
                }
            }
            return res.json({
                code: 200,
                records: records,
                msg: "Thành công",
                cart: cart
            })
        } else {
            const newCart = new Cart({
                user_id: "6691057efbb258c025f7fa5a",
            })
            await newCart.save();
            return res.json({
                code: 200,
                msg: "Thành công",
                cart: newCart
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
        console.log(req.body);
        const productId = req.body.id;
        const size = req.body.selectedSize;
        const quantity = 1;
        const cart = await Cart.findOne({
            user_id: "6691057efbb258c025f7fa5a"
        });
        console.log(cart);
        const product = await Product.findOne({
            _id: productId
        });
        console.log(product)
        const existProductInCart = cart.products.find(item => item.product_id == productId);
        console.log(existProductInCart);
        if (existProductInCart) {
            const quantityNew = existProductInCart.quantity + quantity;

            await Cart.updateOne({
                user_id: "6691057efbb258c025f7fa5a",
                "products.product_id": productId
            }, {
                $set: { "products.$.quantity": quantityNew }
            });
        } else {
            const objectCart = {
                product_id: productId,
                quantity: quantity,
                size: size
            };

            await Cart.updateOne(
                { user_id: "6691057efbb258c025f7fa5a" },
                {
                    $push: { products: objectCart },
                }
            );
        }
        // if (cart) {
        //     const item = cart.cartItems.find(item => item.product == product)
        //     if (item) {
        //         await Cart.findOneAndUpdate({ user: user._id, "cartItems.product": product }, {
        //             "$set": {
        //                 "cartItems": {
        //                     ...req.body.cartItems,
        //                     quantity: item.quantity + req.body.cartItems.quantity
        //                 }
        //             }
        //         })
        //     } else {
        //         await Cart.findOneAndUpdate({ user: user._id }, {
        //             $push: {
        //                 "cartItems.product": product
        //             },
        //             done
        //         })
        //     }

        // } else {
        //     const newCart = new Cart({
        //         user: user._id,
        //         cartItems: req.body.cartItems
        //     })
        //     await newCart.save();
        // }
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

// [DELETE] /cart/delete/:productId
module.exports.deleteItem = async (req, res) => {
    try {
        const productId = req.params.productId;
        console.log(productId);
        await Cart.updateMany({
            user_id: "6691057efbb258c025f7fa5a",
        }, {
            $pull: { products: { product_id: productId } }
        })
        res.json({
            code: 200,
            msg: "Thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            msg: "Thất bại"
        })
    }
}