# API for OC Agent status data
class PersonalStatusController < ApplicationController
  def index
    unless current_user
      render json: { error: 'Please log in to access this resouce' }, status: 403
      return
    end
    if current_user.agent.nil?
      render json: { error: 'Current user does not match any registered agent' }, status: 400
      return
    end
    contacts_service = ContactsService.new(current_user.agent, Time.zone.now.beginning_of_day, Time.zone.now.end_of_day)
    render json: {
      answered_calls: contacts_service.num_answered_calls,
      average_call_duration: contacts_service.average_call_duration,
      average_after_call_duration: contacts_service.average_after_call_duration
    }
  end
end