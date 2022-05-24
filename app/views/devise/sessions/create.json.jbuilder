json.user do |json|
  json.partial! 'users/user', user: current_user
end
json.set! :notice, 'logged in successfully'