var SessionsController = function(fetcher){
	this.fetcher = fetcher;
	this.returnCurrentUser();
}

SessionsController.prototype = {
	returnCurrentUser: function(){
		this.fetcher.fetch('users/current', function(currentUser){
		var user = new User(currentUser);
		return user;
	 })
  }
}