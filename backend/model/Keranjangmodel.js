require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ListCartCust = new Schema({
    idKeranjang: {
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
    dataPesanan: {
        type: Array,
        required: true
    }

}, {versionKey : false, timestamps : true});

module.exports = mongoose.model('KeranjangPelanggan', ListCartCust, 'keranjangPelanggan');