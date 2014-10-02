# describe "Challenge Functionality" do
#   let!(:challenge) { create :challenge }
#   let!(:user) { create :user }

#   describe "Creating a new challenge flow" do
#     before(:each) do
#       session[:user_id] = user.id
#     end

#     it "creates a new question with valid question params" do
#       visit user_path
#       click_on 'Create'
#       fill_in 'Title', :with => 'Challenge'
#       fill_in 'Description', :with => 'some content'
#       fill_in 'Image URL', :with => 'google.com'
#       fill_in 'Address', :with => '1234 A street'
#       fill_in 'Tags', :with => 'run, jump'
#       click_button('Create')
#       expect(page).to have_content 'Challenge Created!'
#     end
#   end