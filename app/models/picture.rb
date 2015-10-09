# require "open-uri"

class Picture < ActiveRecord::Base

  belongs_to :item

  has_attached_file :image,
    :styles => {medium: "500x500>", thumb: "100x100>"},
    :storage => :s3,
    :s3_credentials => {
      :bucket =>  "ENV['S3_BUCKET_NAME']",
      :access_key_id => "ENV['AWS_ACCESS_KEY_ID']",
      :secret_access_key => "ENV['AWS_SECRET_ACCESS_KEY']"
    }
  validates :image, attachment_presence: true
  validates_attachment_content_type :image, content_type: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf']
  validates_with AttachmentSizeValidator, attributes: :image, less_than: 3.megabytes

  def picture_from_url(url)
    self.image = open(url)
  end

end
