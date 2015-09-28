class ItemsController < ApplicationController

  def index
  end

  def new
    @item = Item.new
  end

  def edit
    @item = Item.find(params[:id])
  end

  private

  def item_params
    params.require(:item).permit(:name, :location)
  end

end
