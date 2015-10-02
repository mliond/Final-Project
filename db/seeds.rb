# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Item.destroy_all

puts 'destroyed all items'

num = 50

num.times do |i|
  random = RandomLocation.near_by(41.38506, 2.17340, 20000)
  item = Item.create({
    name: Faker::Name.name,
    description: Faker::Hacker.say_something_smart,
    latitude: random[0],
    longitude: random[1]
  })
  img = File.open('/Users/markus/downloads/testpic.gif')
  item.pictures.create({image: img})
end

puts "Created #{num} new items. First one's id is #{Item.first.id}"