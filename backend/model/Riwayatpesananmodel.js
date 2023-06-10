require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RiwayatPesananModel = new Schema({
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
        type: Date,
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
    statusBayar: {
        type: String,
        required: true
    },
    totalHarga: {
        type: Number,
        required: true
    }

}, {versionKey : false});

module.exports = mongoose.model('RiwayatPesanan', RiwayatPesananModel, 'riwayatPesananPelanggan');