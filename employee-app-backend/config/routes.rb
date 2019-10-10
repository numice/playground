Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get '/campaigns', to: 'campaigns#show'
      post '/campaigns', to: 'campaigns#post'
      # match '/campaigns' => 'campaigns#show', via: :get
      # match '/campaigns' => 'campaigns#post', via: :post
    end
  end
end
