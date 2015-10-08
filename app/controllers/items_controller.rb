class ItemsController < ApplicationController

  def home
  end

  def index
    @item = Item.new
    @user = User.new
  end

  def edit
    @item = Item.find(params[:id])
  end

  private

  def item_params
    params.require(:item).permit(:name, :location, :image)
  end

end
