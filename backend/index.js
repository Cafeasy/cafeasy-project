const express = require('express'); //memanggil express


const app = express(); //memanggil method express

app.use(() => {
    console.log("hello hallodeck");
    console.log("hello world");
})

app.listen(8888);