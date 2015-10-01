class Api::ItemsController < ApplicationController

  def index
    binding.pry
    items = Item.all
    featuresArray = items.each_with_object([]) do |i, array|
      array << {type: "Feature", properties: {id: i.id, name: i.name, description: i.description, image: i.image.url, location: i.location, created_at: i.created_at.strftime("%D - %T"), claimed: i.claimed}, geometry: {type: "Point", coordinates: [i.longitude, i.latitude]}}
    end
    render json: {type: "FeatureCollection", features: featuresArray}
  end

  def indexView
    bounds = params[:viewport].split(",")

    featuresArray = Item.all.each_with_object([]) do |i, array|

      if i.latitude.to_i >= bounds[0].to_i && i.latitude.to_i <= bounds[2].to_i && i.longitude.to_i >= bounds[1].to_i && i.longitude.to_i <= bounds[3].to_i

        array << {type: "Feature", properties: {id: i.id, name: i.name, description: i.description, image: i.image.url, location: i.location, created_at: i.created_at.strftime("%D - %T"), claimed: i.claimed}, geometry: {type: "Point", coordinates: [i.longitude, i.latitude]}}
        end

    end

    render json: {type: "FeatureCollection", features: featuresArray}
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
    params.require(:item).permit(:name, :location, :description, :claimed, :image)
  end

end