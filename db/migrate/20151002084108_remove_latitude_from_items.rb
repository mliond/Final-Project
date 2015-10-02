class RemoveLatitudeFromItems < ActiveRecord::Migration
  def change
    remove_column :items, :latitude, :float
    remove_column :items, :longitude, :float
  end
end
