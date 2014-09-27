function TweetController() {
  var self = this
  this.getRecentTweets = function() {
    self.ajaxCall({type: "GET", url: '/challenges/recent'}).done(function(data){
      self.riverDone(data)
    })
  };

  this.sendTweet = function(element) {
    var info = $(element).val()
    self.ajaxCall({type: "POST", url: '/challenges', data: {challenge: info}}).done(function(challenge) {
        ChallengeFactory.createChallenges([challenge])
        tweetView.addTweetToRiver(singleTweetTemplate, challenge)
    })
  }

  this.ajaxCall = function(args) {
    var ajax = $.ajax(args)
    return ajax
  }

  this.ajaxCall = function(args) {
    var ajax = $.ajax(args)
    return ajax
  };

  this.riverDone = function(challenges) {
    ChallengeFactory.createChallenges(challenges)
    tweetView.createRiverTemplate(riverTemplate, tweetHolder.challenges)
  };

  this.newChallengeDone = function(challenges) {
    ChallengeFactory.createChallenges(challenges)
    tweetView.addTweetToRiver(singleTweetTemplate, tweetHolder.challenges.last())
  }

};

// Holder
var tweetHolder = {
  challenges: [],
  addChallenge: function(challenge) {
    this.challenges.push(challenge)
  }
}

// challenge Factory
var ChallengeFactory = (function(holder) {

  return {
    createChallenges: function(arrayOfChallenges) {
      for (var i = 0; i < arrayOfChallenges.length; i++) {
        challenge = new challenge(arrayOfChallenges[i])
        holder.addChallenge(challenge)
      }
    }
  }
})(tweetHolder);

// Model
function challenge(args) {
  this.content = args.content;
  this.username = args.username;
  this.handle = args.handle;
  this.avatar_url = args.avatar_url;
  this.created_at = args.created_at;
}
