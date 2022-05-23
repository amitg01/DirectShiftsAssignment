class InvitationMailer < ApplicationMailer
  def new_invitation_email
    @invitation = params[:invitation]

    @_sender = User.find_by(email: @invitation.sender)
    user_name = @_sender.first_name + @_sender.last_name

    mail(to: "#{@invitation.reciever}", subject: "#{user_name} is inviting you!")
  end
end