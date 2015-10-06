class SessionsController < ApplicationController

  def new
  end

  def create
    if user = User.find_by(email: params[:session][:email]).try(:authenticate, params[:session][:password])
      session[:user_id] = user.id
      redirect_to '/'
    else
      redirect_to '/'
    end
  end

  def destroy
    session.clear
    redirect_to '/'
  end

end
