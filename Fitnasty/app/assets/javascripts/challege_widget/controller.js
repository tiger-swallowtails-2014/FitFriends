// $(document).ready(function(){
//   var testWidget = new ChallengeWidget();
//   testWidget.whenDone(stubbed_data)
// })

function ChallengeWidget() {
  var self = this;
  this.whenDone = function(data) {
    console.log(data);
    ChallengeFactory.createChallenges(data)
    var formatted_data = {challenges: challengeHolder.challenges}
    ChallengeWidgetView('#challenges-container .challenges_river', formatted_data)
    self.bindListener();
  }

  this.bindListener = function(){
    $('.lifecycle').on('click', function(e){
      e.preventDefault();
      console.log($(this).parent().attr('id'))
      $.ajax({
        type: "POST",
        url: "/accept_challenge",
        data: {}
      }).done(function(data){
        console.log(data)
      })
    })
  }
}

