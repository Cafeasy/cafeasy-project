const TransaksiPelanggan = require("../model/TransaksiCustomermodel");
const RiwayatPesananPelanggan = require("../model/Riwayatpesananmodel");
const Customer = require("../model/Customermodel");
const KeranjangPelanggan = require("../model/Keranjangmodel");

exports.getTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    
    TransaksiPelanggan.find({idPelanggan: `${idPelanggan}`})
    .then(result => {
        res.status(200).json({
            message: 'Data transaksi pelanggan (' + idPelanggan + ') berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}

exports.getDetailTransaksiPelanggan = async (req, res, next) => {
    const idPelanggan = req.params.idPelanggan;
    const idTransaksi = req.params.idTransaksi;
    
    TransaksiPelanggan.find({idPelanggan: `${idPelanggan}`, idTransaksi: `${idTransaksi}`})
    .then(result => {
        res.status(200).json({
            message: 'Data transaksi (' + idTransaksi + ') berhasil dipanggil',
            data: result
        })
    })
    .catch(err => {
        next(err);
    })
}