class CreateCharges < ActiveRecord::Migration[6.1]
  def change
    create_table :charges do |t|
      t.decimal :charge_amount, :precision => 10, :scale => 2
      t.belongs_to :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
