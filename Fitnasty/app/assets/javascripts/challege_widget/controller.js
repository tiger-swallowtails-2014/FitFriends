function ChallengeWidget() {
  var self = this;
  this.whenDone = function(data) {
    ChallengeFactory.createChallenges(data)
    var formatted_data = {challenges: challengeHolder.challenges}
    ChallengeWidgetView('#challenges-container .challenges_river', formatted_data)
    self.bindListener();
  }

  this.bindListener = function(){
    $('.lifecycle').on('click', function(e){
      e.preventDefault();
      var self = this;
      var challenge_num = $(this).parent().attr('id')
      $.ajax({
        type: "POST",
        url: "/accept_challenge",
        data: {challenge_id: challenge_num}
      }).done(function(data){
        console.log($(self).text(data.texts))
        console.log($(self).attr('class', "lifecycle" + " " + data.answer))
      })
    })
  }
}

