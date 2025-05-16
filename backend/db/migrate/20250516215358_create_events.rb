class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.string :title, null:false
      t.text :description, null:false
      t.datetime :start_time, null:false
      t.datetime :end_time, null:false
      t.text :location, null:false

      t.timestamps
    end
  end
end
