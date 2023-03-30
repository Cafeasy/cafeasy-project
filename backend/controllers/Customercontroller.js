const Customer = require("../model/Customermodel")

exports.createCustomer = (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const pelanggan = {
        id: id,
        name: name
    }
    try {
        Customer.create(pelanggan)
        res.status(200).json({ message: "berhasil input", data: pelanggan })
    } catch {
        res.status(400).json({ message: "gagal input" })
    }
}
exports.getCustomer = (req, res) => {
    const id = req.params.id
    Customer.find({ id: `${id}` })
        .then(result => {
            res.status(200).json({
                message: 'Data menu berhasil dipanggil',
                data: result
            })
        }).catch(err => {
            next(err);
        })
}
