const Customer = require("../model/Customermodel")


async function buatCustomer(customer) {
    return await Customer.create(customer);
}

async function getOneCustomerByName(name) {

    return await Customer.findOne({ name: name });
}

async function getOneCustomerById(id) {
    return await Customer.findOne({ id: id });
}

exports.createCustomer = async (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const pelanggan = {
        id: id,
        name: name
    }
    try {
        await buatCustomer(pelanggan);
        res.status(200).json({ message: "berhasil input", data: pelanggan })

    } catch (err) {
        res.status(400).json({ message: "gagal input", data: err })
    }
}
exports.getCustomerByName = async (req, res) => {
    const name = req.params.name;

    try {
        const result = await getOneCustomerByName(name);

        res.status(200).json({ message: "berhasil get Data", data: result })


    } catch (err) {
        res.status(400).json({ message: "gagal get Data", err })
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

exports.getCustomerById = async (req, res) => {
    const id = req.params.idUser
    try {
        const result = await getOneCustomerById(id);

        res.status(200).json({
            message: 'Data Customer berhasil dipanggil',
            data: result
        })

    } catch {
        res.status(400).json({ message: "gagal get Data" })
    }

}
exports.getOneCustomerByName = getOneCustomerByName;
exports.buatCustomer = buatCustomer;
exports.getOneCustomerById = getOneCustomerById;