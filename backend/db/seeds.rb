# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

users = User.create!([
  {email: "test1@test.com", password: "123456"},
  {email: "test2@test.com", password: "123456"},
  {email: "test3@test.com", password: "123456"}
])


events = Event.create!([
  {title: "More is More by Molly Baz", 
  description: "This month we'll be cooking from Molly Baz's second cookbook (the red one)", 
  start_time: DateTime.new(2025, 6, 15, 1, 30),
  end_time: DateTime.new(2025, 6, 15, 3, 30),
  location: "Sara's House",
  user_id: users[0].id}, 
  {title: "Food of the Italian Islands by Katie Parla", 
  description: "Think the ultimate Italian summer holiday- costal villages, rocky beaches, and fresh flavors.", 
  start_time: DateTime.new(2025, 7, 19, 3, 30),
  end_time: DateTime.new(2025, 7, 19, 5, 30),
  location: "Amanda's House",
  user_id: users[0].id}, 
  {title: "Summer Picnic", 
  description: "There is no specific cookbook for this month- bring your favorite picnic food to share and enjoy a casual picnic dinner", 
  start_time: DateTime.new(2025, 8, 28, 3, 30),
  end_time: DateTime.new(2025, 8, 28, 5, 30),
  location: "Lindsay's House",
  user_id: users[1].id},
  {title: "On the Curry Trail by Raghavan Iyer", 
  description: "We'll enjoy a spread of flavorful curries & fresh naan", 
  start_time: DateTime.new(2025, 9, 7, 4, 30),
  end_time: DateTime.new(2025, 9, 7, 6, 30),
  location: "Katie's House",
  user_id: users[2].id}
])

events[0].cover_photo.attach(
  io: File.open(Rails.root.join("db/images/more-is-more.png")),
  filename: "more-is-more.png",
  content_type: "image/png"
)

events[1].cover_photo.attach(
  io: File.open(Rails.root.join("db/images/italian_islands.jpg")),
  filename: "italian_islands.jpg",
  content_type: "image/jpeg"
)

events[2].cover_photo.attach(
  io: File.open(Rails.root.join("db/images/picnic.jpg")),
  filename: "picnic.jpg",
  content_type: "image/jpeg"
)

events[3].cover_photo.attach(
  io: File.open(Rails.root.join("db/images/on_the_curry_trail.jpg")),
  filename: "on_the_curry_trail.jpg",
  content_type: "image/jpeg"
)
events.each(&:reload)