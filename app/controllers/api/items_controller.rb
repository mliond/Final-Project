class Api::ItemsController < ApplicationController

  def index
    file = File.read('tmp/google.json')
    data_hash = JSON.parse(file)
    # render json: data_hash
    string = ""
    Item.all.each do |i|
      string += '{'
      string += "'type': 'Feature',"
      string += "'geometry': {'type': 'Point', 'coordinates': [#{i.latitude}, #{i.longitude}]}"
      string += '}'
    end

    render json: {"type": "FeatureCollection", "features": ["type": "Feature", "geometry": {"type": "Point", "coordinates": [2.1772565, 41.3917816]}]}
    # render json: {"type": "FeatureCollection", "features": [string]}
  end

end