# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts 'started (nothing destroyed)'

userNum = 10
itemNum = 30

userNum.times do |u|
  # create user
  u = User.create({
  name: Faker::Name.name,
  email: Faker::Internet.email,
  password: "test",
  password_confirmation: "test"
  })
  puts "created user no #{u.id}"

  #create items each

  names = ["A red couch", "A blue armchair", "An old lamp", "Silverware for an entire family!", "New chairs", "Old videogames", "A broken toilet"]
  description = ["This item has been with my family for years. Now I am giving it away for free. Come and get it!", "We loved this old thing and hope it will make someone as happy as it made us!"]
  itemNum.times do |i|
    random = RandomLocation.near_by(41.392705, 2.146386, 3640)
    item = u.items.create({
      name: names[rand(0..(names.count - 1))],
      description: description[rand(0..(description.count - 1))],
      latitude: random[0],
      longitude: random[1]
    })
    puts "created item no #{item.id}"

    # create pictures each
    images = ["http://firstchoicecarpetcleaners.com/wp-content/uploads/2013/10/UNTE_200252079_3000.jpeg", "http://cdn.nest.co.uk/product-media/7MX/800/600/SCP-Oscar-Armchair.jpg", "http://www.southdownsleisure.co.uk/wp-content/uploads/2014/06/antiques.png", "http://overmental.com/wp-content/uploads/2015/03/video-game-controllers.jpg", "https://iconicinteriors.com/images/uploads/products/buy-barcelona-chair-vintage.jpg"]

    # img1 = images[rand(0..(images.count -1))]
    img1= images[rand(0..(images.count - 1))]
    pic1 = item.pictures.create()
    pic1.picture_from_url(img1)
    pic1.save
    puts "created picture no #{pic1.id}"
    img2 = images[rand(0..(images.count - 1))]
    pic2 = item.pictures.create()
    pic2.picture_from_url(img2)
    pic2.save
    puts "created picture no #{pic2.id}"
    img3 = images[rand(0..(images.count - 1))]
    pic3 = item.pictures.create()
    pic3.picture_from_url(img3)
    pic3.save
    puts "created picture no #{pic3.id}"
  end
end

puts "-> created #{userNum} new users with #{itemNum} items with 3 pictures each."