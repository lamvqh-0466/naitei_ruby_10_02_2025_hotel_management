class CreateRequestsRooms < ActiveRecord::Migration[7.0]
  def change
    create_table :requests_rooms do |t|
      t.references :request, null: false, foreign_key: true
      t.references :rooms, null: false, foreign_key: true

      t.timestamps
    end
  end
end
