class Api::ItemsController < ApplicationController

  def index
    featuresArray = []
    Item.all.each do |i|
      eachItem = {type: "Feature", geometry: {type: "Point", coordinates: [i.longitude, i.latitude]}}
      featuresArray << eachItem
    end
    render json: {"type": "FeatureCollection", "features": featuresArray}
  end

  def create
    item = Item.create(item_params)
    render json: item
  end

  def update
    item = Item.find(params[:id])
    item.update(item_params)
    render json: item
  end

  private

  def item_params
    params.require(:item).permit(:name, :location, :claimed)
  end

end