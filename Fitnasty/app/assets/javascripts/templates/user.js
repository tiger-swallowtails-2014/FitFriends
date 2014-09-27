var User = function(userObject){
	this.id = userObject.id;
	this.first_name = userObject.first_name;
	this.last_name = userObject.last_name;
	this.email = userObject.email;
	this.password = userObject.password;
	this.created_at = userObject.created_at;
	this.updated_at = userObject.updated_at;
}
