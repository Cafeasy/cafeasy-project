require('dotenv').config();
const midtransClient = require('midtrans-client');
const fetch = require('node-fetch');

let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});
// let coreApi = new midtransClient.CoreApi({
//     isProduction: false,
//     serverKey: process.env.MIDTRANS_SERVER_KEY,
//     clientKey: process.env.MIDTRANS_CLIENT_KEY
// })
async function createTransaction(req, res) {
    let param = req.body;
    const dataKeranjang = JSON.stringify(param);
    try {
        await snap.createTransaction(dataKeranjang)
            .then((transaction) => {
                res.status(201)
                    .json({ message: "Berhasil", data: transaction.token, url: transaction.redirect_url })
            }
            ).catch((error) => res.status(400).json({ message: "error" + error }))

    } catch (err) {
        res.status(500).json("error :" + err);
    }
}
async function getTransactionStatuss(idOrder) {

    const url = 'https://api.sandbox.midtrans.com/v2/' + idOrder + '/status';
    const options = {
        method: 'GET',
        headers: {
            authorization: 'Basic U0ItTWlkLXNlcnZlci1BMDQ2MHdVN3JWYjk2aGIwX2poNG5NSTE6'
        }
    };


    const response = await fetch(url, options);
    const dataTransaksi = await response.json();

    return dataTransaksi;
}

exports.buatTransaction = async (req, res) => {
    createTransaction(req, res);
}

exports.getTransactionStatus = async (req, res) => {
    const orderId = req.params.idOrder.toString();
    try {
        const result = await getTransactionStatuss(orderId);
        res.status(200).json({
            message: "data get berhasil", data: result
        })
    } catch (err) {
        res.status(404).json({
            message: "data get fail", data: err
        })
    }
}
