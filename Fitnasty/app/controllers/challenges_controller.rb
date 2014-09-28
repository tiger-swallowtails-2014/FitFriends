class ChallengesController < ApplicationController

  def index
    #returns specific users created challenges
    challenges = User.find(params[:user_id]).challenges
    render json: challenges
  end

  def accepted
    #returns specific users accepted challenges
    accepted_challenges = Challenge.accepted_challenges_for_user(params[:user_id])
    render json: add_challenge_info(accepted_challenges.flatten)
  end

  def accept_challenge
    user = User.find(session[:user_id])
    user.user_challenges.create(challenge_id: params[:challenge_id], accepted?: true)

    render :nothing => true
  end

  def create
    new_challenge = Challenge.new(challenge_params)
    p "here is the challenge"
    p new_challenge
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
    challenge = Challenge.find(params[:id])
    render json: challenge
  end

  def destroy
  end


  def search
    keyword = params[:keyword]
    matched_challenges = match_challenges(keyword).flatten

    render json: add_challenge_info(matched_challenges)
  end

  private
  def challenge_params
    params.require(:challenge).permit(:title, :location, :description, :image_url)
  end

  def match_challenges(keyword)
    tag = Tag.where(name: keyword).first
    challenges = []
    challenges << tag.challenges unless tag == nil
    challenges << Challenge.where('description LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('title LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('location LIKE ?', "%#{keyword}%")
  end

  def add_challenge_info(challenge_array)
    challenge_array.map! do |challenge|
      {challenge_object: challenge, challenge_user: challenge.user, challenge_tags: challenge.tags}
    end
    challenge_array
  end
end