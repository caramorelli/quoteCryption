class CreateQuotes < ActiveRecord::Migration[5.2]
  def change
    create_table :quotes do |t|
      t.string :content
      t.string :author
      t.string :quote_details
      t.timestamps
    end
  end
end
