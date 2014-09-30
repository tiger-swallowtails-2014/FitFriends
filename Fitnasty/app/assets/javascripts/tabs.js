var bindUsersTabEvent = function(selector) {
  var shownUser = $(document.URL.split('/')).last()[0]
  $('#tabs').on('click', selector, function(e){
    $.ajax({
      url: "/users/show_follow",
      method: "GET",
      data: {user_id: shownUser}
    })
    .done( function(data){
      console.log("success")
      clearUserHolder()
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
      console.log("users/" + shownUser + "/accepted")
    $.ajax({
      url: "/users/" + shownUser + "/accepted",
      method: "GET",
      data: {user_id: shownUser}
    })
    .done( function(data) {
      clearHolder()
      $('.challenge').remove();
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
    })
    .fail( function() {
      console.log("fail")
    })
  })
}


