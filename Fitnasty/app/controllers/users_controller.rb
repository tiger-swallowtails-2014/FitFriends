class UsersController < ApplicationController

	def index
		render json: User.all
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
		@signed_in_user = User.find(session[:user_id])
		@accepted_folowee_challenges = UserChallenge.accepted.where(user_id: User.first.followees.to_a.map! do |followee| followee.id end).order(updated_at: :desc)
	end

	def single_user
		render json: User.find(params[:id])
	end

	def search
		matched_users = match_users(params[:keyword])
		render :partial => 'user_results', locals: {users: matched_users}
	end

	def show_follow
		user = User.find(params[:user_id])
		render :partial => 'follow', locals: {user: user}
	end

	def unfollow
		user = User.find(session[:user_id])
		followee = User.find(params[:followee_id])
		Follow.find_by(follower_id: user.id, followee_id: followee.id).delete
		redirect_to user
	end

	def follow
		user = User.find(session[:user_id])
		followee = User.find(params[:followee_id])
		user.followees << followee
		redirect_to user
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
		users.flatten.uniq
	end
end