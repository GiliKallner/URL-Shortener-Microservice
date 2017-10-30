
const express = require('express');
const app = express();

const mongodb = require('mongodb');
const mongo = mongodb.MongoClient;

const mongo_url = process.env.MONGOLAB_URI; 
const bodyParser = require('body-parser');
const shorten_url = require('./shorten_url.js');

const url_base = 'https://sapp.glitch.me';//our app- the shorten url will be added to it.

//make sure the input is a valid url
const validate_url = url => {
  //the regex code is taken from https://gist.github.com/dperini/729294 with a very small adjasment-? to accept urls
  //without http prefix
  let regex = /^(?:(?:https?|ftp):\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  return regex.test(url);
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/", (req, res)=> {
  res.sendFile(__dirname + '/views/index.html');
});
  
//connect to database
mongo.connect(mongo_url, (err, db) =>{
    if (err) console.error('Unable to connect to the mongoDB server. Error:', err);
    let urls = db.collection('urls');
   // urls.remove({});
  
  //handle recieved input from client
  app.post("/urlparser",  (req, res) =>{
      
      let url = req.body.url;

      if(!validate_url(url)){ 
         res.status(200);
         return res.send('The string you entered is not a valid url. Please try again.');
      }

    let next = (p,err) => {      
      if(err){
        console.log("this is a next error");
        throw err;
      }

      res.status(200);    
      res.send(url_base+'/'+p.shorten_url);      
     }              
     shorten_url(urls,url,next);    
  });
  
  //redirect to right url
  app.get("/:url_r",(req,res) => {
    let url_r = req.params;
    console.log('url_r: ',url_r);  
  });
        
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
}); 
