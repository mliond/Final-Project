class AddIndexToItem < ActiveRecord::Migration
  def change
      add_index :items, :claimed
      add_index :items, :longitude
      add_index :items, :latitude
  end
end
