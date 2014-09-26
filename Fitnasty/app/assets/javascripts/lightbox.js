$(document).ready(function() {
  // View
  var showSignupLightbox = function() {
    $('.lightbox_background, .signup_lightbox').fadeIn('slow')
  }

  var showLoginLightbox = function() {
    $('.lightbox_background, .login_lightbox').fadeIn('slow')
  }

  var hide_lightboxes = function() {
    $('.lightbox_background, .signup_lightbox, .login_lightbox').hide()
  }

  // Controller
  hide_lightboxes()
  $('.signup_button').click(showSignupLightbox)
  $('.lightbox_background').click(hide_lightboxes)
})