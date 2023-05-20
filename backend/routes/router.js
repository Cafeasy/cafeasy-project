require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
require('../service/passport.js');
const express = require('express');
const MenuController = require("../controllers/Menucontroller");
const CustomerController = require("../controllers/Customercontroller");
const KeranjangController = require("../controllers/Keranjangcontroller");
const RiwayatpesananController = require("../controllers/Riwayatpesanancontroller");
const app = express();
const Customer = require("../model/Customermodel")



router.get("/" ,(req,res)=>{
    let navPage = '<a href="/ListMenu" >List Menu Service</a><br> <a href="/allCustomer" >Customer</a>';
    res.send(navPage);
})

router.get("/auth/login/success", (req, res) => {
    if (req.user) {

        res.status(201).json({
            error: false,
            message: "Successfully Loged In",
            user: req.user,
        });

    } else {
        res.status(403).json({ error: true, message: "Not Authorized" });
    }
});

router.get("/login/success", (req, res) => {
    if (req.user) {
        const data = req.user;
        const user = data

        const inputUser = {
            id: "gusr"+user.id,
            name: user.name.givenName + " " + user.name.familyName
        }
        Customer.create(inputUser)
        res.redirect(process.env.CLIENT_URL + "Berandapage/" + "gusr"+user.id)


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
        successRedirect: "/login/success",
        failureRedirect: "/login/failed",
    }),
);

router.get("/auth/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL + "Loginpage");
});

router.use('/testing', (req, res, next) => {
    res.json({ name: "tes", tes: "yes" });
    next();
});


//routes crud daftar menu
router.get('/ListMenu', MenuController.getListMenu);
router.get('/ListMenuByCategory/:kategoriMenu', MenuController.getMenuByCategory);
router.get('/DetailMenu/:idMenu', MenuController.getMenuDetail);
router.get('/NotAvailableMenu', MenuController.getNotAvailableMenu)

router.post('/customer', CustomerController.createCustomer);
router.get('/customer/:id', CustomerController.getCustomer);
router.get('/allCustomer', CustomerController.getAllCustomer);

//routes crud keranjang
router.get('/cartPelanggan/:idPelanggan', KeranjangController.getListCart);
router.post('/postCart/:idPelanggan/:idMenu', KeranjangController.postCart);
router.delete('/delCart/:idPelanggan/:idKeranjang', KeranjangController.deleteCart);
router.put('/cartPelanggan/:idKeranjang', KeranjangController.updateCart);
router.put('/cartPelangganMinus/:idKeranjang', KeranjangController.updateCartMinus);
router.put('/cartPelangganPlus/:idKeranjang', KeranjangController.updateCartPlus)

//routes crud riwayat pesanan
router.get('/historyPesananPelanggan/:idPelanggan', RiwayatpesananController.getListHistory);
// router.delete('delHistoryPesananPelanggan/:idPelanggan', RiwayatpesananController.deleteHistory);
// router.get('/ListMenuCustomer:id', getMenu.getListMenuById);
// router.get('/ListMenuCustomer:meja', ListMenu.(getListMenuByMeja));

router.get('*',(req,res)=>{
    res.send('<h1> 404. This page does not exist. <a href="/" >Back Home</a> </h1>')
})
module.exports = router;