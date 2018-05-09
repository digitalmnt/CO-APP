if (Accounts._resetPasswordToken) {
	Session.set('resetPassword', Accounts._resetPasswordToken);
}
Template.reset.events({
	'submit #recovery-form': function(e) {
		e.preventDefault();
		var email = $(e.target).find('[name=recover-email]').val();
		
		var errors = validateEmail(email);
		if(errors)
			return Session.set('resetSubmitErrors', errors);
		var trimInput = function(input) {
			return input.replace(/^\s*|\s*$/g, "");
		}
		if (trimInput(email)) {
			Accounts.forgotPassword({email: email}, function(error) {
				if (error) {
					thowError("We were unable to send your email please try again");
				} else {
					throwGoodError("Email has been sent. Please check your email and get on back here");
				}
			});
		}
	},
	'submit #new-password': function(e) {
		e.preventDefault();
		var password = $(e.target).find('[name=new-password]').val();
		
		var errors = validateEmail(password);
		if(errors)
			return Session.set('resetSubmitErrors', errors);
		if(trimInput(password)) {
			Accounts.resetPassword(Session.get('resetPassword'), password, function(error) {
				if (error) {
					throwError(error.reason);
				} else {
					Session.set('resetPassword', null);
				}
			});
		} 
	}
});
Template.reset.created = function () {
	Session.set('resetSubmitErrors', {});
};
Template.reset.helpers({
	resetPassword: function(t) {
		return Session.get('resetPassword');
	},
	errorMessage: function(field) {
		return Session.get('resetSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('resetSubmitErrors')[field] ? 'has-error' : ' ';
	}
});