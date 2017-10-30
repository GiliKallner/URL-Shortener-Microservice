
import copy from 'copy-to-clipboard';

$(function() {  
 
 $('input').on('input',()=>{$('.shortenedUrl').css('visibility','hidden');}) 
 $('button.copy').click((event)=>{
   let url = $('section>pre').text();
   //console.log(url);
   copy(url);
  // document.execCommand('copy', false,url);
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
