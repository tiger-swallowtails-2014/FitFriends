require 'rails_helper'

describe ChallengesController do
  describe 'challenge#search' do
    before(:each) do
      Challenge.destroy_all
    end

    let(:challenge) {Challenge.create(title: "test_title", location: "test_location", description: "test_description")}
    let(:tag) {challenge.tags.create(name: "test_tag")}

    # it 'returns a challenge matched by title' do
    #   get :search, keyword: challenge.title
    #   result = JSON.parse(response.body)[0]
    #   expect(result["challenge_object"]["title"]).to eq(challenge.title)
    # end

    # it 'returns a challenge matched by description' do
    #   get :search, keyword: challenge.description
    #   result = JSON.parse(response.body)[0]
    #   expect(result["challenge_object"]["description"]).to eq(challenge.description)
    # end

    # it 'returns a challenge matched by a tag' do
    #   get :search, keyword: tag.name
    #   result = JSON.parse(response.body)[0]
    #   expect(result["challenge_object"]["title"]).to eq(challenge.title)
    # end

    describe "challenge#create" do
        it "creates a new challenge with valid params" do

        end
    end
  end
end