class InvitationsController < ApplicationController

  def create
    @invitation = Invitation.new(invitation_params)
    @invitation[:sender] = current_user.email

    if @invitation.save
      InvitationMailer.with(invitation: @invitation).new_invitation_email.deliver_later
      render json: { notice: 'Invitation sent successfully' }, status: :ok
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  private

  def invitation_params
    params.require(:invitation).permit(:reciever)
  end
end