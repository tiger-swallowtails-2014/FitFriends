var challengeHolder = {
  challenges: [],
  addChallenge: function(challenge) {
    this.challenges.push(challenge)
  }
}

// challenge Factory
var ChallengeFactory = (function(holder) {

  return {
    createChallenges: function(arrayOfChallengeHashes) {
      for (var i = 0; i < arrayOfChallengeHashes.length; i++) {
        challenge = new Challenge(arrayOfChallengeHashes[i])
        holder.addChallenge(challenge)
      }
    }
  }
})(challengeHolder);