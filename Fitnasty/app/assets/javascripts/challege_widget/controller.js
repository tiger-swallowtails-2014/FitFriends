// $(document).ready(function(){
//   var testWidget = new ChallengeWidget();
//   testWidget.whenDone(stubbed_data)
// })

function ChallengeWidget() {
  this.whenDone = function(data) {
    ChallengeFactory.createChallenges(data)
    ChallengeWidgetView('#challenges-container', data_style)
  }
}
