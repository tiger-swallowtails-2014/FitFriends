$(document).ready(function(){
	fetcher = new Fetcher;
	trendView = new TrendView;
	new TrendController(trendView, fetcher);
});

var TrendController = function(view, fetcher){
	this.view = view;
	this.fetcher = fetcher;
	this.view.bindHtmlTag()
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
			console.log(value);
			this.appendHtmlTag("<li id="+value["id"]+"><a>"+value["name"]+"</a></li>")
		}.bind(this))
	},

	appendHtmlTag: function(HtmlTrendingTag){
		$('#trends-container ul').append(HtmlTrendingTag);
	},

	bindHtmlTag: function(){
		document.getElementById('tag').addEventListener("click", function(e){
		    console.log(e.target)
		});
	}
}
