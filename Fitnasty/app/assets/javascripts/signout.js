$(document).ready(function() {
  $('.signout_button').click(function() {
    event.preventDefault();
    signoutRequest()
  })

  var signoutRequest = function() {
    $.ajax({
      url: $(this).attr('href'),
      type: 'GET'
    }).done(function() {
      console.log("success")
    })
  }
});