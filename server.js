// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

var mongodb = require('mongodb');
var mongo = mongodb.MongoClient;

var url = process.env.MONGOLAB_URI; 
var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post("/urlparser",  (req, res) =>{
  
  mongo.connect(url, function (err, db) {
  if (err) console.error('Unable to connect to the mongoDB server. Error:', err);
    db.collection('urls').insertOne({
      
    });
    
    console.log('database conected', url);    
    db.close();  
  });
  
  
  res.status(200);
  res.send(req.body);
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
