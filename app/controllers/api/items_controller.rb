class Api::ItemsController < ApplicationController

  def index
    featuresArray = Item.all.each_with_object([]) do |i, array|
      array << {type: "Feature", geometry: {type: "Point", coordinates: [i.longitude, i.latitude]}}
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