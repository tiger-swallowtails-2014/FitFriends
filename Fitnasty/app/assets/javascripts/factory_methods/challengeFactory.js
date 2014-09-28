var challengeHolder = {
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
})(challengeHolder);