class ChallengesController < ApplicationController

  def index
    # returns specific users created challenges
    accepted_challenges = Challenge.accepted_challenges_for_user(params[:user_id])
    render json: add_challenge_info(accepted_challenges.flatten)
  end

  def accepted
    #returns specific users accepted challenges
    accepted_challenges = Challenge.accepted_challenges_for_user(params[:user_id])
    render json: add_challenge_info(accepted_challenges.flatten)
  end

  def accept_challenge
    user = User.find(session[:user_id])
    comp = user.user_challenges.where(challenge_id: params[:challenge_id])
    if comp != []
      p comp
      comp[0].update_attributes(completed?: true)
      render json: {answer:'completed', texts: "Completed!"}
      return
    end
    user.user_challenges.create(challenge_id: params[:challenge_id], accepted?: true)
    render json: {answer: 'accepted', texts: "Challenge Accepted!"}
  end

  def create
    user = User.find(session[:user_id])
    new_challenge = user.challenges.new(challenge_params)
    if new_challenge.save
      create_challenge_tags(new_challenge, params["challenge_tags"])
      user.user_challenges.create(challenge_id: new_challenge.id, accepted?: true)
      render json: new_challenge
    else
      render json: "There was a problem with saving your challenge."
    end
  end

  def create_challenge_tags(challenge, tags_string)
    tags = tags_string.split(", ")
    tags.each {|tag| challenge.tags.create(name: tag)}
  end

  def edit
  end

  def update
  end

  def recent
    ordered_date = Challenge.order(:created_at).limit(10).flatten
    render json: add_challenge_info(ordered_date)
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
    p "MATCHED CHALLENGES:"
    p matched_challenges

    render json: add_challenge_info(matched_challenges)
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
    user = User.find(session[:user_id])
    redirect_to user
  end

  def pending
    pending_challenges = Challenge.pending_challenges_for_user(params[:user_id])
    render json: add_challenge_info(pending_challenges.flatten)
  end

  def completed
    completed_challenges = Challenge.completed_challenges_for_user(params[:user_id])
    render json: add_challenge_info(completed_challenges.flatten)
  end

  private
  def challenge_params
    params.require(:challenge).permit(:title, :location, :description, :image_url, :latitude, :longitude)
  end

  def match_challenges(keyword)
    tag = Tag.where(name: keyword).first
    challenges = []
    challenges << tag.challenges unless tag == nil
    challenges << Challenge.where('description LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('title LIKE ?', "%#{keyword}%")
    challenges << Challenge.where('location LIKE ?', "%#{keyword}%")
    if challenges.flatten.uniq
      challenges.flatten.uniq
    else
      []
    end
  end

  def add_challenge_info(challenge_array)
    user = User.find(session[:user_id])
    challenge_array.map! do |challenge|
      matched_challenge = UserChallenge.where(challenge_id: challenge.id, user_id: user.id)
      if matched_challenge.length == 0
        accepted = false
        completed = false
      else
        accepted = true
        completed = matched_challenge.first.completed?
      end
      {challenge_object: challenge, challenge_user: challenge.user, challenge_tags: challenge.tags, accepted: accepted, completed: completed}
    end
    challenge_array
  end
end