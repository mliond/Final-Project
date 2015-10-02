class RemovePositionFromItems < ActiveRecord::Migration
  def change
    remove_column :items, :latitude, :integer
    remove_column :items, :longitude, :integer
  end
end
