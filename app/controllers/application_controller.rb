class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user
  helper_method :logged_in?

  def current_user
    if @current_user.nil?
      @current_user = User.find(session[:user_id])
    end
    @current_user
  end

  def logged_in?
    if session[:user_id]
      return true
    else
      return false
    end
  end

end
