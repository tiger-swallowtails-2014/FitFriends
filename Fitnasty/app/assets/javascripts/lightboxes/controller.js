console.log("LOAD")

function LightBoxController() {
  this.listenForCommands = function() {
    var boxView = new LightBoxView()
    boxView.hide_lightboxes()
    $('.signup_button').click(boxView.showSignupLightbox)
    $('.login_button').click(boxView.showLoginLightbox)
    $('.friend_selector_button').click(boxView.showFriendSelectorLightbox)
    $('.lightbox_background').click(boxView.hide_lightboxes)
  }
}

var initializeLightBoxController = function() {
  boxController = new LightBoxController()
  boxController.listenForCommands()
}


