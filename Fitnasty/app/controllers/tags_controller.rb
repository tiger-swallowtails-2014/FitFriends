class TagsController < ApplicationController

def trends
	render json: Tag.top_ten_tags
end

end