// USER ID IS CURRENTLY HARDCODED IN - NEEDS TO BE CHANGED TO BE PULLED FROM SESSION

var AcceptedChallengesController = function(view, fetcher){
	this.view = view;
	this.fetcher = fetcher;

	this.fetcher.fetch('users/current', function(currentUser){this.getAcceptedChallenges(new User(currentUser));
	}.bind(this));

}

var AcceptedChallengesView = function(){
}

AcceptedChallengesController.prototype = {
	getAcceptedChallenges: function(currentUser){
		this.fetcher.fetch("users/"+currentUser["id"]+"/accepted", function(acceptedChallenges){

			//GARY MADE UPDATES HERE

			clearHolder()
			ChallengeFactory.createChallenges(acceptedChallenges)
			this.passAcceptedChallengesToView(challengeHolder.challenges)}.bind(this));
	},
	passAcceptedChallengesToView: function(acceptedChallenges){
		this.view.buildHtmlChallenges(acceptedChallenges);
	}
}

AcceptedChallengesView.prototype = {
	buildHtmlChallenges: function(challenges){
		$.each(challenges, function( index, value ) {
		  this.appendHtmlChallenges(renderChallenge(value));
		}.bind(this))
	},
	appendHtmlChallenges: function(HtmlChallenge){
		$('#accepted').append(HtmlChallenge)
	}
}