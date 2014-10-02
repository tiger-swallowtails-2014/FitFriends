FactoryGirl.define do
  factory :challenge do
    title Faker::Lorem.word
    description Faker::Lorem.sentence
    location Faker::Address.street_address
    latitude Faker::Address.latitude
    longitude Faker::Address.longitude
  end

  factory :tag do
    name Faker::Lorem.word
  end
end