  require 'spec_helper'

describe UsersController do
  describe "GET #index" do
    it "responds with a okay status" do
      get :index
      expect(response.status).to eq(200)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      it "saves a new user" do
        expect {post :create, user: {first_name: "Nick", last_name: "C", email: "who_cares@gmail.com", password: "Pass1"}}.to change {User.count}.by (1)
      end
    end
  end
end