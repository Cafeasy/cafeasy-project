const crypto = require("crypto");
const id = crypto.randomBytes(3).toString("hex");
const Customer = require("../model/Customermodel")

exports.custLogReg = (req, res) => {
    const name = req.body

    // try {
    //     Customer.create(name);
    //     res.status(200).json({ message: "Berhasil input" })
    //     res.redirect(process.env.CLIENT_URL + "Berandapage");
    // } catch {
    //     res.status(400).json({ message: "Gagal input" })
    //     res.redirect(process.env.CLIENT_URL + "Loginpage");
    // }

    const addCustomer = new Customer({
        name: name,
    });
    addCustomer.save().then(result => {
        res.status(200).json({ message: "Berhasil bos", data: result })
    }).catch(res.status(400).json({ message: "gagal input" }))

};

exports.getCustomer = (req, res) => {
    Customer.find({})
        .then(result => {
            res.status(200).json({
                message: 'Data menu berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
}