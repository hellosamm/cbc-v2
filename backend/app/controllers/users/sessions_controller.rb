# frozen_string_literal: true
class Users::SessionsController < Devise::SessionsController
  # include RackSessionFix
  respond_to :json

  # def create
  #   user = User.find_by(email: sign_in_params[:email])
    
  #   if user
  #     if user.valid_password?(sign_in_params[:password])
  #       render json: { message: "Logged in successfully.", data: user }, status: :ok
  #     else
  #       render json: { message: "Invalid email or password." }, status: :unauthorized
  #     end
  #   else
  #     Rails.logger.warn("User not found")
  #     render json: { message: "User not found." }, status: :unauthorized
  #   end
  # rescue => e
  #   Rails.logger.error("Error in SessionsController#create: #{e.message}")
  #   Rails.logger.error(e.backtrace.join("\n"))
  #   render json: { message: "An error occurred." }, status: :internal_server_error
  # end
  
  #
  # def create
  #   Rails.logger.debug("Resource: #{resource.inspect}")
  # end
  # 
  
  # def create
  #   # Attempt to find and authenticate the user based on email and password
  #   self.resource = warden.authenticate!(auth_options)
    
  #   # If the authentication is successful, respond with a success message
  #   if resource.persisted?
  #     render json: { message: "testing login.", data: resource }, status: :ok
  #   else
  #     # If authentication fails (invalid email or password), return a custom error message
  #     render json: { message: "Invalid email or password." }, status: :unauthorized
  #   end

  # rescue => e
  #   # Handle other errors (e.g., unexpected issues)
  #   render json: { message: e.message }, status: :unprocessable_entity
  # end


  

  private

  # def sign_in_params
  #   params.require(:user).permit(:email, :password)
  # end
  
  def respond_with(resource, _opts = {})
  render json: { message: "Logged in sucessfully.", data: resource}, status: :ok
  end

  # def respond_to_on_create
  #   if resource.persisted?
  #     render json: {message: "Logged in poop", data: resource}, status: :ok
  #   else
  #     render json: { message: "Invalid email or password"}, status: :unauthorized
  #   end
  # end

  def respond_to_on_destroy
    if current_user
      render json: { message: 'Logged out successfully'}, status: :ok
    else
      render json: { message: "Couldn't find an active session."}, status: :unauthorized
    end
  end

  #   if request.method == "POST" && resource.persisted?
  #     render json: { message: "Logged in sucessfully.", data: resource}, status: :ok
  #   elsif request.method == "DELETE"
  #     render json: { message: "Logged out successfully." }, status: :ok 
  #   else
  #     render json: { 
  #       message: "Couldn't find an actice session.", 
  #       # errors: resource.errors.full_messages.to_sentence 
  #     }, status: :unauthorized 
  #   end
  # end
end