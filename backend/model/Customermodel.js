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

},{versionKey : false,})


// const CustomerModel = mongoose.Schema({
//     namaCust: {
//         type: String,
//         required: true
//     },
//     idCust: 
// })