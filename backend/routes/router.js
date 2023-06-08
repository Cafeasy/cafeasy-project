require("dotenv").config();
const router = require("express").Router();
const passport = require("passport");
require('../service/passport.js');
const express = require('express');
const MenuController = require("../controllers/Menucontroller");
const CustomerController = require("../controllers/Customercontroller");
const KeranjangController = require("../controllers/Keranjangcontroller");
const RiwayatpesananController = require("../controllers/Riwayatpesanancontroller");
const TransaksiController = require("../controllers/TransaksiCustomercontroller");
const app = express();
const Customer = require("../model/Customermodel");
const Midtrans = require('../controllers/MidtransController');


router.get("/", (req, res) => {
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

router.get("/login/success", async(req, res)  => {
    if (req.user) {
        const data = req.user;
        const user = data

        const inputUser = {
            id: "gusr" + user.id,
            name: user.name.givenName + " " + user.name.familyName
        }

        let hasil = await  Customer.findOne({ id: `gusr${user.id}` })
        if (hasil) {
            let oldUser = hasil.toObject();
            res.redirect(process.env.CLIENT_URL + "/Berandapage/" + "gusr" + oldUser.id)
        } else {
            Customer.create(inputUser)
            res.redirect(process.env.CLIENT_URL + "/Berandapage/" + "gusr" + user.id)
        }
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
    res.redirect(process.env.CLIENT_URL + "/Loginpage");
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
//Customer
router.post('/customer', CustomerController.createCustomer);
router.get('/getCustomerByName/:name', CustomerController.getCustomerByName);
router.get('/allCustomer', CustomerController.getAllCustomer);
router.get('/getCustomerById/:idUser', CustomerController.getCustomerById);

//routes crud keranjang
router.get('/cartPelanggan/:idPelanggan', KeranjangController.getListCart);
router.post('/postCart/:idPelanggan/:idMenu', KeranjangController.postCart);
router.delete('/delCart/:idPelanggan/:idMenu', KeranjangController.deleteCart);
router.put('/updateCartCatatanPelanggan/:idPelanggan/:idMenu', KeranjangController.updateCartCatatanPelanggan);
router.put('/cartPelangganMinus/:idPelanggan/:idMenu', KeranjangController.updateCartMinus);
router.put('/cartPelangganPlus/:idPelanggan/:idMenu', KeranjangController.updateCartPlus);

//routes crud riwayat pesanan
router.get('/historyPesananPelanggan/:idPelanggan', RiwayatpesananController.getListHistory);
// router.delete('delHistoryPesananPelanggan/:idPelanggan', RiwayatpesananController.deleteHistory);

//routes crud transaksi
router.get('/getAllTransaksi/:idPelanggan', TransaksiController.getTransaksiPelanggan);
router.get('/getDetailTransaksi/:idPelanggan/:idTransaksi', TransaksiController.getDetailTransaksiPelanggan);
router.post('/postTransaksi/:idKeranjang', TransaksiController.postTransaksiPelanggan);
router.delete('/delTransaksi/:idPelanggan',);
router.put('/updateStatusBayar/:idTransaksi', TransaksiController.updateStatusBayar);
//routes payment Midtrans
router.post('/midtransPayment/', Midtrans.buatTransaction);
router.get('/getTransactionStatus/:idOrder', Midtrans.getTransactionStatus);


router.get('*', (req, res) => {
    res.send('<h1> 404. This page does not exist. <a href="/" >Back Home</a> </h1>')
})
module.exports = router;