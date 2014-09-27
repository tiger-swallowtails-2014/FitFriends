var Challenge = function(challengeObject){
	this.id = challengeObject.id;
	this.user_id = challengeObject.user_id;
	this.title = challengeObject.title;
	this.location = challengeObject.location;
	this.description = challengeObject.description;
	this.image_url = challengeObject.image_url;
	this.created_at = challengeObject.created_at;
	this.updated_at = challengeObject.updated_at;
}
