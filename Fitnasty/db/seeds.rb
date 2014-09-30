class UserSeeder
  def self.seed
    10.times do
      User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, password: "password", email: Faker::Internet.email)
    end
  end
end

class ChallengeSeeder
  def self.seed
    40.times do
      lat = rand(38) + 1
      long = rand(123) + 1
      challenge = User.find(rand(10) + 1).challenges.create(title: Faker::App.name, location: Faker::Address.street_address, description: Faker::Lorem.sentence(15), latitude: (lat), longitude: (long))
      2.times do
        challenge.tags.create(name: Faker::App.name)
      end
    end
  end
end

class AcceptedSeeder
  def self.seed
    20.times do
      User.find(rand(10) + 1).user_challenges.create(challenge_id: rand(40) + 1, accepted?: true, completed?: [true, false].sample)
    end
  end
end

class FollowSeeder
  def self.seed
    20.times do
      User.find(rand(10) + 1).followers << User.find(rand(10)+1)
      User.find(rand(10) + 1).followees << User.find(rand(10)+1)
    end
  end
end

UserSeeder.seed
ChallengeSeeder.seed
AcceptedSeeder.seed
FollowSeeder.seed
