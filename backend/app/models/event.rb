class Event < ApplicationRecord
  validates :title, presence: true
  validates :description, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :location, presence: true

  belongs_to :creator, class_name: "User", foreign_key: "user_id"
  has_many :attendees
  has_many :users, through: :attendees, source: :user
  has_one_attached :cover_photo
  has_many_attached :gallery_images
  
end
