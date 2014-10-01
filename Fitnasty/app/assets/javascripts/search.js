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