require('dotenv').config();
const midtransClient = require('midtrans-client');
const fetch = require('node-fetch');

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

async function createTransaction(dataKeranjang) {
    return await snap.createTransaction(dataKeranjang)
}
async function getTransactionStatuss(idOrder) {
    const url = 'https://api.sandbox.midtrans.com/v2/' + idOrder + '/status';
    const options = {
        method: 'GET',
        headers: {
            authorization: 'Basic U0ItTWlkLXNlcnZlci1MX200RkhzV2hzbWRoWVpZUVdnSWtfWmI6'
        }
    };
    const response = await fetch(url, options);
    const dataTransaksi = await response.json();
    return dataTransaksi;
}

exports.buatTransaction = async (req, res) => {
    let param = req.body;
    const dataKeranjang = JSON.stringify(param);
    createTransaction(dataKeranjang).then((transaction) => {
        res.status(201)
            .json({ message: "Berhasil", data: transaction.token, url: transaction.redirect_url })
    }
    ).catch((error) => res.status(400).json({ message: "error" + error }))
}

exports.getTransactionStatus = async (req, res) => {
    const orderId = req.params.idOrder;
    try {
        const result = await getTransactionStatuss(orderId);
        res.status(200).json({
            message: "Get Status Transaksi", data: result
        })
    } catch (err) {
        res.status(404).json({
            message: "data get fail", data: err
        })
    }
}
exports.getTransactionStatuss = getTransactionStatuss;