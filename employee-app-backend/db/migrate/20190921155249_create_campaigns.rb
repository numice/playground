class CreateCampaigns < ActiveRecord::Migration[6.0]
  def change
    create_table :campaigns do |t|
      t.string :campaignName
      t.integer :point
      t.string :status
      t.date :startDate
      t.date :endDate
      t.timestamps
    end
  end
end
