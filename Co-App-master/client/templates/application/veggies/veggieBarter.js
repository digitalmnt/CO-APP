var message = { };
Template.veggieBarter.events({
	'submit form': function(e) {
		e.preventDefault();
		
		var currentFoodId = this._id;
		message = {
			to: this.userId,
			sentTo: this.author,
			sendTo: this.authorEmail["address"],
			foodId: currentFoodId,
			subject: $(e.target).find('[name=subject]').val(),
			body: $(e.target).find('[name=body]').val(),
		}
		var errors = validateMessage(message);
		if (errors.subject || errors.body)
			return Session.set('messageSubmitErrors', errors);
		var user = Meteor.user();
		Meteor.call('message', message, function(error, id, message) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('message', {_id: id});
			}
		});
		Meteor.call('sendEmail', message["sendTo"], user.username, message["subject"], [message["body"], user.username], function(error) {
			if (error)
				return throwError(error.reason);
		});
		
	}
});
Template.veggieBarter.created = function (){
	Session.set('messageSubmitErrors', {});
};
Template.veggieBarter.helpers({
	errorMessage: function(field) {
		return Session.get('messageSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('messageSubmitErrors')[field] ? 'has-error' : ' ';
	},
	time: function () {
		var date = new Date(this.submitted);
		var month = new Array();
		month[0] = "January";
		month[1] = "February";
		month[2] = "March";
		month[3] = "April";
		month[4] = "May";
		month[5] = "June";
		month[6] = "July";
		month[7] = "August";
		month[8] = "September";
		month[9] = "October";
		month[10] = "November";
		month[11] = "December";
		var monthLiteral = month[date.getMonth()];
		var th = new Array();
		th[0] = "st";
		th[1] = "nd";
		th[2] = "rd";
		for (i = 4; i < 31; i++) {
			th[i] = "th";
		}
		var ending = th[date.getDate()];
		var day = date.getDate();
		var time = monthLiteral + " " + day + ending;
		return time;
	},
	donationInput: function () {
		if (this.compensation === "") {
			return false;
		} else {
			return true;
		}
	},
	compensationInput: function () {
		if (this.donation === "") {
			return false;
		} else {
			return true;
		}
	}
});