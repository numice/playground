class Api::V1::CampaignsController < ApplicationController
  # skip_before_action :verify_authenticity_token
  def show
    render json: { 'name': 'works' }
  end

  def post
    # add template for coming POST data here
    # print params
    @campaign = Campaign.new(params.permit(:campaignName, :point, :startDate, :endDate))
    if @campaign.save
      render json: { 'status': 'success' }
    else
      render json: { 'errors': @campaign.errors }, status: 400
    end
  end

  private

  def campaign_params
    params.require(:campaignName)
  end
end
