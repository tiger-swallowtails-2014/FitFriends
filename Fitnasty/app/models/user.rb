class User < ActiveRecord::Base
  has_secure_password
  has_many :user_challenges
  has_many :challenges, through: :user_challenges
  has_many :challenges

  has_many :friendships
  has_many :friends, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  validates :first_name, :last_name, :email, :password, presence: true
  validates :email, uniqueness: true
end