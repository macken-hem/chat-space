Rails.application.routes.draw do
  devise_for :users
  root to: 'messages#index'
  resources :groups, only: [:new, :create, :edit, :update] do
  resources :users, only: [:edit, :update]
  end
end
