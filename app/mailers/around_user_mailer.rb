class AroundUserMailer < ApplicationMailer

  default from: 'markus@map.com'

  def welcome_email(user)
    @user = user
    mail(to: @user.email, subject: "Welcome #{@user.name}")
  end

  def weekly_digest(user)
    @user = user
    @closest_item = # Item.find(...)
    @items = # Item.where(...)
    mail(to: @user.email, subject: "#{@user.name}, your weekly digest")
  end

end
