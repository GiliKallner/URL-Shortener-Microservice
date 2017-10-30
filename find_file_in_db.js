//find and returns url in database

module.exports = (collection,file,callback) => {
  
  collection.find({
    url:file
  }).toArray((err,col) => {
    if(err) callback(null,err);
    callback(col);
  });
}
