// MUST BE REFACTORED FOR MVC

$(document).ready(function() {

  $('#tabs').tabs();
  google.maps.event.addDomListener(window, 'load', initialize);

  $('#most_recent').on("click", function(e){
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: '/challenges/recent'
    }).done(function(data){
      clearHolder()
      $('.challenge').fadeOut(500);
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
    })
  })

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
      })
    })
  }

  bindTagSearchEvent("click", '.tag')



  $('#submitted').on("click", function(e){
    e.preventDefault();
    var currentUser = $(document.URL.split('/')).last()[0];
    $.ajax({
      type: "GET",
      url: "/users/"+currentUser+"/submitted"
    }).done(function(data){
      clearHolder()
      $('.challenge').fadeOut(500);
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
    })
  })

  $('#trending').on("click", function(e){
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: '/challenges/trending'
    }).done(function(data){
      clearHolder()
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
    })
  })

  $('#pending').on("click", function(e){
    e.preventDefault();
    var currentUser = $(document.URL.split('/')).last()[0];
    $.ajax({
      type: "GET",
      url: "/users/"+currentUser+"/pending"
    }).done(function(data){
      clearHolder()
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
    })
  })

  $('#completed').on("click", function(e){
    e.preventDefault();
    var currentUser = $(document.URL.split('/')).last()[0];
    $.ajax({
      type: "GET",
      url: "/users/"+currentUser+"/completed"
    }).done(function(data){
      clearHolder()
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
    })
  })

  $('#accepted').on("click", function(e){
    e.preventDefault();
    var currentUser = $(document.URL.split('/')).last()[0];
    $.ajax({
      type: "GET",
      url: "/users/"+currentUser+"/accepted"
    }).done(function(data){
      clearHolder()
      $('.challenge').remove();
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
    })
  })

  $("#search-form").on("submit", function(e){
    e.preventDefault();
    var keyword = $("#search").val()
    $.ajax({
      type: "GET",
      url: '/challenges/search/' + keyword,
      data: keyword,
    }).done(function(data){
      clearHolder()
      $('.challenge').remove();
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      $('.challenge:first').prepend($("<h1>Challenges matching keyword '" + keyword + "'</h1>"))
    })
  })

  //currentUser being pulled from the URL which should be localhost:3000/users/:id
  var currentUser = $(document.URL.split('/')).last()[0]

// search for users
  bindSearchUserEvent('keyup');
  bindSearchUserEvent('submit');

  // from accepted_challenges.js
  fetcher = new Fetcher;
  // acceptedChallengesView = new AcceptedChallengesView;
  // new AcceptedChallengesController(acceptedChallengesView, fetcher)


  // from lightboxes/controller.js
  initializeLightBoxController()

  // from create_challenge/controller.js
  var controller = new ChallengeController
  controller.challengeFormCreate('.test_show', '#challenges-container .challenges_river')

  // var testWidget = new ChallengeWidget();
  // testWidget.whenDone()

  // from tabs.js
  bindUsersTabEvent('#users_tab')
  bindChallengesTabEvent()

  // for gravatar
  new GravatarController(fetcher);

  // from map.js
  bindMapDimensionsEvent();

  // from users/follow.js
  bindFriendEvents();

  // SORRY TRAVIS, HAD TO COMMENT THIS OUT IN EXCHANGE FOR bindChallengesTabEvent

  // $(document).on("click", '#challenges_tab', function(e){
  //   e.preventDefault();
  //   $.ajax({
  //     type: "GET",
  //     url: this.getElementsByTagName('a')[0].href
  //   }).done(function(data){
  //     $('.challenge').remove();
  //     var testWidget = new ChallengeWidget();
  //     testWidget.whenDone(data)
  //   })
  // })

  $('.carousel').carousel({
    interval: 5000,
    pause: "hover"
  })

  $('.carousel').on('slid.bs.carousel', function () {
    $('.carousel').carousel('cycle')
  })

});