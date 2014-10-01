var Challenge = function(challengeHash){
	this.id = challengeHash.challenge_object.id;
	this.user_id = challengeHash.challenge_object.user_id;
	this.title = challengeHash.challenge_object.title;
	this.location = challengeHash.challenge_object.location;
	this.description = challengeHash.challenge_object.description;
	this.image_url = challengeHash.challenge_object.image_url;
	this.created_at = challengeHash.challenge_object.created_at;
	this.updated_at = challengeHash.challenge_object.updated_at;
  this.user = challengeHash.challenge_user
  this.tags = challengeHash.challenge_tags
  this.completed = challengeHash.completed
  this.accepted = challengeHash.accepted
  this.chart_stats = challengeHash.chart_stats
}
