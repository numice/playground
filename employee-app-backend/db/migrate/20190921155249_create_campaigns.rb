class CreateCampaigns < ActiveRecord::Migration[6.0]
  def change
    execute <<-SQL
      CREATE TYPE campaign_statuses AS ENUM ('active', 'scheduled', 'ended');
    SQL

    create_table :campaigns do |t|
      t.string :campaignName
      t.integer :point
      t.column :status, :campaign_statuses
      t.date :startDate
      t.date :endDate
      t.timestamps
    end
  end
end
