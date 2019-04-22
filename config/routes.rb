Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :quotes
  resources :boards
    patch '/update_winner', to: 'boards#update_winner'

  root "static_pages#root"

end
