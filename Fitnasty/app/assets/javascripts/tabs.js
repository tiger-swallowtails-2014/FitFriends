var bindUsersTabEvent = function() {
  var shownUser = $(document.URL.split('/')).last()[0]
  $('#user_tab').on('click', function(e){
    $('#challenges').css("display", "none")
    $.ajax({
      url: "/users/show_follow",
      method: "GET",
      data: {user_id: shownUser}
    })
    .done( function(data){
      $('#users').empty()
      appendObject('#users', data)
    })
    .fail( function(){
      console.log("fail")
    })
  })
}