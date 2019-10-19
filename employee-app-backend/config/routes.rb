Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  defaults format: :json do
    get '/campaigns', to: 'campaigns#get'
    post '/campaigns', to: 'campaigns#post'
    # match '/campaigns' => 'campaigns#show', via: :get
    # match '/campaigns' => 'campaigns#post', via: :post
  end
end
