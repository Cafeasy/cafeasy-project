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

exports.buatTransaction = async (req, res) => {
    createTransaction(req, res);
}
async function getTransactionStatuss(req, res) {
    const orderId = req.params.idOrder.toString();
    const url = 'https://api.sandbox.midtrans.com/v2/' + orderId + '/status';
    const options = {
        method: 'GET',
        headers: {
            authorization: 'Basic U0ItTWlkLXNlcnZlci1BMDQ2MHdVN3JWYjk2aGIwX2poNG5NSTE6'
        }
    };

    try {
        const response = await fetch(url, options);
        const dataTransaksi = await response.json();
        if (dataTransaksi) {
            res.status(200).json({ message: "get Status", data: dataTransaksi });
        }

    } catch (err) {
        res.status(401).json({ message: "Gagal get status", data: err });
    }

}
exports.getTransactionStatus = async (req, res) => {
    getTransactionStatuss(req, res);
}
