$(function(){

  $('.collapser').on('click', function(e){
    $('.collapser i').addClass('icon-caret-right');
    $('.collapsible').removeClass('in');
    $(this).find('i').removeClass('icon-caret-right').addClass('icon-caret-down');
    $(this).next('.collapsible').addClass('in');
  });

  $('.email-subscribe').on('click', function(e){
    $('.loading').removeClass('hide');

    var email = $('.email').val();
    var fname = $('.first-name').val();
    var lname = $('.last-name').val();

    $.ajax({
      url: window.location.protocol + '//' + window.location.hostname + ':8080',
      data: {
        email: email,
        firstName: fname,
        lastName: lname
      },
      dataType: 'jsonp',
      success: function(response){
        $('.loading').addClass('hide');

        if(response && response.error){
          $('.response').removeClass('alert-success').addClass('alert alert-error');
          $('.response').html(response.error);
        } else if(response && response.success){
          $('.response').removeClass('alert-error').addClass('alert alert-success');
          $('.response').html(response.success);
        }
      }
    });
  });

});