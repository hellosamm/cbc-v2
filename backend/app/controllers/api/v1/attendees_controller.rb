class Api::V1::AttendeesController < ApplicationController
  # before_action :set_attendee, only: %i[destroy]
  # before_action :authorize_user, only: %i[destroy]
  # before_action :authenticate_user!, only: %i[destroy, create]

  def create
    @attendee = current_user.attendees.build(attendee_params)

    if @attendee.save 
      render json: {message: "successfully signed up for the event", data: @attendee}
    else
      render json: {message: "unable to sign up for the event", data: @attendee.errors}
    end
  end

  def show

  events = Event.joins(:attendees).where(attendees: { user_id: current_user.id }).uniq

  if events.any?
    render json: { data: events }, status: :ok
  else
    render json: { message: "No events found for this user" }, status: :not_found
  end 

  end

  def destroy
    @attendee = Attendee.find_by(id: params[:id])

    if @attendee.user_id == current_user.id 
      if @attendee.destroy 
        render json: {message: "successfully canceled rsvp for this event", data: @attendee}
      else
        render json: {message: "unable to cancel your rsvp", data: @attendee.errors}
      end
    else 
      render json: {message: "Unathorized: You can only cancel your RSVP"}, status: :forbidden
    end
  end

  # GET api/v1/event/:event_id/attendee
  def index
   @event = Event.find_by(id: params[:event_id])
   attendee = @event.attendees.find_by(user_id: current_user.id)

   if attendee
     render json: {attendee_id: attendee.id, event_id: attendee.event_id, user_id: attendee.user_id}, status: :ok
   else
    render json: {message: "User is not signed up for this event"}, status: :not_found  
   end
  end

  def list
    @event = Event.find_by(id: params[:event_id])
    

    if @event 
      attendees = @event.attendees.includes(:user).map do |attendee|
        user = attendee.user

        {
          user_id: user.id,
         first_name: user.first_name,
          email: user.email,
          username: user.username
        }
      end
      render json: attendees
    else
      render json: {message: "attendees could not be found"}
    end
  end


  private
  
  def attendee_params
    params.require(:attendee).permit(:event_id)
  end

  def set_attendee
    @attendee = current_user.attendees.find_by(id: params[:event_id])
  end

  def authorize_user
    @event = Event.find(params[:event_id])
    unless @event.attendees.exists?(user_id: current_user.id)
      render json: { error: "access denied"}, status: :forbidden
    end
  end
end