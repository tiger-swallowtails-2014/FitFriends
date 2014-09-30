class Challenge < ActiveRecord::Base
  has_many :user_challenges
  has_many :users, through: :user_challenges
  has_many :challenge_tags
  has_many :tags, through: :challenge_tags
  belongs_to :user

  def self.challenge_matching_keyword(keyword)
    challenges = []
    challenges << Challenge.where('description LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('title LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('location LIKE ?', "%#{keyword}%")
  end

  def self.accepted_challenges_for_user(user)
    accepted_user_challenges = UserChallenge.where(accepted?: true, user_id: user)
  	accepted_challenges = [] # NOOOOOOOOOOOOOOOOOOOOOOOOOO!  Use #map, better yet: flat_map
  	accepted_user_challenges.each do |user_challenge|
  		accepted_challenges << self.find(user_challenge.challenge_id)
  	end
  	return accepted_challenges
  end

  def self.top_ten_challenges
    challenges = UserChallenge.select('challenge_id, count(id) as "count"').group("challenge_id").order('count desc').limit(10)
    trending_challenges = []
    challenges.each { |challenge| trending_challenges << Challenge.find(challenge.challenge_id) }
    return trending_challenges
  end
end
