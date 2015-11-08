/**
 * Created by samuelmoss on 11/8/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//Sets up pg and connects to the PGSQL database
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/thunder_chat';

app.use(bodyParser.urlencoded({expanded: true}));

app.post('/post', function(req,res){

    //creates an object to insert into PGSQL
    var newMessage = {
        "message" : req.body.inputText
    };

    //Connects with postgres, inserts the new message into the db
    pg.connect(connectionString, function (err, client) {
        client.query("INSERT INTO messages (message) VALUES ($1)", [newMessage.message],
            function (err, result) {
                if (err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }
                res.send(true);
            }
        )
    });
});



module.exports = app;