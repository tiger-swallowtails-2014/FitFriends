class Challenge < ActiveRecord::Base
  belongs_to :user
  has_many :user_challenges
  has_many :users, through: :user_challenges
  has_many :challenge_tags
  has_many :tags, through: :challenge_tags
end