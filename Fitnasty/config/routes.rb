Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root 'home#index'

  post "/send_challenge" => 'challenges#send_challenge'
  get '/challenges/search/:keyword', to: 'challenges#search'
  get '/challenges/recent', to: 'challenges#recent'
  get '/challenges/trending', to: 'challenges#trending'
  get '/users/unfollow/:followee_id', to: 'users#unfollow'
  get '/users/follow/:followee_id', to: 'users#follow'

  get 'challenges/search/:keyword', to: 'challenges#search'
  get 'challenges/recent', to: 'challenges#recent'
  get 'challenges/trending', to: 'challenges#trending'
  get '/users/search/:keyword', to: 'users#search'
  get '/users/show_follow', to: 'users#show_follow'

  get '/user_challenges/:challenge_id', to: 'user_challenges#show'
  get '/trends' => "tags#trends", as: :trends

  post '/challenges' => "challenges#create"
  # resources :challenges
  get '/users/current' => "users#current", as: :current
  get '/users/single_user/:id' => "users#single_user", as: :single_user

  get "/home" => "home#index", as: :home
  get "/log_in" => "sessions#new"
  post "/log_in" => "sessions#create"
  get "/log_out" => "sessions#destroy", as: :log_out
  get '/profile' => "static#index", as: :profile
  get "/tabs" => "home#tabs"
  post "/accept_challenge" => "challenges#accept_challenge", as: :accept_challenge

  get '/map' => "home#map"

  resources :users

  get '/users/:user_id/created' => 'challenges#created', as: :created
  get '/users/:user_id/accepted' => 'challenges#accepted', as: :accepted
  get '/users/:user_id/pending' => 'challenges#pending', as: :pending
  get '/users/:user_id/completed' => 'challenges#completed', as: :completed
  get '/all_challenges' => 'challenges#all'
  get '/challenges/:challenge_id' => 'challenges#show', as: :show
end
