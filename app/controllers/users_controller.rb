class UsersController < ApplicationController

  before_action :authenticate_user!, only: :show

  def show
    @user = current_user
  end

  def create

    AroundUserMailer.welcome_email(@user).deliver_later
  end

end
