class Api::ItemsController < ApplicationController

  before_action :is_logged_in?, only: [:create]
  before_action :is_owner?, only: [:update]

  def index
    bounds = params[:viewport].split(",")
    unclaimed = params[:unclaimed]
    ownership = params[:ownership]
    featuresArray = Item.all.each_with_object([]) do |i, array|
      if within_bounds(i, bounds) && unclaimed_or_not(i, unclaimed) && ownership_or_not(i.user_id, ownership)
        array << {type: "Feature", properties: {id: i.id, item: i, claimed: i.claimed}, geometry: {type: "Point", coordinates: [i.longitude.to_f, i.latitude.to_f]}}
      end
    end
    render json: {type: "FeatureCollection", features: featuresArray}
  end

  def create
    item = current_user.items.new(item_params)
    if images = params[:images]
      images.each do |img|
        item.pictures.new(image: img)
      end
    else
      render json: {error: "please attach pictures"}, status: 403
      return
    end
    unless item.save
      render json: {item: item, error: "please enter a name and description"}, status: 403
      return
    end
    render json: item
  end

  # def create
  #   item = current_user.items.create(item_params)
  #   params[:images].each do |img|
  #       item.pictures.create(image: img)
  #   end
  #   render json: item
  # end

  def show
    if logged_in?
      user = current_user.id
    else
      user = 0
    end
    item = Item.find(params[:id])
    pictureURLs = item.pictures.each_with_object([]) do |i, array|
      array << i.image.url(:medium)
    end
    render json: {item: item, pictures: pictureURLs, created_at: item.created_at.strftime("%D - %T"), owner_id: item.user.id, current_user: user}
  end

  def update
    Item.where(active: true).each do |item|
      item.update(active: false)
    end
    item = Item.find(params[:id])
    item.update(item_params)
    render json: item
  end

  private

  def is_logged_in?
    unless logged_in?
      render json: {error: "Please login to create new items"}, status: 403
      return
    end
  end

  def is_owner?
    #add ownership here
  end

  def item_params
    params.require(:item).permit(:name, :description, :latitude, :longitude, :claimed, :image, :active)
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

  def ownership_or_not(userId, ownership)#(userId, oBoolean, oId)
    if ownership.to_s == 'false'
      return true
    elsif ownership.to_s == 'true'
      if current_user.id == userId
        return true
      end
    end
  end
end