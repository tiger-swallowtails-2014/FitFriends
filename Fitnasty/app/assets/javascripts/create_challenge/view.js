// need a button to work
var CreateChallengeView = {
  showForm: function(whereToShow) {
    $(whereToShow).append(HandlebarsTemplates['challenges/new'])
  },

  addNewChallenge: function(whereToAdd, data) {
    var html = Mustache.to_html(template, tweet);
    var formatted = {challenge: data}
    $(whereToAdd).prepend(HandlebarsTemplates['challenges/show'](formatted));
  }
}