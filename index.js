const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const routesAdminApiVer1 = require("./api/v1/routes/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(cors());


// parse application/json
app.use(bodyParser.json());

// Admin API Routes
routesAdminApiVer1(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});