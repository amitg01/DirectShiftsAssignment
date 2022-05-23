# Preview all emails at http://localhost:3000/rails/mailers/invitation_mailer
class InvitationMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/invitation_mailer/reciever:string
  def reciever:string
    InvitationMailer.reciever:string
  end

  # Preview this email at http://localhost:3000/rails/mailers/invitation_mailer/link:string
  def link:string
    InvitationMailer.link:string
  end

end
