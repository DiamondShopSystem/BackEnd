const authRoutes = require("./auth.route");
const homeRoutes = require("./home.route");
const productRoutes = require("./product.route");
const cartRoutes = require("./cart.route");

module.exports = (app) => {

    const version = "/api/v1";


    app.use(version , authRoutes);

    app.use(version, homeRoutes);

    app.use(version , productRoutes);

    app.use(version + "/cart", cartRoutes);
}