class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.integer :balance
      t.integer :limit

      t.timestamps
    end
  end
end
