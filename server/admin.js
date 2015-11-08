/**
 * Created by samuelmoss on 11/8/15.
 */
var express = require('express');
var app = express();
var path = require('path')

module.exports = app.use(function(req,res){
    res.sendFile(path.join(__dirname,'./public/views/admin.html'));
});