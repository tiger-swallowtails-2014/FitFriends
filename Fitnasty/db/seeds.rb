
class ChallengeSeeder
  def self.seed
    40.times do
      lat = rand(38) + 1
      long = rand(123) + 1
      challenge = User.find(rand(10) + 1).challenges.create(title: Faker::App.name, location: Faker::Address.street_address, description: Faker::Lorem.sentence(15), image_url: "http://upload.wikimedia.org/wikipedia/commons/a/a4/Ggb_by_night.jpg", latitude: (lat), longitude: (long))
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
