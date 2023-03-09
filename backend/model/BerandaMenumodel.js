require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ListMenumodel = new Schema({
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
    stokMenu: {
        type: Number,
        required: true
    },
    deskripsiMenu: {
        type: String,
        required: true
    },
    kategoriMenu: {
        type: String,
        required: true
    }

    // idMenu: "test",
    // namaMenu: "test",
    // hargaMenu: "test",
    // stokMenu: "test",
    // deskripsiMenu: "test",
    // kategoriMenu: "test"
});

module.exports = mongoose.model('Menu', ListMenumodel, 'menu');