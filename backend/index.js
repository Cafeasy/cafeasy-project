require("dotenv").config({ path: "../.env" });
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/router");
const cookieSession = require("cookie-session");
const port = process.env.PORT
const app = express();
const bodyParser = require('body-parser');

// const mongoose = require('mongoose');

//connect ke db
require('./config/database');
app.use(cors());
app.use(
    cookieSession({
        name: "session",
        keys: ["cyberwolve"],
        maxAge: 24 * 60 * 60 * 100,

    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use((error, req, res, next) => {
    const status = error.errorStatus || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({
        success: false,
        message: message,
        data: data
    })
})
app.use("/", router);

app.listen(port, () => console.log(`Listenting on port ${port}..., server up n running`));
// app.listen(4000);
