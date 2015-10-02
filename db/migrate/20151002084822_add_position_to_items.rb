class AddPositionToItems < ActiveRecord::Migration
  def change
    add_column :items, :latitude, :string
    add_column :items, :longitude, :string
  end
end
