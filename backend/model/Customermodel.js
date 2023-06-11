require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerModel = new Schema({

    id: {
        type: String, required: true
    },
    name: {
        type: String, required: true
    }

},{versionKey : false})


module.exports = mongoose.model('Pelanggan', CustomerModel, 'pelanggan');