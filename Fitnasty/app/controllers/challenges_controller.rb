class ChallengesController < ApplicationController

  def index
    #returns specific users accepted challenges
    p params
    challenges = User.find(params[:user_id]).challenges
    render json: challenges
  end

  def create

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


end