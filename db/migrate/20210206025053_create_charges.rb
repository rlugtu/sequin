class CreateCharges < ActiveRecord::Migration[6.1]
  def change
    create_table :charges do |t|
      t.integer :charge_amount
      t.belongs_to :card, null: false, foreign_key: true

      t.timestamps
    end
  end
end
