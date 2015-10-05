class AddActiveBooleanToItem < ActiveRecord::Migration
  def change
    add_column :items, :active, :boolean, default: false
  end
end
