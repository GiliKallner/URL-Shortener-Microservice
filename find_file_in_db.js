//find and returns url in database

module.exports = (collection,url,callback) => {
  
  collection.find({
    url:url
  }).toArray((err,col) => {

    if(err) callback(null,err); 
    else callback(col);
  });
}
