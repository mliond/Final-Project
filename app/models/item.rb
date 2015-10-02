class Item < ActiveRecord::Base

  validates :name, presence: true
  validates :description, presence: true

  has_attached_file :image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/items/:id.png"
  validates :image, attachment_presence: true
  validates_attachment_content_type :image, content_type: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  validates_with AttachmentSizeValidator, attributes: :image, less_than: 3.megabytes

end
