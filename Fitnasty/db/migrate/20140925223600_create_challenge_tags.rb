class CreateChallengeTags < ActiveRecord::Migration
  def change
    create_table :challenge_tags do |t|
      t.belongs_to :challenge
      t.belongs_to :tag
    end
  end
end
