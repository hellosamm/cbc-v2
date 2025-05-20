class Api::V1::UsersController < ApplicationController
  before_action :authenticate_user!

  def update
    @user = current_user
    if @user.update(user_params)
      render json: {message: "account updated successfully", data: @user}, status: :ok
    else 
      render json: {message: "unable to save your changes", errors: @user.errors.full_messages.to_sentence}, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :username, :bio, :email)
  end
end