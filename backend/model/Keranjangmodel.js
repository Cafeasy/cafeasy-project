require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ListCartCust = new Schema({
    idPelanggan: {
        type: String,
        required: true
    },
    namaPelanggan: {
        type: String,
        required: true
    },
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

}, {versionKey : false, timestamps: true});

module.exports = mongoose.model('KeranjangPelanggan', ListCartCust, 'keranjangPelanggan');