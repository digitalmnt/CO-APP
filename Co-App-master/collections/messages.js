Messages = new Meteor.Collection('messages');
Messages.allow({
	update: docOwner,
	remove: docOwner
});
Messages.deny({
	update: function(userId, subject, message, fieldNames) {
		return (_.without(fieldNames, 'userId', 'subject', 'message').length > 0);
	}
})
validateMessage = function(message) {
	var errors = { };
	if(!message.subject)
		errors.subject = "Please add a subject";
	if(!message.body)
		errors.body = "Please add a message";
	return errors;
}
Meteor.methods({
	message: function(messageAttributes) {
		check(this.userId, String);
		check(messageAttributes["subject"], String);
		check(messageAttributes["body"], String);
		
		//var errors = validateMessage(messageAttributes);
		//if (errors.subject || errors.body)
			//throw new Meteor.Error('Invalid Message! Please enter the required information');
		
		
		var user = Meteor.user();
		var message = _.extend(_.pick(messageAttributes, 'subject', 'body', 'foodId', 'to', 'sentTo', 'sendTo'), {
			sentBy: user.username,
			submitted: new Date().getTime()
		});
		var messageId = Messages.insert(message);
		return messageId;
	}
});