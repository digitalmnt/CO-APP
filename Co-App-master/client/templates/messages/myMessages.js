Template.myMessages.helpers({
	messages: function() {
		return Messages.find();
	},
	noMessages: function() {
		//close!!!!!!!!
		var noMessages = Messages.find().count();
		console.log(noMessages);
		if (noMessages == 0) {
			return true;
		} 
	}
});
