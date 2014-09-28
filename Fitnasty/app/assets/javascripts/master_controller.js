$(document).ready(function() {
  $('#tabs').tabs();

  //currentUser being pulled from the URL which should be localhost:3000/users/:id
  var currentUser = $(document.URL.split('/')).last()[0]


  // from accepted_challenges.js
  fetcher = new Fetcher;
  acceptedChallengesView = new AcceptedChallengesView;
  new AcceptedChallengesController(acceptedChallengesView, fetcher)


  // from lightboxes/controller.js
  initializeLightBoxController()

  // from create_challenge/controller.js
  var controller = new ChallengeController
  controller.challengeFormCreate('.test_show', 'ul')

  // var testWidget = new ChallengeWidget();
  // testWidget.whenDone()

  // from search.js
  bindSearchEvent();
});