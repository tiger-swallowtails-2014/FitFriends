class UserSeeder
  MARKETING_RECOMMENDED_NUMBER_OF_USERS = 10

  def self.seed
    MARKETING_RECOMMENDED_NUMBER_OF_USERS.times do
      # Yet again, we could use FactoryGirl here..
      User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, password: "password", email: Faker::Internet.email)
    end
  end
end

=begin rdoc
====

class UserSeeder
  MARKETING_RECOMMENDED_NUMBER_OF_USERS = 10

  def initialize(count)
    @count = count || MARKETING_RECOMMENDED_NUMBER_OF_USERS
  end

  def seed!
    MARKETING_RECOMMENDED_NUMBER_OF_USERS.each{ create_user_instance! }
  end

  private

    def create_user_instance!
      User.create(first_name: Faker::Name.first_name, last_name: Faker::Name.last_name, password: "password", email: Faker::Internet.email)
    end
end
=end
