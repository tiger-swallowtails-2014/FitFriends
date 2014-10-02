require 'rails_helper'

describe User do
  it "is valid with a firstname, lastname, email, and password" do
    user = build(:user)
    expect(user).to be_valid
  end

  it "throws an error if the user doesn't include a first_name" do
    expect(User.new(first_name: nil)).to have(1).errors_on(:first_name)
  end

  it "throws an error if the user doesn't include a last_name" do
    expect(User.new(last_name: nil)).to have(1).errors_on(:last_name)
  end

  it "throws an error if the email is not unique" do
    User.create(first_name: "Nick", last_name: "Cantelmi", password: "password", email: "test@gmail.com")
    user = User.new(first_name: "Sally", last_name: "Fields", password: "pass", email: "test@gmail.com")
    expect(user.error_on(:email).size).to eq(1)
  end

  it { should have_many(:user_challenges) }
  it { should have_many(:challenges) }
  it { should have_many(:followers) }
  it { should have_many(:follower_follows) }
  it { should have_many(:followees) }
  it { should have_many(:followee_follows) }
end