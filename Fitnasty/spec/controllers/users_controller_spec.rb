require 'rails_helper'

describe UsersController do
  describe "GET #index" do
    it "responds with a okay status" do
      get :index
      expect(response.status).to eq(200)
    end
  end

  let(:user) {create(:user)}
  describe "POST #create" do
    context "with valid attributes" do
      it "saves a new user" do
        expect {user}.to change {User.count}.by (1)
      end

      it "sets a new session for the user" do
        expect {
                post :create, user
                session[:user_id].to eq(user.id)
              }
      end

      it "redirects to the user's profile page" do
        expect {
                post :create, user
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