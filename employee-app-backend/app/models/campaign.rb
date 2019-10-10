require 'date'

class DateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    Date.iso8601(value.to_s)
  rescue ArgumentError
    record.errors[attribute] << 'Wrong date format'
  end
end


class Campaign < ApplicationRecord
  validates :campaignName, presence: true
  validates :point, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :startDate, presence: true, date: true
  validates :endDate, date: true
  validate :start_date_cannot_be_in_the_past
  validate :start_date_not_after_end_date
end

def start_date_cannot_be_in_the_past
  if Date.iso8601(startDate.to_s) < Date.today
    errors.add(:startDate, "can't be in the past")
  end
end

def start_date_not_after_end_date
  if Date.iso8601(startDate.to_s) > Date.iso8601(endDate.to_s)
    errors.add(:endDate, "can't be before start date")
  end
end
