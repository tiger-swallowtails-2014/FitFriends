class User < ActiveRecord::Base
  has_secure_password
  # has_many :challenges
  has_many :user_challenges
  has_many :challenges, through: :user_challenges
end