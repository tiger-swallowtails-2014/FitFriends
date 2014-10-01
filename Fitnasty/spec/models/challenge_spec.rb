require 'rails_helper'

describe Challenge do
  it "is valid with a title, location, latitude, longitude, longitude, description" do
    challenge = Challenge.new(
          title: 'Test',
          description: 'Test Description',
          location: '633 Folsom St., San Francisco, CA',
          latitude: 32,
          longitude: 123
          )
    expect(challenge).to be_valid
  end

  it "throws an error if it doesn't include latitude" do
    challenge = Challenge.new()
    expect(challenge).to have(1).errors_on(:latitude)
  end

  it "throws an error if it doesn't include longitude" do
    challenge = Challenge.new()
    expect(challenge).to have(1).errors_on(:longitude)
  end

  it "throws an error if it doesn't include location" do
    challenge = Challenge.new()
    expect(challenge).to have(1).errors_on(:location)
  end

  it "throws an error if it doesn't include title" do
    challenge = Challenge.new()
    expect(challenge).to have(1).errors_on(:title)
  end

  it "throws an error if it doesn't include description" do
    challenge = Challenge.new()
    expect(challenge).to have(1).errors_on(:description)
  end
end