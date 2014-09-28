$(document).ready(function() {
  $('#tabs').tabs();

  // from search.js
  bindSearchEvent();

  // from accepted_challenges.js
  fetcher = new Fetcher;
  acceptedChallengesView = new AcceptedChallengesView;
  new AcceptedChallengesController(acceptedChallengesView, fetcher)


  // from lightboxes/controller.js
  initializeLightBoxController()

  // from create_challenge/controller.js
  var controller = new ChallengeController
  controller.challengeFormCreate('.test_show', 'ul')
});