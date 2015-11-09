/**
 * Created by samuelmoss on 11/8/15.
 */
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//Sets up pg and connects to the PGSQL database
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://ec2-54-83-0-61.compute-1.amazonaws.com/d3enktn9kkarls';

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

//This GET call quesrys all messages in the database and sends them back down to the client.
app.get('/refresh', function(req,res){

    pg.connect(connectionString, function (err, client, done) {

        var refreshMessages = [];

        var messageList = client.query("SELECT * FROM messages");


        messageList.on('row', function (row) {
            refreshMessages.push(row);
        });

        messageList.on('end', function () {
            client.end();
            return res.json(refreshMessages);
        });

        if (err) {
            console.log(err);
        }
    });
});

app.delete('/delete', function(req,res){

    var deleteId = req.body.id;

    pg.connect(connectionString, function (err, client) {
        client.query("DELETE * FROM messages WHERE id = $1", [deleteId],
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