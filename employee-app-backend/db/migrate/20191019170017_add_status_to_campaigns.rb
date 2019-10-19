class AddStatusToCampaigns < ActiveRecord::Migration[6.0]
  def up
    exexute <<-SQL
      CREATE TYPE campaign_statuses AS ENUM ('active', 'scheduled', 'ended');
      ALTER TABLE campaigns ADD status campaign_statuses;
    SQL
  end

  def down
    execute <<-SQL
      DROP TYPE campaign_statuses;
    SQL
    remove_column :campaigns, :status
  end
end
