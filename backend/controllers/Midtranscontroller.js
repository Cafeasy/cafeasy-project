require('dotenv').config();
const crypto = require("crypto");
const midtransClient = require('midtrans-client');
const id = crypto.randomBytes(16).toString("hex");
let snap = new midtransClient.Snap({
    isProduction : false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});
// let coreApi = new midtransClient.CoreApi({
//     isProduction: false,
//     serverKey: process.env.MIDTRANS_SERVER_KEY,
//     clientKey: process.env.MIDTRANS_CLIENT_KEY
// })
var parameter = {
    "transaction_details": {
        "order_id": "YOUR-ORDERID-" + id,
        "gross_amount": 10000
    },
    "credit_card": {
        "secure": true
    },
    "customer_details": {
        "first_name": "budi",
        "last_name": "pratama",
        "email": "budi.pra@example.com",
        "phone": "08111222333"
    }
};
exports.buatTransaction = async (req, res) => {

    try {
        await snap.createTransaction(parameter)
            .then((transaction) =>
                res.status(201)
                    .json({ message: "Berhasil", data: transaction.token, url: transaction.redirect_url })
            ).catch((error) => res.status(500).json({ message: "error" + error }))
        
    } catch (err) {
        res.status(400).json("error :" + err);
    }
}
