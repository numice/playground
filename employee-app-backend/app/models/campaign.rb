require 'date'

class DateValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    original_value = record.read_attribute_before_type_cast( attribute )
    return if original_value.blank?

    begin
      Date.iso8601(value.to_s)
    rescue ArgumentError
      record.errors[attribute] << 'Wrong date format'
    end
  end
end


class Campaign < ApplicationRecord
  enum status: {
    active: 'active',
    scheduled: 'scheduled',
    ended: 'ended'
  }

  validates :campaignName, presence: true
  validates :point, presence: true, numericality: { only_integer: true, greater_than: 0 }
  validates :startDate, date: true
  validates :endDate, date: true
  validate :start_date_not_blank
  validate :start_date_cannot_be_in_the_past
  validate :start_date_not_after_end_date

  # :status = 'test'

  # after_validation :parse_dates

  # private
  #   def parse_dates
  #     :startDate = Date.iso8601(:startDate.to_s)
  #     # if :endDate.present?
  #     #   :endDate = Date.iso8601(:endDate.to_s)
  #     # end
  #   end
end

def start_date_not_blank
  # because of typecasting even if date is not nil but wrong format it will be turned into nil
  if startDate_before_type_cast.nil? || startDate_before_type_cast.blank?
    errors.add(:startDate, "can't be blank")
    return false
  end
end

def start_date_cannot_be_in_the_past
  # puts 'start_date_cannot_be_in_the_past'
  # puts startDate
  begin
    if Date.iso8601(startDate.to_s) < Date.today
      errors.add(:startDate, "can't be in the past") 
    end
  rescue ArgumentError
    return false
  end
end

def start_date_not_after_end_date
  begin
    if Date.iso8601(startDate.to_s) > Date.iso8601(endDate.to_s)
      errors.add(:endDate, "can't be before start date") 
    end
  rescue ArgumentError
    return false
  end
end
