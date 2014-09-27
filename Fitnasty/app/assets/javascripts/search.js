$(document).ready(function() {
  bindSearchEvent();
})

var bindSearchEvent = function() {
  $("#search-form").on('keyup', function(e){
    e.preventDefault()
    var keyword = $("#search").val()
    $.ajax({
      url: 'challenges/search/' + keyword,
      method: 'GET',
      data: keyword
    })
    .done(function(data) {
      if (data.length === 0) {
        removeObject('#challenges-container .challenge')
        removeObject('#challenges-container .warning')
        appendObject('#challenges-container', renderWarning(data))
      }
      else {
        removeObject('#challenges-container .challenge')
        removeObject('#challenges-container .warning')
        $(data).each(function(index, challengeHash){
          appendObject('#challenges-container', renderChallenge(challengeHash))
        })
      }
    })
    .fail(function(data) {
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

// Returns html elements for a challenge
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



// Returns html elements for warning
var renderWarning = function() {
  var MustacheWarningTemplate =
    "<div class='warning'>" +
      "<p>There are no challenges that match that keyword.</p>" +
    "</div>"

  return Mustache.to_html(MustacheWarningTemplate)
}