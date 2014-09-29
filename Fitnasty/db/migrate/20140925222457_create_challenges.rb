class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.belongs_to :user
      t.string :title
      t.string :location
      t.float :latitude
      t.float :longitude
      t.string :description
      t.string :image_url
      t.timestamps
    end
  end
end
