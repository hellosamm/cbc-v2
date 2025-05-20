class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, 
         :jwt_authenticatable, jwt_revocation_strategy: self

         has_one_attached :profile_picture
         has_many :created_events, class_name: "Event", foreign_key: "user_id"
         has_many :attendees
         has_many :attended_events, through: :attendees, source: :event

end
