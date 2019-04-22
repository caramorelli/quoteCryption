class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
        t.string :player, default: 'anonymous'
        t.string :cryptobet
        t.string :ciphertext
        t.string :user_board
        t.string :difficulty, default: 'medium'
        t.integer :available_hints, default: 3
        t.string :given_letters
        t.string :status, default: 'unsolved'
        t.integer :timer, default: 0
        t.references :quote, foreign_key: true, index: true

        t.string :session_token, index: true


      t.timestamps
    end
  end
end
