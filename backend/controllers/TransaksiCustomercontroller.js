const TransaksiPelanggan = require("../model/TransaksiCustomermodel");
const Customer = require("../model/Customermodel");
const KeranjangPelanggan = require("../model/Keranjangmodel");
const KeranjangController = require("../controllers/Keranjangcontroller");
const Midtrans = require('../controllers/MidtransController');

exports.getTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;

    TransaksiPelanggan.find({ idPelanggan: `${idPelanggan}` })
        .then(result => {
            if(result) {
                res.status(200).json({
                    message: 'Data transaksi berhasil dipanggil',
                    data: result
                })
            } else if(!result) {
                res.status(404).json({
                    message: 'Data transaksi gagal dipanggil',
                    data: result
                })
            }
        })
        .catch(err => {
            next(err);
        })
}

exports.getDetailTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    const idTransaksi = req.params.idTransaksi;

    TransaksiPelanggan.find({ idPelanggan: `${idPelanggan}`, idTransaksi: `${idTransaksi}` })
        .then(result => {
            if(result) {
                res.status(200).json({
                    message: 'Data transaksi pelanggan berhasil dipanggil',
                    data: result
                })
            } else if(Qresult) {
                res.status(404).json({
                    message: 'Data transaksi pelanggan gagal dipanggil',
                    data: result
                })
            }
        })
        .catch(err => {
            next(err);
        })
}

exports.postTransaksiPelanggan = async (req, res, next) => {
    //check data berdasarkan request idKeranjang req url
    var idKeranjangCheck = req.params.idKeranjang;

    //query cari data keranjang berdasarkan id yang direquest pada url dan menjadikan object
    let checkKeranjangByParams = await KeranjangPelanggan.findOne({ idKeranjang: `${idKeranjangCheck}` });
    let obyekKeranjang = checkKeranjangByParams.toObject();

    //sign data ke variable yang akan dijadikan data insert keranjang
    var idKeranjangSign = obyekKeranjang.idKeranjang;
    var idPelangganSign = obyekKeranjang.idPelanggan;
    var namaPelangganSign = obyekKeranjang.namaPelanggan;
    var dataPesananSign = obyekKeranjang.dataPesanan;

    //date gmt
    var ndate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    })

    //var untuk menampung total harga
    var totalHarga = 0;

    //looping untuk mengambil total harga data pesanan
    const len = obyekKeranjang.dataPesanan.length;
    // console.log(obyekKeranjang.dataPesanan);
    for (var i = 0; i < len; i++) {
        totalHarga = totalHarga + (obyekKeranjang.dataPesanan[i].hargaMenu * obyekKeranjang.dataPesanan[i].qty)
    }

    const insertTransaksi = new TransaksiPelanggan({
        idTransaksi: idKeranjangSign,
        idPelanggan: idPelangganSign,
        namaPelanggan: namaPelangganSign,
        tanggal: ndate,
        noMeja: 8,
        dataPesanan: dataPesananSign,
        totalHarga: totalHarga,
        statusBayar: "Belum bayar"
    })

    insertTransaksi.save().then(result => {
        res.status(200).json({
            message: "Transaksi disimpan, selesaikan pembayaran agar pesanan diproses ya",
            data: result
        })
    }).catch(err => {
        next(err);
    });

    KeranjangPelanggan.deleteOne(({ idKeranjang: `${idKeranjangCheck}` }))
        .catch(err => {
            next(err);
        })
}

exports.updateStatusBayar = async (req, res, next) => {
    //update status bayar
    const idTransaksiCheck = req.params.idTransaksi;
    const statusBayar = await Midtrans.getTransactionStatuss(idTransaksiCheck);

    //date gmt
    var ndate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta'
    })
    let newStatusBayar = statusBayar.transaction_status;
    if (newStatusBayar.toString() == "settlement") {
        newStatusBayar = "SUCCESS";

    } else {
        newStatusBayar = statusBayar.transaction_status.toString().toUpperCase();
    }
    TransaksiPelanggan.findOneAndUpdate({ idTransaksi: `${idTransaksiCheck}` }, { $set: { statusBayar: newStatusBayar, tanggal: ndate } }, { new: true })
        .then(result => {
            res.status(200).json({
                message: 'Status bayar berhasil diupdate - Pembayaran Sukses',
                data: result
            })
        })
        .catch(err => {
            next(err);
        })
}