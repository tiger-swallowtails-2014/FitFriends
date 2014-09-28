var Fetcher = function(){
}

Fetcher.prototype = {
	fetch: function(url, callback){
		$.getJSON(url, callback)
	}
}