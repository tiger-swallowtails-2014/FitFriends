function ChallengeController() {
  var self = this;

    this.challengeFormCreate = function(whereToListen, whereToShow) {
      $(whereToListen).on('click', function() {
        CreateChallengeView.showForm(whereToShow)
      self.createChallengeOnSubmit('.new_challenge', {type: "POST", url: "/challenges"})
      })
    }

    this.createChallengeOnSubmit = function(formClass, ajaxObject) {
      $(formClass).on('submit', function(e){
        e.preventDefault();
        ajaxObject.data = $(this).serialize();

        self.ajaxCall(ajaxObject).done(function(data){
          console.log(data)
        })
      })
    }

    this.ajaxCall = function(args) {
      var ajax = $.ajax(args)
      return ajax
    }

}



$(document).ready(function() {
  var controller = new ChallengeController
  controller.challengeFormCreate('.test_show', 'ul')
});
