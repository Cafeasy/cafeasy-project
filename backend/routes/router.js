require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
require('../service/passport.js');
const express = require('express');
const ListMenuController = require("../controllers/ListMenucontroller");
const app = express();
// require('../config/database');

router.get("/auth/login/success", (req, res) => {
    if (req.user) {

        res.status(200).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        });

    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/auth/login/failed", (req, res) => {
    res.status(401).json({
        error: true,
        message: "Log in failure",
    });
});

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: process.env.CLIENT_URL + "Berandapage",
        failureRedirect: "/login/failed",
    })
);

router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

router.use('/testing', (req, res, next) => {
    res.json({name: "tes", tes: "yes"});
    next();
});



router.get('/ListMenu', ListMenuController.getListMenu);
// router.get('/ListMenuCustomer:id', getMenu.getListMenuById);
// router.get('/ListMenuCustomer:meja', ListMenu.(getListMenuByMeja));

module.exports = router;