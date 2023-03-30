require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CustomerModel = new Schema({
    name: {
        type: String
    }

})

module.exports = mongoose.model('Pelanggan', CustomerModel, 'pelanggan');