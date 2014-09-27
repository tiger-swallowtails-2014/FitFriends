class ChallengesController < ApplicationController

  def index
    #returns specific users accepted challenges
    p params
    challenges = User.find(params[:user_id]).challenges
    render json: challenges
  end

  def create
    new_challenge = Challenge.new(challenge_params)
    # render :nothing => true
    if new_challenge.save
      render json: new_challenge
    else
      render json: "There was a problem with saving your challenge."
    end
  end

  def edit

  end

  def update

  end

  def show
    p params
    challenge = Challenge.find(params[:id])
    render json: challenge
  end

  def destroy

  end

  private
  def challenge_params
    params.require(:challenge).permit(:title, :location, :description, :image_url)
  end

end