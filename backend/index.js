require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const router = require("./routes/router");
const cookieSession = require("cookie-session");
const port = process.env.PORT || 8888
const app = express();
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

//connect ke db
require('./config/database');

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
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);

app.listen(port, () => console.log(`Listenting on port ${port}..., server up n running`));
// app.listen(4000);
app.use("/", router);