var Fetcher = function(){
}

Fetcher.prototype = {
	fetch: function(url, callback){
		$.getJSON(url, callback)
	}
}

var Binder = function(){

}

Binder.prototype = {
	bind: function(element, eventType, requestMethod, ajaxUrl, callback){
		$(element).on(eventType, function(e){
		  e.preventDefault();
		  $.ajax({
		    type: requestMethod,
		    url: ajaxUrl,
		  }).done(function(data){
      clearHolder()
      $('.challenge').fadeOut(500);
      var testWidget = new ChallengeWidget();
      testWidget.whenDone(data)
      MapView.deleteMarkers()
      MapView.setMarkers(challengeHolder.challenges)
      MapModel.beenClicked = false;
    })
		})
	}

}

