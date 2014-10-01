class UserChallenge < ActiveRecord::Base
  belongs_to :user
  belongs_to :challenge

  scope :accepted, -> { where(accepted?: true) }
  scope :completed, -> { where(completed?: true) }

  validates_uniqueness_of :user_id, :scope =>:challenge_id
end