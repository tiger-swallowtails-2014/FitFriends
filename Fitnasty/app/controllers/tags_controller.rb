class TagsController < ApplicationController

def trends
	trending_tags = Tag.top_ten_tags
	render json: trending_tags
end

end