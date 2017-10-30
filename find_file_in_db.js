///find if file exists in database
module.exports =
(collection,param,callback) => {
  
  collection.find({
    url:param
  }).toArray((err,col) => {

    if(err) callback(null,err); 
    else callback(col);
  });
}
