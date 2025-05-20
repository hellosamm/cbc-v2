Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
}

  namespace :api do
    namespace :v1 do
      resources :attendees, only: [:create, :destroy, :index]
      get "user_events", to: "attendees#show"
      get "/event/:event_id/attendee", to: "attendees#index", as: "event_attendees"
      get "/event/:event_id/allAttendees", to: "attendees#list", as: "all_attendees"
      resources :events do
        get 'attendance_status', on: :member
      end
      resources :users, only: [:update]
    end
  end

  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check
  

  # Defines the root path route ("/")
  # root "posts#index"
end
