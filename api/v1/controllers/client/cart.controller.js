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
        console.log(cart);
        if (cart) {
            if (cart.products.length > 0) {
                for (const item of cart.products) {
                    const product = await Product.find({
                        _id: item.product_id
                    });
                    console.log(item.product_id)
                    item.productInfo = product;
                    console.log(item.quantity)
                    console.log(product.price)
                    const totalPrice = item.quantity * product.price;
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
        const size = req.body.selectedSize;
        const productId = req.params.productId;
        const quantity = 1;
        const cart = await Cart.findOne({
            user_id: "6691057efbb258c025f7fa5a"
        });
        console.log(cart);
        const product = await Product.findOne({
            _id: req.params.productId
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
            console.log("Hi")
            const objectCart = {
                product_id: productId,
                quantity: quantity,
            };

            await Cart.updateOne(
                { user_id: "6691057efbb258c025f7fa5a" },
                {
                    $push: { products: objectCart },
                    $push: { size: size },
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