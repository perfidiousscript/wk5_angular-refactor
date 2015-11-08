/**
 * Created by samuelmoss on 11/6/15.
 */
var express = require('express');
var path = require('path');
var router = express.Router();
var message = require('./message');



router.use('/message', message);

router.get('/*', function(req,res){
    var file = req.params[0] || './views/index.html';
    res.sendFile(path.join(__dirname,'./public',file));
});


module.exports = router;