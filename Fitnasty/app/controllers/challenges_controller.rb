class ChallengesController < ApplicationController

  def index
    # returns specific users created challenges
    accepted_challenges = Challenge.accepted_challenges_for_user(params[:user_id])
    # I think the .flatten goes into the scope's calculation, then this thing
    # is mad beautiful.
    #
    # One line methods are the songs of angels
    #
    # The refactoring afoot here is called REMOVE TEMP VARIABLE.  The
    # accepted_challenges variable is the temp that's not adding a lot
    # of information
    #render json: add_challenge_info(Challenge.accepted_challenges_for_user(params[:user_id]))
    render json: add_challenge_info(accepted_challenges.flatten)
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
    user = User.find(session[:user_id])
    new_challenge = user.challenges.new(challenge_params)
    if new_challenge.save
      user.user_challenges.create(challenge_id: new_challenge.id, accepted?: true)
      render json: new_challenge
    else
      render json: "There was a problem with saving your challenge."
    end
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
    matched_challenges = match_challenges(keyword).flatten

    render json: add_challenge_info(matched_challenges)
  end


  def trending
    render json: add_challenge_info(Challenge.top_ten_challenges)
  end

  def all
    render json: Challenge.all
  end

  private
  def challenge_params
    params.require(:challenge).permit(:title, :location, :description, :image_url, :latitude, :longitude)
  end

  # Here's my question, what's acutally being operated on mostly in this
  # method?
  #
  # Why isn't this a scope on Challenge?
  #
  # Challenge.with_tags_matching(keyword)

  def match_challenges(keyword)
    (challenges_for_tag + challenges_matching_keyword(keyword)).flatten
    (challenges_for_tag(keyword) + Challenge.challenges_matching_keyword(keyword)).flatten
  end

  def challenges_for_tag
    tag = Tag.where(name: keyword).first # why not use find? or find_by
    Array(tag.challenges)
  end

  def challenges_matching_keyword(keyword)
    # This can easily become a scope...
    # challenges = []
    # challenges << Challenge.where('description LIKE ?', "%#{keyword}%")
    # challenges << Challenge.where('title LIKE ?', "%#{keyword}%")
    # challenges << Challenge.where('location LIKE ?', "%#{keyword}%")
    #
    # or, once it's moved onto the model, it becomes a one-line method
    #
    # ...but then since it's a one line method, why not bubble that up
    # into # match_challenges
  end

  def add_challenge_info(challenge_array)
    user = User.find(session[:user_id])
    challenge_array.map! do |challenge|
      # Probably an opportunity to use a scope.....
      # Challenge.challenges_issued_by_user(some_user) or
      # Challenge.challenges_accepteb_by_user(some_user)_
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


    # def add_challenge_info(challenges)
    #   user = current_user
    #   challenge_array.map do |challenge|
    #     acceptance_and_completion = if Challenge.where_issued_by(user.id).empty?
    #       {accepted: false, completed: false}
    #     else
    #       {accepted: false, completed: false}
    #     end
    #     ChallengePresenter.new(acceptance_and_completion, challenge).to_json
    #   end
    # end

    # class ChallengePresenter(acceptance_and_completion, challenge)
    #   def initialize(...)
    #   end

    #   def to_json
    #   end
    # end

  end
end
