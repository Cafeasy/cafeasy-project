require("../config/database");
const { faArrowTrendUp } = require("@fortawesome/free-solid-svg-icons");
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
    namaPelanggan: {
        type: String,
        required: true
    },
    tanggal: {
        type: String,
        required: true
    },
    noMeja: {
        type: Number,
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
    }
}, {versionKey : false, timestamps : true});

module.exports = mongoose.model('TransaksiPelanggan', Transaksi, 'transaksi');

