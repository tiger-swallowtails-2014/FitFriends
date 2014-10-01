var bindTagSearchEvent = function(event, selector) {
  $(document).on(event, selector, function(e){
    e.preventDefault();
    keyword = $(this).text()
    $.ajax({
      type: "GET",
      url: '/challenges/search/' + keyword
    }).done(function(data){
      clearHolder()
      $('.challenge').fadeOut(500);
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      $('.challenge:first').prepend($("<h1>Challenges matching keyword '" + keyword + "'</h1>"))
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
      MapModel.beenClicked = false;
    })
  })
}