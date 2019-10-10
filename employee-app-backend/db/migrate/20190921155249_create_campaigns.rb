class CreateCampaigns < ActiveRecord::Migration[6.0]
  def change
    create_table :campaigns do |t|
      t.string :campaignName
      t.integer :point
      t.string :startDate
      t.string :endDate
      t.timestamps
    end
  end
end
