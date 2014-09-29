function LightBoxController() {
  this.listenForCommands = function() {
    var boxView = new LightBoxView()
    boxView.hide_lightboxes()
    $('.signup_button').click(boxView.showSignupLightbox)
    $('.login_button').click(boxView.showLoginLightbox)
    $('.friend_selector_button').click(boxView.showFriendSelectorLightbox)
    $('.friend_selector_button').click(function(e){
      challenge_id = $(e.target).attr('id');
      $('.lightbox_challenge_id').attr('value', challenge_id)
    })
    $('.lightbox_background').click(boxView.hide_lightboxes)
  }
}

var initializeLightBoxController = function() {
  boxController = new LightBoxController()
  boxController.listenForCommands()
}


