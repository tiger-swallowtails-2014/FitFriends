var bindSearchUserEvent = function() {
  $('#users').on('keyup','#user_search', function(e){
    e.preventDefault()
    var keyword = $("#user_search_input").val()
    console.log(keyword)
    $.ajax({
      url: "/users/search/" + keyword,
      method: "GET",
      data: keyword
    })
    .done(function(data) {
      clearUserHolder()
      removeObject("#users .user")
      removeObject("#users .follow_title")
      appendObject("#users", data)
    })
    .fail(function(){
      console.log("fail")
    })
  })
}