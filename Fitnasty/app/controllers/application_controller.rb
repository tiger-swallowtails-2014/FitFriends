class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    # You want to be careful with this, not that this is wrong, but some
    # programmers might find it weird to realize that this isn't *just* a
    # lookup, it's a lookup with some very "special" or "magical" side-effects,
    # now there is an iVar called @current_user floating around.
    @current_user ||= User.find(session[:user_id])
  end
end

# consider the merits, occasionaly of writing things that QUERY only veruss
# things that STORE only.  Sometimes these two operations should happen in the
# same utterance, but sometimes they should be separate  -- just an idea.
#def show_dizzle
  #@current_user = resolve_current_user_from_session
#end
