// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;

var url = process.env.MONGOLAB_URI; 
console.log('url',url);

app.use(express.static('public'));

mongo.connect(url, function (err, db) {
  if (err) console.error('Unable to connect to the mongoDB server. Error:', err);
    
    console.log('database conected', url);
    
    db.close();
  
});


app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
