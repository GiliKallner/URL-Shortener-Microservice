


//returns param if param exists in database and false otherwise
let find_param = (collection,param,db,next) => {
  
  collection.find({
    url:param
  }).toArray((err,col) => {
    db.close();   
    if(col.length){return next(col);}     
  });
 // console.log('found: ',found);
}

let set_shorten_url = (collection,db) => {
  let existing_collection = collection.find().toArray((err,c)=>{
    if(err) throw err;
    db.close();
    return c;
  });
  
  if(existing_collection) return Number(existing_collection[existing_collection.length-1].shorten_url)+1;
  
  else return 1;
}

let set_param = (collection,param,db,next) => {

  find_param(collection,param,db,next);
  /*console.log('found_param: ',found);
  if(found){
    db.close();
    //return found;
  }
  
  else{*/
     let new_param = {
       url:param,
     //  shorten_url:set_shorten_url(collection,db)
     }

     collection.insert(new_param,(err,data) =>{
      if(err) throw err;
       return next(new_param);
       db.close();
   })
 }
  
  
//}
module.exports = set_param;
