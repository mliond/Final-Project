class CreateItems < ActiveRecord::Migration
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :location
      t.boolean :claimed, default: false

      t.timestamps null: false
    end
  end
end