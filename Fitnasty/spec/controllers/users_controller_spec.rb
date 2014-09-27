require 'spec_helper'

describe UsersController do
  describe "get#index" do
    it "responds with a okay status" do
      get :index
      expect(response.status).to eq(200)
    end
  end
end