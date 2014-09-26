require 'spec_helper'

describe "User" do
  it "is valid with a firstname, lastname, email, and password" do
    user = User.new(
          first_name: 'Aaron',
          last_name: 'Sumner',
          password: "Sup22",
          email: 'tester@example.com')
    expect(user).to be_valid
  end
end