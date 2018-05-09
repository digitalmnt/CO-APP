process.env.MAIL_URL="smtp://the.one.and.only.co.app%40gmail.com:TheCoApp@smtp.gmail.com:465/";
Meteor.methods({
	//!!!!!!!!!!Close look at this to figure it out more!!!! I think I need to re-configure Email login
	sendEmail: function(to, from, subject, text) {
		check([to, from, subject], [String]);
		
		
		
		//Will need to do more checking!!!!!Limit number of email sent by user i.e. meteor docs
		this.unblock();
		Email.send({
			to: to,
			from: from,
			subject: "You have a new message from a fellow CO-APP user: " + subject,
			text: text[1] + " says: " + text[0]
		});
	}
});