const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const cors = require("cors");
const moment = require('moment');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const routesAdminApiVer1 = require("./api/v1/routes/admin/index.route");
const routesClientApiVer1 = require("./api/v1/routes/client/index.route");
database.connect();

const app = express();
const port = process.env.PORT;
app.use(cookieParser());
app.use(cors({ credentials: true ,  origin: 'http://localhost:3000'}));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// App Local Variables
app.locals.moment = moment;


// parse application/json
app.use(bodyParser.json());

// Admin API Routes
routesAdminApiVer1(app);
// Client API Routes
routesClientApiVer1(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});