//find and returns url in database

module.exports = (collection,url,callback) => {
  console.log('collection: ',collection);
  console.log('url: ',url);
  console.log('callback: ',callback);
  collection.find({
    url:url
  }).toArray((err,col) => {
    console.log('col: ',col);
    if(err) callback(null,err); 
   // if(!col){col = null;}
    else callback(col||[]);
  });
}
