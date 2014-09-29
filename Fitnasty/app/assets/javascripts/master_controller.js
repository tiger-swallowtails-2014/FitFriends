$(document).ready(function() {
  $('#tabs').tabs();

  $('#challenges_tab').on("click", function(e){
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: this.getElementsByTagName('a')[0].href
    }).done(function(data){
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
    })
  })
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
  controller.challengeFormCreate('.test_show', '#create-challenge')
  

  // var testWidget = new ChallengeWidget();
  // testWidget.whenDone()

  // from search
  bindSearchEvent();
  bindSearchUserEvent();

  // from tabs.js
  bindUsersTabEvent()

  // for gravatar
  new GravatarController(fetcher);

});