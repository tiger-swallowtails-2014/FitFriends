require 'rails_helper'

describe ChallengesController do
  describe 'challenge#search' do

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
  end

  describe "POST #create" do

    let(:user) {create(:user)}
    let(:challenge) {build(:challenge)}
    let(:tag) {challenge.tags.create(name: "test_tag")}

    describe "with valid params" do
      it "creates a new challenge" do
        session[:user_id] = user.id
        expect{
            post :create, challenge
          }.to change {Challenge.count}.by(1)
      end
    end

    describe "with invalid params" do
      it "does not create a new challenge"

      it "renders a message warning that the challenge could not be created"
    end
  end
end