class InvitationMailer < ApplicationMailer
  def new_invitation_email
    @invitation = params[:invitation]

    @_sender = @invitation.sender

    mail(to: "#{@invitation.reciever}", subject: "#{@_sender} is inviting you!")
  end
end