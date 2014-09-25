class CreateUserChallenges < ActiveRecord::Migration
  def change
    create_table :user_challenges do |t|
      t.belongs_to :user
      t.belongs_to :challenge
      t.boolean :accepted?, default: false
      t.boolean :completed?, default: false
      t.timestamps
    end
  end
end
