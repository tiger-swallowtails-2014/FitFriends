var bindSearchUserEvent = function() {
  $('#users').on('submit','#user_search', function(e){
    e.preventDefault()
    var keyword = $("#user_search_input").val()
    console.log(keyword)
    $.ajax({
      url: "/users/search/" + keyword,
      method: "GET",
      data: keyword
    })
    .done(function(data) {
      console.log(data)
      console.log("success")
      removeObject("#users .user")
      appendObject("#users", data)
    })
    .fail(function(){
      console.log("fail")
    })
  })
}