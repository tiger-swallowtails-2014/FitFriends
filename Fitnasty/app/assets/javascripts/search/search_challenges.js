var bindSearchEvent = function() {
  $("#search-form").on('submit', function(e){
    e.preventDefault()
    var keyword = $("#search").val()
    $.ajax({
      url: '/challenges/search/' + keyword,
      method: 'GET',
      data: keyword
    })
    .done(function(data) {
      if (data.length === 0) {
        removeObject('#challenges .challenge')
        removeObject('#challenges .warning')
        appendObject('#challenges', renderWarning(data))
      }
      else {
        removeObject('#challenges .challenge')
        removeObject('#challenges .warning')
        clearHolder()
        ChallengeFactory.createChallenges(data)
        $(challengeHolder.challenges).each(function(index, challengeHash) {
          challengeReturner('#challenges', challengeHash)
        })
        $('.challenge').addClass("result")
      }
    })
    .fail(function(data) {
      console.log("fail")
    })
  })

  $("#challenges").on('click', '.result', function(e){
    e.preventDefault()
    challenge = $(this)
    challenge_num = challenge.attr("id").replace("challenge_", "")
    $.ajax({
      url: '/accept_challenge',
      method: 'POST',
      data: {challenge_id: challenge_num}
    })
    .done(function(){
      challenge.css("background", "orange")
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



// Returns html elements for warning
var renderWarning = function() {
  var MustacheWarningTemplate =
    "<div class='warning'>" +
      "<p>There are no challenges that match that keyword.</p>" +
    "</div>"

  return Mustache.to_html(MustacheWarningTemplate)
}


// Appends challenges to the page
function challengeReturner(container, challengeHash){
  var challenge = renderChallenge(challengeHash)
  $(container).append(challenge)
}


// Returns html elements for a challenge
var renderChallenge = function(challenge) {
  var MustacheChallengeTemplate =
    "<div class='challenge' id='challenge_{{id}}''>" +
      "<img class='challenge_image' src={{image_url}}>" +
      "<div class='challenge_title'><h1>{{title}}</h1></div>" +
      "<span class='challenge_location'>{{location}}</span>" +
      "<p class='challenge_description'>{{description}}</p>" +
      "<span class='created_by'>posted by {{user.first_name}} {{user.last_name}}</span>" +
      "<div class='tags'>Tags: {{tags}}</div>" +
      "<span>Completed: {{completed}}</span><br>" +
      "<span>Accepted: {{accepted}}</span>" +
    "</div>"

  return Mustache.to_html(MustacheChallengeTemplate, challenge)
}
