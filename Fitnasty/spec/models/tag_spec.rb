require 'rails_helper'

describe Tag do
  it "throws an error if the tag name is not unique" do
    Tag.create(name: "run")
    Tag = Tag.new(name: "run")
    expect(Tag.error_on(:name).size).to eq(1)
  end

    # it { should have_many(:challenge_tags) }
    # it { should have_many(:challenges) }
end