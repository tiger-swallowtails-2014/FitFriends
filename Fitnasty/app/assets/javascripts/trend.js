$(document).ready(function(){
	fetcher = new Fetcher;
	trendView = new TrendView;
	new TrendController(trendView, fetcher);
});

var TrendController = function(view, fetcher){
	this.view = view;
	this.fetcher = fetcher;
	this.fetcher.fetch('/trends', function(trendingTags){
		this.passTrendingTags(trendingTags)
	}.bind(this))
}

TrendController.prototype = {
	passTrendingTags: function(trendingTags){
		this.view.buildHtmlTags(trendingTags);
	}
}

var TrendView = function(){
}

TrendView.prototype = {
	buildHtmlTags: function(trendingTags){
		$.each(trendingTags, function(index, value){
			this.appendHtmlTag("<a href=''>"+value["name"]+"</a>")
		}.bind(this))
	},

	appendHtmlTag: function(HtmlTrendingTag){
		$('#trends-container').append(HtmlTrendingTag)
	}
}
