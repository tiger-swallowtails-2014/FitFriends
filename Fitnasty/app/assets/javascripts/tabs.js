var bindUsersTabEvent = function() {
  var shownUser = $(document.URL.split('/')).last()[0]
  $('#ui-id-3').on('click', function(e){
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