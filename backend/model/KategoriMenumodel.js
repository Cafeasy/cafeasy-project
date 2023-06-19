require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ListKategorimodel = new Schema({
    idKategori: {
        type: String,
        require: true
    },
    namaKategori: {
        type: String,
        require: true
    }
},{versionKey : false, timestamps : true});

module.exports = mongoose.model('KategoriMenu', ListKategorimodel, 'kategoriMenu');