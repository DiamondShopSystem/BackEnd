const authRoutes = require("./auth.route");
const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");
const paymentRoutes = require("./payment.route");
const profileRoutes = require("./profile.route");
module.exports = (app) => {

    const version = "/api/v1";


    app.use(version , authRoutes);

    app.use(version, homeRoutes);

    app.use(version , productRoutes);

    app.use(version + "/cart", cartRoutes);

    app.use(version + "/user" , profileRoutes);

    app.use(version + "/payment" , paymentRoutes);

}