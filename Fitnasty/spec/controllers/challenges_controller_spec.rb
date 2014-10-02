require 'rails_helper'

describe ChallengesController do
  let(:user) {create(:user)}
  let(:challenge) {create(:challenge)}

  # Couldn't find User without an ID
  describe "GET #created" do
    it "responds with a okay status" do
      # p User.find(user.id)
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