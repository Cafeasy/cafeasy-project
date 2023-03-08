const express = require("express");
const app = express();
const mongoose = require('mongoose');

// var mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://hallodeck:hallodeck5@tacapstone.i4jusgn.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true});
// var conn = mongoose.connection;
// conn.on('connected', function() {
//     app.listen(port, () => console.log(`Listenting on port ${port}..., server up n running`));
// });
// conn.on('disconnected', function(){
//     console.log('database is disconnected successfully');
// })
// conn.on('error', console.error.bind(console, 'connection error:'));
// module.exports = conn;

//lokal db
// mongodb://localhost/cafeasy


mongoose.connect('mongodb+srv://hallodeck:hallodeck5@tacapstone.i4jusgn.mongodb.net/cafeasy?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const client = mongoose.connection;
client.on('error', (error) => console.log(error));
client.once('open', () => console.log('Database Connected...'));