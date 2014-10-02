// MUST BE REFACTORED FOR MVC

$(document).ready(function() {
  fetcher = new Fetcher;
  binder = new Binder;

  $('#tabs').tabs();

  google.maps.event.addDomListener(window, 'load', initialize);

  binder.bind('#most_recent', 'click', 'GET', '/challenges/recent');
  binder.bind('#submitted', 'click', 'GET', document.URL+"/submitted");
  binder.bind('#trending', 'click', 'GET', '/challenges/trending');
  binder.bind('#pending', 'click', 'GET', document.URL+"/pending");
  binder.bind('#completed', 'click', 'GET', document.URL+"/completed");
  binder.bind('#accepted', 'click', 'GET', document.URL+"/accepted");
  bindTagSearchEvent("click", '.tag')

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

  // from lightboxes/controller.js
  initializeLightBoxController()

  // from create_challenge/controller.js
  var controller = new ChallengeController
  controller.challengeFormCreate('.test_show', '#challenges-container .challenges_river')

  // from tabs.js
  bindUsersTabEvent('#users_tab')
  bindChallengesTabEvent()

  // for gravatar
  new GravatarController(fetcher);

  // from map.js
  bindMapDimensionsEvent();

  // from users/follow.js
  bindFriendEvents();

  $('.carousel').carousel({
    interval: 5000,
    pause: "hover"
  })


  $(document).on('click', '#checkout_button', function(){
    console.log("Checkout button clicked")
    $('.carousel').carousel('next')
  })


  $('.carousel').on('slid.bs.carousel', function () {
    $('.carousel').carousel('cycle')
  })

});