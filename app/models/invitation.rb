class Invitation < ApplicationRecord
  before_save :add_sender_and_link

  private

  def add_sender_and_link
    self.link = generate_link
  end

  def generate_link
    "google.com"
  end

end
