$(document).ready(function() {
  function LightBoxView() {
    this.showSignupLightbox = function() {
      $('.lightbox_background, .signup_lightbox').fadeIn('slow')
    }

    this.showLoginLightbox = function() {
      $('.lightbox_background, .login_lightbox').fadeIn('slow')
    }

    this.hide_lightboxes = function() {
      $('.lightbox_background, .signup_lightbox, .login_lightbox').hide()
    }
  }
});