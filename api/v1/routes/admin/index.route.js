const accountRoutes = require("./account.route");
const categoryRoutes = require("./category.route");
const authRoutes = require("./auth.route");
const productRoutes = require("./product.route");
const roleRoutes = require("./role.route");
const systemConfig = require("../../../../config/system");

module.exports = (app) => {

    const version = "/api/v1";

    const PATH_ADMIN = `/${systemConfig.prefixAdmin}`;

    app.use(version + `${PATH_ADMIN}`, authRoutes);

    app.use(version + `${PATH_ADMIN}/account`, accountRoutes);

    app.use(version + `${PATH_ADMIN}/product`, productRoutes);

    app.use(version + `${PATH_ADMIN}/category`, categoryRoutes);

    app.use(version + `${PATH_ADMIN}/role`, roleRoutes);

}