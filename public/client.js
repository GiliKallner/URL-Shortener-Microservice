

$(function() {  

 $('form').submit(function(event) {
    event.preventDefault();
    var url = $('input').val();
    $.post('/urlparser',{url:url}, function(return_value,status) {
      if(status!=='success') console.error(status);
      console.log(return_value);

      $('input').val('');
      $('input').focus();
    });
  });

});
