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
      if (data.warning != null) {
        $('#challenges-container .challenge').remove()
        $('#challenges-container .warning').remove()
        var warning = renderWarning(data)
        appendObject('#challenges-container', warning)
      }
      else {
        $('#challenges-container .challenge').remove()
        $('#challenges-container .warning').remove()
        $(data).each(function(index, object){
          var challenge = renderChallenge(object)
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


var renderChallenge = function(element) {
  console.log(element)
  var MustacheChallengeTemplate =
    "<div class='challenge'>" +
      "<img class='challenge_image' src={{image_url}} alt=''>" +
      "<h1 class='challenge_title'>{{title}}</h1>" +
      "<span class='challenge_location'>{{location}}</span>" +
      "<p class='challenge_description'>{{description}}</p>" +
      "<span class='created_by'>posted by " + element.user_id + "</span>" +
      "<div class='tags'>Tags: " + element.tags + "</div>" +
    "</div>"

  return Mustache.to_html(MustacheChallengeTemplate, element)
}


var renderWarning = function(element) {
  var MustacheWarningTemplate =
    "<div class='warning'>" +
      "<p>{{warning}}</p>" +
    "</div>"

  return Mustache.to_html(MustacheWarningTemplate, element)
}