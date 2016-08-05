Rails.application.routes.draw do
  
  #resources :agents
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#angular'

  post 'login', to: 'session#create'
  get 'user', to: 'session#get', format: :json
  delete 'logout', to: 'session#destroy'

  post 'users', to: 'users#create'
  post 'users/update', to: 'users#update'
  post 'users/delete', to: 'users#destroy'

  scope :format => true, :constraints => { :format => 'json' } do
    get 'agent_statuses' => 'agent_statuses#index'
    get 'queue' => 'queue_items#index'
    get 'teams' => 'teams#index'
    get 'states' => 'states#index'
    get 'contacts/today' => 'contacts#today'
    get 'contacts/stats' => 'contacts#stats'
    get 'queue/stats' => 'queue_items#stats'
    get 'agents' => 'agents#index'
    get 'users' => 'users#index'
    get 'personal' => 'personal_status#index'
  end

  get 'settings' => 'settings#get', format: :json
  post 'settings' => 'settings#update', format: :json

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
