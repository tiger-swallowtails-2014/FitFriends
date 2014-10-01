var bindSearchUserEvent = function(event) {
  $('#users').on(event,'#user_search', function(e){
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

// Removes html elements with a given selector
var removeObject = function(selector) {
  $(selector).remove()
}


// appends an element to specified container
var appendObject = function(container, element) {
  $(container).append(element)
}

// Returns html elements for warning
var renderWarning = function() {
  var MustacheWarningTemplate =
    "<div class='warning'>" +
      "<p>There are no challenges that match that keyword.</p>" +
    "</div>"

  return Mustache.to_html(MustacheWarningTemplate)
}