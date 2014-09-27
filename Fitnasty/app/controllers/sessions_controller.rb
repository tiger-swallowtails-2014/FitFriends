class SessionsController < ApplicationController

  def new
  end

  def create
    @user = User.find_by(email: params[:email])
    @user.authenticate(params[:password])
    if @user
      session[:user_id] = @user.id
      redirect_to root_path
    else
      redirect_to '/home'
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to '/home'
  end

end