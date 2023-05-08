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
    tanggal: {
        type: Date,
        required: true
    },
    noMeja: {
        type: Number,
        required: true
    },
    dataPesanan: [{
        idMenu: {
            type: String,
            required: true
        },
        namaMenu: {
            type: String,
            required: true
        },
        hargaMenu: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        },
        catatanPelanggan: {
            type: String,
            required: true
        }
    }],
    statusBayar: {
        type: String,
        required: true
    },
    totalHarga: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('RiwayatPesanan', RiwayatPesananModel, 'riwayatPesananPelanggan');