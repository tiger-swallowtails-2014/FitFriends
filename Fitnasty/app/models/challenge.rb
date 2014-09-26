class Challenge < ActiveRecord::Base
  has_many :user_challenges
  has_many :users, through: :user_challenges
  has_many :challenge_tags
  has_many :tags, through: :challenge_tags
  belongs_to :user
end