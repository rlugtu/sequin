class CreateCards < ActiveRecord::Migration[6.1]
  def change
    create_table :cards do |t|
      t.string :name
      t.decimal :balance, :precision => 10, :scale => 2
      t.decimal :limit,:precision => 10, :scale => 2

      t.timestamps
    end
  end
end
