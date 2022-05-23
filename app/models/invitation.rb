class Invitation < ApplicationRecord
  before_save :add_invitation_link

  private

  def add_invitation_link
    self.link = generate_invite_link
  end

  def generate_invite_link
    "#{$host}/signup"
  end

end
