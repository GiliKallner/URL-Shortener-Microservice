

$(function() {  
 
 $('input').on('blur',()=>{$('.shortenedUrl').css('visibility','hidden');}) 
  
 $('form').submit(function(event) {
    event.preventDefault();
    var url = $('input').val();
    $.post('/urlparser',{url:url}, function(shorten,status) {
      if(status!=='success') console.error(status);
      console.log(shorten);
      $('section>pre').text(shorten);
      $('.shortenedUrl').css('visibility','visible');
      $('input').val('');
      $('input').focus();
    });
  });

});
