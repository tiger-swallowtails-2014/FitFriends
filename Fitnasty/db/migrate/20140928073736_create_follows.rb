class CreateFollows < ActiveRecord::Migration
  def change
    create_table :follows do |t|
      t.belongs_to :follower, foreign_key: "follower_id", class_name: "User"
      t.belongs_to :followee, foreign_key: "followee_id", class_name: "User"
    end
  end
end
