Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  root 'home#index'
  get '/trends' => "tags#trends", as: :trends
  resources :challenges
  get '/users/current' => "users#current", as: :current



  get "/home" => "home#index", as: :home
  get "/log_in" => "sessions#new"
  post "/log_in" => "sessions#create"
  get "/log_out" => "sessions#destroy", as: :log_out
  get '/profile' => "static#index", as: :profile
  get "/tabs" => "home#tabs"
  post "/accept_challenge" => "challenges#accept_challenge", as: :accept_challenge

  get 'challenges/search/:keyword', to: 'challenges#search'
  get 'challenges/recent', to: 'challenges#recent'
  get 'challenges/trending', to: 'challenges#trending'


  get '/map' => "home#map"

  resources :users do
    resources :challenges, only: :index
  end

  # Example of regular route:
  get '/users/:user_id/accepted' => 'challenges#accepted', as: :accepted
end
