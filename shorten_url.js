//list of actions from bottom up:
//**************
//set recieving enviorment
//-find if file exists
//-set the shorten url
//-save it
const find_param = require('./find_file_in_db.js');


//if its not allready there - than save it
let save_param = (collection,param,url_set,next) =>{
 
    let new_param = {
       url:param,
       shorten_url:url_set
     }

     collection.insert(new_param,(err,data) =>{
       if(err) next(null,err);  
       next(new_param);
   })

}

//set shorten url - just indexes :)
let set_shorten_url = (collection,param,save_param,next) => {

  let set_url = (c) =>{
    if(!c||!c.length){return 1;}
    
      return Number(c[c.length-1].shorten_url)+1;
    // let new_id = Number(id[id.length-1])+1;
      //return id;//url_base+'/'+new_id;
  }
  
  collection.find().toArray((err,c)=>{
    if(err) {  next(null,err);}
    save_param(collection,param,set_url(c),next);
  });
    
}

//set every action one after the other to make sense
let set_params = (collection,param,next) => {
  
 let callback = (file,err) =>{
    if(err) next(null,err);
        
    if(file && file.length) {
      next(file[0]);//if its there reutrn the shorten url
    }
    else set_shorten_url(collection,param,save_param,next); //else create a shorten url
  }
  //first find if the file is there
  find_param(collection,param,callback);
  
 }
    
module.exports = set_params;
