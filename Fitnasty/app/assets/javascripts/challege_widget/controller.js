$(document).ready(function(){
  var stubbed_data = [{id: 1, user_id: 2, title: "Running Golden Gate", location: "San Francisco", description: "Run the bridge in the Morning, it is so beautiful.", image_url: "http:stuff", created_at: "When Created", updated_at: "When Updated"}, {id: 5, user_id: 10, title: "Go Bike Marin County", location: "Marin", description: "Riding Bikes is super fun and makes you look really cool to people.", image_url: "http:stuff", created_at: "When Created", updated_at: "When Updated"}]
  var testWidget = new ChallengeWidget();
  testWidget.whenDone(stubbed_data)
})

function ChallengeWidget() {
  this.whenDone = function(data) {
    ChallengeFactory.createChallenges(data)
    challengeHolder.challenges
    console.log(challengeHolder.challenges)
    var data_style ={challenges: challengeHolder.challenges, user: [{first_name: "travis"}, {first_name: "Evan"}]}


    Handlebars.registerHelper('bold', function(options) {
  return new Handlebars.SafeString(
      '<div class="mybold">'
      + options.fn(this)
      + '</div>');
  });

    $("#challenges-container").append(HandlebarsTemplates['Challenge_Widget/index'](data_style))
  }
}