Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"

  root 'static#index'

  resources :users do
    resources :challenges
  end

  get "/log_in" => "sessions#new"
  post "/log_in" => "sessions#create"
  get "/log_out" => "sessions#destroy", as: :log_out
end
