class AddDetailsToUser < ActiveRecord::Migration
  def change
    add_column :users, :name, :string
    add_column :users, :latitude, :float, default: 41.39167454068234
    add_column :users, :longitude, :float, default: 2.1771672234719244
  end
end
