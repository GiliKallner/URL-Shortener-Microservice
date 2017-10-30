//find and returns url in database

module.exports = (collection,url,callback) => {
  console.log('callback: ',callback);
  
  collection.find({
    url:url
  }).toArray((err,col) => {
    if(err) callback(null,err);
    callback(col);
  });
}
