$(document).ready(function(){
	fetcher = new Fetcher;
	new TrendController(TrendView, fetcher);
});

var TrendController = function(view, fetcher){
	this.view = new view(this);
	this.fetcher = fetcher;
	this.view.bindHtmlTag()
	this.fetcher.fetch('/trends', function(trendingTags){
		this.passTrendingTags(trendingTags)
	}.bind(this))
}

TrendController.prototype = {
	passTrendingTags: function(trendingTags){
		this.view.buildHtmlTags(trendingTags);
	},
	filterChallengesByKeyword: function(keyword){
		this.fetcher.fetch('/challenges/search/' + keyword, function(searchedChallenges){
			clearHolder()
			ChallengeFactory.createChallenges(searchedChallenges)
			this.passSearchedChallengesToView(challengeHolder.challenges)}.bind(this));
	},
	passSearchedChallengesToView: function(challenges){
		this.view.buildHtmlChallenges(challenges);
	}
}

var TrendView = function(controller){
	this.controller = controller
}

TrendView.prototype = {
	buildHtmlChallenges: function(challenges){
		$.each(challenges, function( index, value ) {
		  this.appendHtmlChallenges(renderChallenge(value));
		}.bind(this))
	},

	appendHtmlChallenges: function(HtmlChallenge){
		var element = document.getElementById("challenges");
		while (element.firstChild) {
		  element.removeChild(element.firstChild);
		};
		$('#challenges').append(HtmlChallenge)
	},

	buildHtmlTags: function(trendingTags){
		$.each(trendingTags, function(index, value){
			this.appendHtmlTag("<li id="+value["id"]+"><a>"+value["name"]+"</a></li>")
		}.bind(this))
	},

	appendHtmlTag: function(HtmlTrendingTag){
		$('#trends-container ul').append(HtmlTrendingTag);
	},

	bindHtmlTag: function(){
		var tagElement = $('#trends-container ul')[0]
		tagElement.addEventListener("click", function(e){
		    var keyword = e.target.innerHTML;
		    this.controller.filterChallengesByKeyword(keyword);
		}.bind(this));
	}
}

