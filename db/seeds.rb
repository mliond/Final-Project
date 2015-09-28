# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Item.destroy_all

puts 'destroyed all items'

num = 1

num.times do |i|
  Item.create({
    name: 'Couch',
    description: 'A red couch',
    location: 'Carrer de Bailen 11, Barcelona'
  })
end

puts "Created #{num} new items. First one's id is #{Item.first.id}"