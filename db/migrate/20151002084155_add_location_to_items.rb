class AddLocationToItems < ActiveRecord::Migration
  def change
    add_column :items, :latitude, :integer
    add_column :items, :longitude, :integer
  end
end
