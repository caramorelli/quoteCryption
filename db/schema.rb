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

ActiveRecord::Schema.define(version: 2019_04_17_192800) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "boards", force: :cascade do |t|
    t.string "player", default: "anonymous"
    t.string "cryptobet"
    t.string "ciphertext"
    t.string "user_board"
    t.string "difficulty", default: "medium"
    t.integer "available_hints", default: 3
    t.string "given_letters"
    t.string "status", default: "unsolved"
    t.integer "timer", default: 0
    t.bigint "quote_id"
    t.string "session_token"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quote_id"], name: "index_boards_on_quote_id"
    t.index ["session_token"], name: "index_boards_on_session_token"
  end

  create_table "quotes", force: :cascade do |t|
    t.string "content"
    t.string "author"
    t.string "quote_details"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "boards", "quotes"
end
