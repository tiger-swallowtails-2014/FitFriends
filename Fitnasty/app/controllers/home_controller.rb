class HomeController < ApplicationController

  def index
    @recent_challenges = Challenge.order('created_at DESC').limit(10)
    @first_recent = @recent_challenges[0]
  end

  def tabs
  end

  def map
  end

end