$(document).ready(function(){
  $.ajax({
    type: "GET",
    url: "/users/1"
  }).done(function(data){
    var testy = {users: data}
    console.log(HandlebarsTemplates['challenges/new'](testy))
    $('ul').append(HandlebarsTemplates['challenges/new'](testy))
  })
})

var ChallengeController = (function() {

  return {
    listen: function(whereListen) {

    }
  }

})()