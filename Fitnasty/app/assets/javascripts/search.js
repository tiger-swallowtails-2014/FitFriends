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
      if (data.length === 0) {
        $('#challenges-container .challenge').remove()
        $('#challenges-container .warning').remove()
        var warning = renderWarning(data)
        appendObject('#challenges-container', warning)
      }
      else {
        $('#challenges-container .challenge').remove()
        $('#challenges-container .warning').remove()
        $(data).each(function(index, challengeHash){
          var challenge = renderChallenge(challengeHash)
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


var renderChallenge = function(challengeHash) {
  var challenge = challengeHash.challenge_object
  var user = challengeHash.challenge_user
  var challengeTags = challengeHash.challenge_tags

  var MustacheChallengeTemplate =
    "<div class='challenge'>" +
      "<img class='challenge_image' src={{image_url}} alt=''>" +
      "<div class='challenge_title'><h1>{{title}}</h1></div>" +
      "<span class='challenge_location'>{{location}}</span>" +
      "<p class='challenge_description'>{{description}}</p>" +
      "<span class='created_by'>posted by " + user.first_name + " " + user.last_name + "</span>" +
      "<div class='tags'>Tags: " + challengeTags + "</div>" +
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