class ChallengesController < ApplicationController

  def created
    # returns specific user's created challenges
    render json: add_challenge_info(User.find(params[:user_id]).challenges.to_a)
  end

  def accepted
    #returns specific user's accepted challenges
    render json: add_challenge_info(Challenge.accepted_challenges_for_user(params[:user_id]))
  end

  def accept_challenge
    challenge = session_user.user_challenges.find_or_create_by(challenge_id: params[:challenge_id])
    challenge.update_attributes(:accepted? => true)
    render :nothing => true
  end

  def create
    new_challenge = session_user.challenges.new(challenge_params)
    if new_challenge.save
      create_challenge_tags(new_challenge, params["challenge_tags"])
      session_user.user_challenges.create(challenge_id: new_challenge.id, accepted?: true)
      render json: new_challenge
    else
      render json: "There was a problem with saving your challenge."
    end
  end

  def recent
    render json: add_challenge_info(Challenge.order(:created_at).limit(10).flatten)
  end

  def show
    render json: add_challenge_info([Challenge.find(params[:challenge_id])].flatten)
  end

  def search
    render json: add_challenge_info(match_challenges(params[:keyword]).flatten)
  end
  
  def trending
    render json: add_challenge_info(Challenge.top_ten_challenges)
  end

  def all
    render json: Challenge.all
  end

  def send_challenge
    friends = params[:user_ids]
    friends.map do |friend|
      sent_challenges = User.find(friend).user_challenges.create(:challenge_id => params[:challenge_id])
    end
    redirect_to session_user
  end

  def pending
    render json: add_challenge_info(Challenge.pending_challenges_for_user(params[:user_id]))
  end

  def completed
    render json: add_challenge_info(Challenge.completed_challenges_for_user(params[:user_id]))
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def challenge_params
    params.require(:challenge).permit(:title, :location, :description, :image_url, :latitude, :longitude)
  end

  def session_user
    session_user = User.find(session[:user_id])
  end

  def create_challenge_tags(challenge, tags_string)
    tags = tags_string.split(", ")
    tags.each {|tag| challenge.tags.create(name: tag)}
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
    user = User.find(session[:user_id])
    challenge_array.map! do |challenge|
      matched_challenge = UserChallenge.where(challenge_id: challenge.id, user_id: user.id)
      if matched_challenge.length == 0
        accepted = false
        completed = false
      else
        accepted = matched_challenge.first.accepted?
        completed = matched_challenge.first.completed?
      end
      {challenge_object: challenge, challenge_user: challenge.user, challenge_tags: challenge.tags, accepted: accepted, completed: completed}
    end
    challenge_array
  end
end