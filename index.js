const express = require("express");
require("dotenv").config();
const database = require("./config/database");
const cors = require("cors");
const bodyParser = require("body-parser");
const routesApiVer1 = require("./api/v1/routes/admin/index.route");

database.connect();

const app = express();
const port = process.env.PORT;
console.log("OKOKEOKO");

app.use(cors());


// parse application/json
app.use(bodyParser.json());

// API Routes
routesApiVer1(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});