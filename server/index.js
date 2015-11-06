var express = require('express');
var app = express();
var path = require('path');
var router = require('router');


app.set('port', process.env.PORT || 5000);

app.get('/', index);

app.listen('port', function(){
    console.log("d(-_-)b Listening on port:", app.get('port'));
});