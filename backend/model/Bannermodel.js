require("../config/database");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ListBannermodel = new Schema({
    idBanner: {
        type: String,
        require: true
    },
    namaBanner: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    }
},{versionKey : false, timestamps : true});

module.exports = mongoose.model('DataBanner', ListBannermodel, 'dataBanner');