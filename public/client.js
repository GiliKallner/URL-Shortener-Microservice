
//let copy = require('copy-to-clipboard');

$(function() {  
 
 $('input').on('input',()=>{$('.shortenedUrl').css('visibility','hidden');}) 
 $('button.copy').click((event)=>{
   
   let copy = $('section>pre').text();
   $('.hide').v
   document.execCommand("Copy");
   //copy(url);
   
 });
  
 $('form').submit(function(event) {
    event.preventDefault();
    var url = $('input').val();
    $.post('/urlparser',{url:url}, function(shorten,status) {
      if(status!=='success') console.error(status);
      $('section>pre').text(shorten);
      $('.shortenedUrl').css('visibility','visible');
      $('input').val('');
      $('input').focus();
    });
  });

});
