/**
 * Created by samuelmoss on 11/8/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({expanded: true}));

app.post('/post', function(req,res){
    res.send(req.body);
    console.log("here is req.body", req.body);
});

module.exports = app;