class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    @user.authenticate(params[:password])
    if @user
      session[:user_id] = @user.id
      p 'Session id from session controller:'
      p session[:user_id]
      redirect_to profile_path
    else
      redirect_to root_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end