require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
require('../service/passport.js');
const express = require('express');
const BerandaMenuController = require("../controllers/Menucontroller");
const KategoriMenuController = require("../controllers/Menucontroller");
const DetailMenuController = require("../controllers/Menucontroller");
const CustomerController = require("../controllers/Customercontroller");
const KeranjangController = require("../controllers/Keranjangcontroller");
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
    res.redirect(process.env.CLIENT_URL + "Loginpage");
});

router.use('/testing', (req, res, next) => {
    res.json({ name: "tes", tes: "yes" });
    next();
});



router.get('/ListMenu', BerandaMenuController.getListMenu);
router.get('/ListMenuByCategory/:kategoriMenu', KategoriMenuController.getMenuByCategory);
router.get('/DetailMenu/:idMenu', DetailMenuController.getMenuDetail);
router.post('/custLogReg', CustomerController.custLogReg);
router.get('/getCustomer', CustomerController.getCustomer);
router.get('/cartPelanggan/:idPelanggan', KeranjangController.getListCart);
// router.get('/ListMenuCustomer:id', getMenu.getListMenuById);
// router.get('/ListMenuCustomer:meja', ListMenu.(getListMenuByMeja));

module.exports = router;