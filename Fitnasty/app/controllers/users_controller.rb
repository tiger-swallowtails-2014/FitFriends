class UsersController < ApplicationController

	def index
		users = User.all
		render json: users
	end

	def current
		render json: current_user
	end

	def create
		user = User.new(user_params)
		if user.save
			session[:user_id] = user.id
			redirect_to user
		else
			redirect_to root_path
		end
	end

	def show
		@user = User.find(params[:id])
	end

	def search
		keyword = params[:keyword]
		matched_users = match_users(keyword).flatten

		render :partial => 'user_results', locals: {users: matched_users}
	end

	def show_follow
		user = User.find(params[:user_id])
		render :partial => 'follow', locals: {user: user}
	end

	private
	def user_params
	  params.require(:user).permit(:first_name, :last_name, :email, :password)
	end

	def match_users(keyword)
		users = []
		users << User.where('first_name LIKE ?', "%#{keyword}%")
		users << User.where('last_name LIKE ?', "%#{keyword}%")
		users << User.where('email LIKE ?', "%#{keyword}%")
	end
end