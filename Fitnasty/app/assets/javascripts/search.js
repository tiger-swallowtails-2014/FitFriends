$(document).ready(function() {
  bindSearchEvent();
})

var bindSearchEvent = function() {
  $("#search-form").on('submit', function(e){
    e.preventDefault()
    var keyword = $("#search").val()
    $.ajax({
      url: 'challenges/search/' + keyword,
      method: 'GET',
      data: keyword
    })
    .done(function(data) {
      console.log(data.length)
      if (data.length === 0) {
        $('#challenges-container .challenge').remove()
        $('#challenges-container .warning').remove()
        var warning = renderWarning(data)
        appendObject('#challenges-container', warning)
      }
      else {
        $('#challenges-container .challenge').remove()
        $('#challenges-container .warning').remove()
        $(data).each(function(index, object){
          var user = object.user
          var challenge = renderChallenge(object, user)
          appendObject('#challenges-container', challenge)
        })
      }
    })
    .fail(function(data) {
      console.log("fail")
    })
  })
}


var appendObject = function(container, element) {
  $(container).append(element)
}


var renderChallenge = function(challenge, user) {
  console.log(challenge)
  var MustacheChallengeTemplate =
    "<div class='challenge'>" +
      "<img class='challenge_image' src={{image_url}} alt=''>" +
      "<h1 class='challenge_title'>{{title}}</h1>" +
      "<span class='challenge_location'>{{location}}</span>" +
      "<p class='challenge_description'>{{description}}</p>" +
      "<span class='created_by'>posted by " + user + "</span>" +
      "<div class='tags'>Tags: " + challenge.tags + "</div>" +
    "</div>"

  return Mustache.to_html(MustacheChallengeTemplate, challenge)
}


var renderWarning = function() {
  var MustacheWarningTemplate =
    "<div class='warning'>" +
      "<p>There are no challenges that match that keyword.</p>" +
    "</div>"

  return Mustache.to_html(MustacheWarningTemplate)
}