class CreateInvitations < ActiveRecord::Migration[6.0]
  def change
    create_table :invitations do |t|
      t.string :reciever
      t.string :sender
      t.string :link

      t.timestamps
    end
  end
end
