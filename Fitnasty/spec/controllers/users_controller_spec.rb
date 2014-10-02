require 'rails_helper'

describe UsersController do
  let(:user) {create(:user)}
  # let(:user) {create(:followee)}
  let(:challenge) {create(:challenge)}
  describe "GET #index" do
    it "responds with a okay status" do
      get :index
      expect(response.status).to eq(200)
    end

    it "renders an array of user objects" do
      get :index
      expect(response.body).to include("[")
    end
  end

  describe "GET #current" do
    it "responds with a okay status" do
      get :current
      expect(response.status).to eq(200)
    end
    it "renders an array of user objects" do
      get :index
      expect(response.body).to include("[")
    end
  end

  describe "POST #create" do
    it "responds with a redirect" do
      post :create,
      :user => attributes_for(:user)
      expect(response.status).to eq(302)
    end

    it "should redirect to the user's home page" do
      expect {
        post :create, :user => attributes_for(:user)
        should redirect_to controller: users, action: :show
      }
    end

    it "should create a new user with valid params" do
      expect {
        post :create,
        :user => attributes_for(:user)
        }.to change{User.count}.by(1)
    end

    it "should not create a new user with invalid params" do
      expect {
        post :create, user: {email: nil, password: nil}
      }.to_not change{User.count}
    end

    it "should set a session for the user" do
      expect {
        post :create, :user => attributes_for(:user)
        session[:user_id].to eq(user.id)
      }
    end
  end

  describe "GET #show" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :show,
      :id => user.id
      expect(response.status).to eq(200)
    end
  end

  describe "GET #single_user" do
    it "responds with a okay status" do
      get :single_user,
      :id => user.id
      expect(response.status).to eq(200)
    end
    it "renders an array of user objects" do
      get :index
      expect(response.body).to include("[")
    end
  end

  describe "GET #search" do
    it "responds with a okay status" do
      get :search,
      :keyword => challenge.title
      expect(response.status).to eq(200)
    end
    it "renders an array of user objects" do
      get :index
      expect(response.body).to include("[")
    end
  end

  describe "GET #show_follow" do
    it "responds with a okay status" do
      session[:user_id] = user.id
      get :show_follow,
      :user_id => user.id
      expect(response.status).to eq(200)
    end
    it "renders an array of user objects" do
      get :index
      expect(response.body).to include("[")
    end
  end
end