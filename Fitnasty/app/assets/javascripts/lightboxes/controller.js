function LightBoxController() {
  this.listenForCommands = function() {
    var boxView = new LightBoxView()
    boxView.hide_lightboxes()
    $('.signup_button').click(boxView.showSignupLightbox)
    $('.login_button').click(boxView.showLoginLightbox)
    $('.lightbox_background').click(boxView.hide_lightboxes)
  }
}

var initializeLightBoxController = function() {
  boxController = new LightBoxController()
  boxController.listenForCommands()
}


