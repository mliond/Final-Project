class Api::ItemsController < ApplicationController

  def index
    bounds = params[:viewport].split(",")
    unclaimed = params[:unclaimed]
    featuresArray = Item.all.each_with_object([]) do |i, array|
    if within_bounds(i, bounds) && unclaimed_or_not(i, unclaimed)
      array << {type: "Feature", properties: {id: i.id, item: i, claimed: i.claimed}, geometry: {type: "Point", coordinates: [i.longitude.to_f, i.latitude.to_f]}}
      end
    end
    render json: {type: "FeatureCollection", features: featuresArray}
  end

  def create
    item = Item.create(item_params)
    if images = params[:images]
      images.each do |img|
        item.pictures.create(image: img)
      end
    end
    render json: item
  end

  def show
    item = Item.find(params[:id])
    pictureURLs = item.pictures.each_with_object([]) do |i, array|
      array << i.image.url(:medium)
    end
    render json: {item: item, pictures: pictureURLs, created_at: item.created_at.strftime("%D - %T")}
  end

  def update
    item = Item.find(params[:id])
    item.update(item_params)
    render json: item
  end

  private

  def item_params
    params.require(:item).permit(:name, :description, :latitude, :longitude, :claimed, :image)
  end

  def within_bounds(i, bounds)
    if i.latitude.to_f > bounds[0].to_f && i.latitude.to_f < bounds[2].to_f && i.longitude.to_f > bounds[1].to_f && i.longitude.to_f < bounds[3].to_f
      return true
    end
  end

  def unclaimed_or_not(i, unclaimed)
    if unclaimed.to_s == 'false'
      return true
    elsif unclaimed.to_s == 'true'
      if i.claimed.to_s == 'false' # inverted bc unclaimed checkbox, but i.claimed
        return true
      end
    end
  end
end