// client-side js
// run by the browser each time your view template is loaded

// by default, you've got jQuery,
// add other scripts at the bottom of index.html

$(function() {
  console.log('hello world :o');
  

 $('form').submit(function(event) {
    event.preventDefault();
    var url = $('input').val();
    $.post('/urlparser',{url: url}, function(url,status) {
      if(status!=='success') console.error(status);
      console.log(url.url);
   //   $('<li></li>').text(url.data).appendTo('ul#dreams');
      $('input').val('');
      $('input').focus();
    });
  });

});
