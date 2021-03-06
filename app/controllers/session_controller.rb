# Handle user authentication using sessions.
class SessionController < ApplicationController
  def create
    user = User.find_by username: params[:username]
    return render json: { error: 'invalid username' }, status: :unauthorized if user.nil?
    unless user.authenticate(params[:password])
      return render json: { error: 'wrong password' }, status: :unauthorized
    end
    session[:user_id] = user.id
    render json: user.attributes.slice('id', 'agent_id', 'username', 'is_admin')
  end

  def get
    return render json: { error: 'not logged in' }, status: :unauthorized unless current_user
    render json: current_user.attributes.slice('id', 'agent_id', 'username', 'is_admin')
  end

  def destroy
    session[:user_id] = nil
    render nothing: true
  end
end
