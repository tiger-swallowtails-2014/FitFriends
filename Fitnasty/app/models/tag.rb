class Tag < ActiveRecord::Base
  validates :name, :uniqueness => true
  has_many :challenge_tags
  has_many :challenges, through: :challenge_tags

  def self.top_ten_tags
    tags = ChallengeTag.includes(:tag).select('tag_id, count(challenge_tags.id) as "count"').group("tag_id").order('count desc').limit(10)
      trending_tags = []
      tags.each { |tag| trending_tags << Tag.find(tag.tag_id) }
      return trending_tags
  end
end


