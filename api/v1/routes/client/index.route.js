const authRoutes = require("./auth.route");


module.exports = (app) => {

    const version = "/api/v1";


    app.use(version , authRoutes);


}