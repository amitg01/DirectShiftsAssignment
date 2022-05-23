require 'test_helper'

class InvitationMailerTest < ActionMailer::TestCase
  test "reciever:string" do
    mail = InvitationMailer.reciever:string
    assert_equal "Reciever:string", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

  test "link:string" do
    mail = InvitationMailer.link:string
    assert_equal "Link:string", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
