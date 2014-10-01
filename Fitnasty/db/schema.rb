# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140928073736) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "challenge_tags", force: true do |t|
    t.integer "challenge_id"
    t.integer "tag_id"
  end

  create_table "challenges", force: true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "location"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "description"
    t.string   "image_url",   default: "http://www.ipr365.com/wp-content/uploads/2014/03/weightLiftingIcon.png"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "follows", force: true do |t|
    t.integer "follower_id"
    t.integer "followee_id"
  end

  create_table "tags", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_challenges", force: true do |t|
    t.integer  "user_id"
    t.integer  "challenge_id"
    t.boolean  "accepted?",    default: false
    t.boolean  "completed?",   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
