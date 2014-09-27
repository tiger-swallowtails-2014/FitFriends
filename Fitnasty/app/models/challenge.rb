class Challenge < ActiveRecord::Base
  has_many :user_challenges
  has_many :users, through: :user_challenges
  has_many :challenge_tags
  has_many :tags, through: :challenge_tags
  belongs_to :user

  def self.accepted_challenges_for_user(user)
  	accepted_user_challenges = UserChallenge.where(accepted?: true, user_id: user)
  	accepted_challenges = []
  	accepted_user_challenges.each do |user_challenge|
  		accepted_challenges << self.find(user_challenge.challenge_id)
  	end
  		return accepted_challenges
  end

end