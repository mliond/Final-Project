# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# puts 'started (nothing destroyed)'

# userNum = 25
# itemNum = 100

# userNum.times do |u|
#   # create user
#   u = User.create({
#   name: Faker::Name.name,
#   email: Faker::Internet.email,
#   password: "test",
#   password_confirmation: "test"
#   })
#   puts "created user no #{u.id}"

#   #create items each
#   itemNum.times do |i|
#     random = RandomLocation.near_by(41.38506, 2.17340, 25000)
#     item = u.items.create({
#       name: Faker::Name.name,
#       description: Faker::Hacker.say_something_smart,
#       latitude: random[0],
#       longitude: random[1]
#     })
#     puts "created item no #{item.id}"

#     # create pictures each
#     img1 = File.open("/Users/markus/downloads/Testpics/gif-#{rand(1..15)}.gif")
#     img2 = File.open("/Users/markus/downloads/Testpics/gif-#{rand(1..15)}.gif")
#     pic1 = item.pictures.create({image: img1})
#     puts "created picture no #{pic1.id}"
#     pic2 = item.pictures.create({image: img2})
#     puts "created picture no #{pic2.id}"
#   end
# end

# puts "-> created #{userNum} new users with #{itemNum} items with 2 pictures each."