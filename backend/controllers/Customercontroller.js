const Customer = require("../model/Customermodel")

exports.createCustomer = async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const pelanggan = {
        id: id,
        name: name
    }
    try {
        await Customer.create(pelanggan)
        res.status(200).json({ message: "berhasil input", data: pelanggan })

    } catch {
        res.status(400).json({ message: "gagal input" })
    }
}
exports.getCustomerByName = async (req, res, next) => {
    const name = req.params.name
    try {
        await Customer.findOne({ name: `${name}` })
            .then(result => {
                res.status(200).json({
                    message: 'Data Customer berhasil dipanggil',
                    data: result
                })
            }).catch(err => {
                next(err);
            })
    } catch {
        res.status(400).json({ message: "gagal get Data" })
    }

}
exports.getAllCustomer = (req, res) => {
    Customer.find({}).then(result => {
        res.status(200).json({
            message: 'Data Semua Customer Berhasil Dipanggil',
            data: result
        })
    }).catch(err => {
        next(err);
    })

}

exports.getCustomerById = async (req, res, next) => {
    const id = req.params.idUser
    try {
        await Customer.find({ id: `${id}` })
            .then(result => {
                res.status(200).json({
                    message: 'Data Customer berhasil dipanggil',
                    data: result
                })
            }).catch(err => {
                next(err);
            })
    } catch {
        res.status(400).json({ message: "gagal get Data" })
    }

}
