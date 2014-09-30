var bindFollowEvent = function() {
  $(document).on('click', '.follow_link', function(e) {
    e.preventDefault()
    var follow_link = $(this)
    $.ajax({
      url: follow_link.attr("href"),
      method: 'GET'
    })
    .done(function() {
      follow_link.parent().removeClass("follow")
      follow_link.parent().addClass("unfollow")
      follow_link.text("unfollow")
      $('#users_tab').trigger('click')
    })
    .fail(function(){
      console.log("fail")
    })
  })
}

var bindUnfollowEvent = function() {
  $(document).on('click', '.unfollow_link', function(e) {
    e.preventDefault()
    var unfollow_link = $(this)
    $.ajax({
      url: unfollow_link.attr("href"),
      method: 'GET'
    })
    .done(function() {
      unfollow_link.parent().removeClass("unfollow")
      unfollow_link.parent().addClass("follow")
      unfollow_link.text("follow")
      $('#users_tab').trigger('click')
    })
    .fail(function(){
      console.log("fail")
    })
  })
}

var bindFriendEvents = function() {
  bindFollowEvent()
  bindUnfollowEvent()
}