$(document).ready(function(){
  var stubbed_data = [{id: 1, user_id: 2, title: "Running Golden Gate", location: "San Francisco", description: "Run the bridge in the Morning, it is so beautiful.", image_url: "http:stuff", created_at: "When Created", updated_at: "When Updated"}, {id: 5, user_id: 10, title: "Go Bike Marin County", location: "Marin", description: "Riding Bikes is super fun and makes you look really cool to people.", image_url: "http:stuff", created_at: "When Created", updated_at: "When Updated"},{id: 5, user_id: 10, title: "Go Bike Marin County", location: "Marin", description: "Riding Bikes is super fun and makes you look really cool to people.", image_url: "http:stuff", created_at: "When Created", updated_at: "When Updated"}]
  var testWidget = new ChallengeWidget();
  testWidget.whenDone(stubbed_data)
})

function ChallengeWidget() {
  this.whenDone = function(data) {
    ChallengeFactory.createChallenges(data)
    challengeHolder.challenges
    var data_style = {challenges: challengeHolder.challenges, users: [{first_name: "Travis"}, {first_name: "Evan"}]}
    console.log(HandlebarsTemplates['Challenge_Widget/index'](data_style))
    $("#challenges-container").append(HandlebarsTemplates['Challenge_Widget/index'](data_style))
  }
}

    Handlebars.registerHelper('getuser', function(options) {
        return new Handlebars.SafeString(options.fn(options.data.root.users[$(options.data.root.challenges).index(this)]));
    });