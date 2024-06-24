const authRoutes = require("./auth.route");
const homeRoutes = require("./home.route");

module.exports = (app) => {

    const version = "/api/v1";


    app.use(version , authRoutes);

    app.use(version, homeRoutes);
}