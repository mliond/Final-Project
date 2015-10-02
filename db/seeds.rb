# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Item.destroy_all

puts 'destroyed all items'

num = 100

num.times do |i|
  random = RandomLocation.near_by(41.38506, 2.17340, 1000)
  item = Item.create({
    name: Faker::Name.name,
    description: Faker::Hacker.say_something_smart,
    latitude: random[0],
    longitude: random[1]
  })
  img1 = File.open("/Users/markus/downloads/Testpics/gif-#{rand(1..15)}.gif")
  img2 = File.open("/Users/markus/downloads/Testpics/gif-#{rand(1..15)}.gif")
  item.pictures.create({image: img1})
  item.pictures.create({image: img2})

  puts "created Item No. #{item.id}"
end

puts "Created #{num} new items. First one's id is #{Item.first.id}"