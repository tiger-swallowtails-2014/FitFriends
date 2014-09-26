class ChallengesController < ApplicationController

  def index
    #returns specific users accepted challenges
    p params
    challenges = User.find(params[:user_id]).challenges
    render json: challenges
  end

  def accepted
    user_challenges = User.find(params[:user_id]).user_challenges.where(accepted?: true)
    accepted_challenges = user_challenges.map do |user_challenge| Challenge.find(user_challenge.challenge_id) end
    render json: accepted_challenges
  end

  def create

  end

  def edit

  end

  def update

  end

  def show
    challenge = Challenge.find(params[:id])
    render json: challenge
  end

  def destroy

  end

  def search
    keyword = params[:keyword]
    matched_challenges = match_challenges(keyword)

    render json: matched_challenges.flatten
  end

  private
  def match_challenges(keyword)
    tag = Tag.where(name: keyword).first
    challenges = []
    challenges << tag.challenges unless tag == nil
    challenges << Challenge.where('description LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('title LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('location LIKE ?', "%#{keyword}%")
  end
end