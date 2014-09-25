class Tag < ActiveRecord::Base
  validates :name, :uniqueness => true
  has_many :challenge_tags
  has_many :challenges, through: :challenge_tags
end