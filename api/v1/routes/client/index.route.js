

module.exports = (app) => {

    const version = "/api/v1";


    app.use(version + `${PATH_ADMIN}`, authRoutes);

    app.use(version + `${PATH_ADMIN}/accounts`, accountRoutes);

}