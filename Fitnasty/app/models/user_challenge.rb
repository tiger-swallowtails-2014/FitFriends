class UserChallenge < ActiveRecord::Base
  belongs_to :user
  belongs_to :challenge

  scope :accepted, -> { where(accepted?: true, completed?: false) }
  scope :completed, -> { where(completed?: true) }
  
end