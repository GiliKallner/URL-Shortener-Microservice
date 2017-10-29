//list of actions from bottom up:
//**************
//set recieving enviorment
//-find if file exists
//-set the shorten url
//-save it
 

const url_base = 'https://sapp.glitch.me';//our app- the shorten url will be added to it.

//if its not allready there - than save it
let save_param = (collection,param,url_set,next) =>{
 
    let new_param = {
       url:param,
       shorten_url:url_set
     }

     collection.insert(new_param,(err,data) =>{
       if(err) return next(null,err);
       console.log("asdf");
       return next(new_param).shorten_url;
   })

}

//set shorten url - just indexes :)
let set_shorten_url = (collection,param,save_param,next) => {

  let set_url = (c) =>{
    if(!c||!c.length){return url_base+'/'+1;}
     let id = c[c.length-1].shorten_url.split('/');

     let new_id = Number(id[id.length-1])+1;
      return url_base+'/'+new_id;
  }
  
  collection.find().toArray((err,c)=>{
    if(err) { return next(null,err);}
    let url_set = set_url(c);
    return save_param(collection,param,url_set,next);
  });
    
}

//find if file exists in database
let find_param = (collection,param,after_func) => {
  
  collection.find({
    url:param
  }).toArray((err,col) => {

    if(err) after_func(null,err); 
    else after_func(col);
  });
}


//set every action one after the other to make sense
let set_params = (collection,param,next) => {
  
 let after_func = (file,err) =>{
    if(err) return next(null,err);
        
    if(file.length) return file.shorten_url;//if its there reutrn the shorten url
    return set_shorten_url(collection,param,save_param,next); //else create a shorten url
  }
  //first find if the file is there
  find_param(collection,param,after_func);
  
 }
    
module.exports = set_params;
