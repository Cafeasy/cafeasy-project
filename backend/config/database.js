const express = require("express");
const app = express();
const mongoose = require('mongoose');

const url = "mongodb://hallodeck:hallodeck5@ac-fyxbv6h-shard-00-00.i4jusgn.mongodb.net:27017,ac-fyxbv6h-shard-00-01.i4jusgn.mongodb.net:27017,ac-fyxbv6h-shard-00-02.i4jusgn.mongodb.net:27017/cafeasy?ssl=true&replicaSet=atlas-9r1c1k-shard-0&authSource=admin&retryWrites=true&w=majority";
module.exports.connect = async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const client = mongoose.connection;
client.on('error', (error) => console.log(error));
client.once('open', () => console.log('Database Connected...'));

module.exports.closeDatabse = async () => {
    await mongoose.connection.close();

}
