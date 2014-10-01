class UserChallengesController < ApplicationController
  def show
    chart_data = UserChallenge.where(challenge_id: params[:challenge_id])
      accepted = 0
      completed = 0
      pending = 0
    chart_data.each do |instance|
      if instance.accepted? == false && instance.completed? == false
        pending += 1
      elsif instance.accepted? && instance.completed?
        completed += 1
      elsif instance.accepted? && instance.completed? == false
        accepted += 1
      end
    end
    render_data = {accepted: accepted, completed: completed, pending: pending}
    render json: render_data
  end
end