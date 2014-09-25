class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.belongs_to :user
      t.string :title, null: false
      t.string :location, null: false
      t.string :description, null: false
      t.string :image_url
      t.timestamps
    end
  end
end
