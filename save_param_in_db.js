
const url_base = 'https://sapp.glitch.me';

//returns param if param exists in database and false otherwise
let find_param = (collection,param,after_func) => {
  
  collection.find({
    url:param
  }).toArray((err,col) => {
        console.log('col: ',col);

    if(err) after_func(null,err); 
    else after_func(col);
  });
}

//set shorten url - just indexes :)
let set_shorten_url = (collection,next) => {
  
  let set_url = (c) =>{
     
    if(!c||!c.length){ return url_base+'/'+1;}
     
     let id = c[c.length-1].shorten_url;
     let new_id = Number(id.split('/')[id.length-1])+1;
     return url_base+'/'+new_id;
  }
  
  return collection.find().toArray((err,c)=>{
    console.log('c : ',c);
    if(err) return next(null,err);
    console.log('url: ',set_url(c));
    return set_url(c);
  });
    
}

//if its not allready there - than save it
let save_param = (collection,param,next) =>{

     let new_param = {
       url:param,
       shorten_url:set_shorten_url(collection,next)
     }

     collection.insert(new_param,(err,data) =>{
       if(err) return next(null,err);
       return next(new_param);
   })

}

//set every action one after the other to make sense
let set_param = (collection,param,next) => {
  
  let after_func = (file,err) =>{
    if(err) return next(null,err);
        
    if(file.length) return file.shorten_url;//if its there reutrn the shorten url
    return save_param(collection,param,next); //else save the file
  }
  //first find if the file is there
  find_param(collection,param,after_func);
  
 }
  
  
module.exports = set_param;
