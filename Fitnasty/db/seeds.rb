class UserSeeder
  def self.seed
    15.times do
      User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, password: "password", email: Faker::Internet.email)
    end
  end
end

class ChallengeSeeder
  def self.seed
    40.times do
      lat = rand(38) + 1
      long = -(rand(123) + 1)
      user = User.find(rand(10)+1)
      challenge = user.challenges.create(title: Faker::App.name, location: Faker::Address.street_address, description: Faker::Lorem.sentence(15), latitude: (lat), longitude: (long))
      2.times do
        challenge.tags.create(name: Faker::App.name)
      end
      user.user_challenges.create(challenge_id: challenge.id, accepted?: true)
    end
  end
end

class AcceptedSeeder
  def self.seed
    100.times do
      # to seed accepted and completed challenges
      User.find(rand(10) + 1).user_challenges.create(challenge_id: rand(40) + 1, accepted?: true, completed?: [true, false].sample)
      # to seed pending challenges
      User.find(rand(10) + 1).user_challenges.create(challenge_id: rand(40) + 1, accepted?: false, completed?: false)
    end
  end
end

class FollowSeeder
  def self.seed
    User.all.each do |user|
      random_follower = User.find(rand(10)+1)
      random_followee = User.find(rand(10)+1)
      user.followers << random_follower unless (user.followers.include?(random_follower) || random_follower.id == user.id)
      user.followees << random_followee unless (user.followees.include?(random_followee) || random_followee.id == user.id)
    end
  end
end

UserSeeder.seed
ChallengeSeeder.seed
AcceptedSeeder.seed
FollowSeeder.seed
