var express = require('express');
var app = express();
var router = require('./router');



app.set('port', process.env.PORT || 5000);


app.use('/', router);

app.listen(app.get('port'), function(){
    console.log("d(-_-)b Listening on port:", app.get('port'));
});