// $(document).ready(function(){
//   var testWidget = new ChallengeWidget();
//   testWidget.whenDone(stubbed_data)
// })

function ChallengeWidget() {
  this.whenDone = function(data) {
    ChallengeFactory.createChallenges(data)
    var formatted_data = {
      challenges: [],
      users: []
    }

      for(var i = 0; i < data.length; i++){
        data[i].challenge_object.tagged = data[i].challenge_tags
        formatted_data.challenges.push(data[i].challenge_object)
        formatted_data.users.push(data[i].challenge_user)
      }

    ChallengeWidgetView('#challenges-container div', formatted_data)
  }
}

