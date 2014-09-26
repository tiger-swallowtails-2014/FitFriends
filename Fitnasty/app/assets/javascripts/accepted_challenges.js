// USER ID IS CURRENTLY HARDCODED IN - NEEDS TO BE CHANGED TO BE PULLED FROM SESSION
// NEED TO USE GARY'S HTML TEMPLATE FOR CHALLENGE IN VIEW.BUILDHTMLCHALLENGES

var AcceptedChallengesController = function(view, fetcher){
	this.view = new view(this);
	this.fetcher = new fetcher(this);
	this.fetcher.fetch('users/5/accepted');

}

var AcceptedChallengesView = function(controller){
	this.controller = controller
}

var AcceptedChallengesFetcher = function(controller){
	this.controller = controller
}

AcceptedChallengesController.prototype = {
	passAcceptedChallengesToView: function(acceptedChallenges){
		this.view.buildHtmlChallenges(acceptedChallenges);
	}
}

AcceptedChallengesView.prototype = {
	buildHtmlChallenges: function(challenges){
		$.each(challenges, function( index, value ) {
		  this.appendHtmlChallenges("<li>"+value.title+"</li>");
		}.bind(this))
	},
	appendHtmlChallenges: function(HtmlChallenge){
		$('#challenges-container ul').append(HtmlChallenge)
	}
}

AcceptedChallengesFetcher.prototype = {
	fetch: function(url, callback){
		$.getJSON(url, function(acceptedChallenges){
			this.controller.passAcceptedChallengesToView(acceptedChallenges)
	}.bind(this))
	}

}