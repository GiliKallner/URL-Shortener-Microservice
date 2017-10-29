


/*returns true if param exists in database and false otherwise*/
let find_param = (collection,param,db) => {
  return collection.find().toArray((err,collection) => {
    //if(err) throw err;
    console.log(collection);
    db.close();
    //return found;
  });
}

module.exports = find_param;

/*let set_param = (collection,param,db,err) => {
  if(find_param(arguments)){
    
    
  }
  
}*/