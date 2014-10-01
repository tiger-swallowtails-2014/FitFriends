class CreateChallenges < ActiveRecord::Migration
  def change
    create_table :challenges do |t|
      t.belongs_to :user
      t.string :title
      t.string :location
      t.float :latitude
      t.float :longitude
      t.string :description
      t.string :image_url, default: "http://www.ipr365.com/wp-content/uploads/2014/03/weightLiftingIcon.png"
      t.timestamps
    end
  end
end
