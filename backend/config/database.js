const express = require("express");
const app = express();
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_SERVER_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const client = mongoose.connection;
client.on('error', (error) => console.log(error));
client.once('open', () => console.log('Database Connected...'));