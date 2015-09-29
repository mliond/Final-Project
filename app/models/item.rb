class Item < ActiveRecord::Base

#Gmaps Key: AIzaSyAhrCvig_rV3F4_cO9FUSNpB4eXOE1UMOQ

  geocoded_by :location
  after_validation :geocode

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/items/:id.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  # validates :image, attachment_presence: true
  # validates_with AttachmentPresenceValidator, attributes: :image
  # validates_with AttachmentSizeValidator, attributes: :image, less_than: 5.megabytes
  # has_attached_file :image
  # validates_attachment_content_type :image, content_type: /\Aimage/
  # validates_attachment_file_name :image, matches: [/png\Z/, /jpe?g\Z/]
  # do_not_validate_attachment_file_type :image

end
