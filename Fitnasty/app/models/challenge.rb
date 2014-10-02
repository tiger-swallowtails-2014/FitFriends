class Challenge < ActiveRecord::Base
  has_many :user_challenges
  has_many :users, through: :user_challenges
  has_many :challenge_tags
  has_many :tags, through: :challenge_tags
  belongs_to :user
  validates :title, :description, :location, :latitude, :longitude, presence: true
  before_save :set_default_image_url

  def set_default_image_url
    if self.image_url == "" then self.image_url = "http://www.ipr365.com/wp-content/uploads/2014/03/weightLiftingIcon.png"; end
  end

  def self.accepted_challenges_for_user(user)
  	accepted_user_challenges = UserChallenge.where(accepted?: true, completed?: false, user_id: user).order(updated_at: :desc).to_a
  	accepted_user_challenges.map! do |user_challenge|
  	 self.find(user_challenge.challenge_id)
  	end
  	return accepted_user_challenges.flatten
  end

  def self.top_ten_challenges
    challenges = UserChallenge.select('challenge_id, count(id) as "count"').group("challenge_id").order('count desc').limit(10)
    trending_challenges = []
    challenges.each { |challenge| trending_challenges << Challenge.find(challenge.challenge_id) }
    return trending_challenges
  end

  def self.pending_challenges_for_user(user)
    pending_user_challenges = UserChallenge.where(accepted?: false, completed?: false, user_id: user).to_a
    pending_user_challenges.map! do |user_challenge|
      self.find(user_challenge.challenge_id)
    end
    return pending_user_challenges.flatten
  end

  def self.completed_challenges_for_user(user)
    completed_user_challenges = UserChallenge.where(accepted?: true, completed?: true, user_id: user).order(updated_at: :desc).to_a
    completed_user_challenges.map! do |user_challenge|
      self.find(user_challenge.challenge_id)
    end
    return completed_user_challenges.flatten
  end

  def self.submitted_challenges_for_user(user)
    submitted_user_challenges = Challenge.where(user_id: user).order(updated_at: :desc).to_a
    return submitted_user_challenges.flatten
  end
end