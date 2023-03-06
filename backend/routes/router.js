const { response } = require('express')
const express = require('express')
const path = require('path');
const router = new express.Router()



router.get('/', function(req, res) {
    res.send("hello");

});



module.exports = router