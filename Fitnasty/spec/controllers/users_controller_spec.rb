require 'rails_helper'

describe UsersController do
  describe "GET #index" do
    it "responds with a okay status" do
      get :index
      expect(response.status).to eq(200)
    end
  end

  describe "POST #create" do
    context "with valid attributes" do
      # 1.  we should be using let
      # 2.  we should be using Factory Girl to generate these params hashes.
      it "saves a new user" do
        expect {post :create, user: {first_name: "Nick", last_name: "C", email: "who_cares@gmail.com", password: "Pass1"}}.to change {User.count}.by (1)
      end

      it "sets a new session for the user" do
        expect {
                post :create, user: {first_name: "Gary", last_name: "H", email: "gar_bear@gmail.com", password: "Pass1"}
                session[:user_id].to eq(user.id)
              }
      end

      it "redirects to the user's profile page" do
        expect {
                post :create, user: {first_name: "Gary", last_name: "H", email: "gar_bear@gmail.com", password: "Pass1"}
                should redirect_to user_path(user)
              }
      end
    end

    context "with invalid attributes" do
      it "does NOT save a new user" do
        expect {post :create, user: {email: "who_cares@gmail.com", password: "Pass1"}}.to change {User.count}.by(0)
      end
    end
  end
end
