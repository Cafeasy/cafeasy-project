require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Transaksi = new Schema({
    idTransaksi: {
        type: String,
        required: true
    },
    idPelanggan: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        default: Date.now
    },
    noMeja: {
        type: Date,
        required: true
    },
    dataPesanan: {
        type: Array,
        required: true
    },
    totalHarga: {
        type: Number,
        required: true
    },
    statusBayar: {
        type: String,
        required: true,
        default: "Belum bayar"
    }
});

module.exports = mongoose.model('TransaksiPelanggan', Transaksi, 'transaksi');

