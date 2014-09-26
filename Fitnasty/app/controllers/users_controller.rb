class UsersController < ApplicationController

	def index
		users = User.all
		render json: users
	end

	def create
		user = User.new(params[:user])
		if user.save
			render json: user
		end
	end

	def show
		user = [User.find(params[:id])]
		render json: user
	end

end