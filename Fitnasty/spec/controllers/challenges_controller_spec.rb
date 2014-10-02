require 'rails_helper'

describe ChallengesController do
  let(:user) {create(:user)}
  let(:challenge) {create(:challenge)}
  let(:tag) {create(:tag)}


  describe "POST #create" do

    # it "should create a new challenge with valid params" do
    #   session[:user_id] = user.id
    #   expect {
    #     post :create,
    #     :challenge => attributes_for(:challenge),
    #     :tag => {name: "run"}
    #     }.to change{Challenge.count}.by(1)
    # end

    it "should not create a new challenge with invalid params" do
      session[:user_id] = user.id
      expect {
        post :create, challenge: {title: nil}
      }.to_not change{Challenge.count}
    end
  end

  describe "GET #created" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :created, :user_id => user.id
    end

    it "renders an array of challenge objects" do
      session[:user_id] = user.id
      get :created, :user_id => user.id
      expect(response.body).to include("[")
    end
  end
  describe "GET #accepted" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :accepted, :user_id => user.id
    end

    it "renders an array of challenge objects" do
      session[:user_id] = user.id
      get :accepted, :user_id => user.id
      expect(response.body).to include("[")
    end
  end
  describe "GET #recent" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :recent, :user_id => user.id
    end

    it "renders an array of challenge objects" do
      session[:user_id] = user.id
      get :recent, :user_id => user.id
      expect(response.body).to include("[")
    end
  end
  describe "GET #show" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :show, :user_id => user.id, :challenge_id => challenge.id
    end

    it "renders an array of challenge objects" do
      session[:user_id] = user.id
      get :show, :user_id => user.id, :challenge_id => challenge.id
      expect(response.body).to include("[")
    end
  end
  describe "GET #search" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :search, :user_id => user.id, :keyword => challenge.title
    end

    it "renders an array of challenge objects" do
      session[:user_id] = user.id
      get :search, :user_id => user.id, :keyword => challenge.title
      expect(response.body).to include("[")
    end
  end
end