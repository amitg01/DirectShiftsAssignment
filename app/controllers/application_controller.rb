class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_host

  protect_from_forgery with: :null_session

  respond_to :json


  protected

  def set_host
    $host = "http://#{request.host}:#{request.port}"
  end

  def configure_permitted_parameters
    attributes = [:first_name, :last_name]
    devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
  end
end
