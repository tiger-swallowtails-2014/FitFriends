var bindUsersTabEvent = function() {
  var shownUser = $(document.URL.split('/')).last()[0]
  $('#user_tab').on('click', function(e){
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

var bindChallengesTabEvent = function() {
  var shownUser = $(document.URL.split('/')).last()[0]
  $('#challenges_tab').on('click', function(e){
    $.ajax({
      url: "/users/" + shownUser + "/accepted",
      method: "GET",
      data: {user_id: shownUser}
    })
    .done( function(data) {
      $('.challenge').remove();
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
    })
    .fail( function() {
      console.log("fail")
    })
  })
}