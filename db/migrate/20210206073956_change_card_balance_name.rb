class ChangeCardBalanceName < ActiveRecord::Migration[6.1]
  def change
    rename_column :cards, :balance, :availible_balance
  end
end
