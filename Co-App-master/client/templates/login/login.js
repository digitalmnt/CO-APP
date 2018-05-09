Template.login.events({
	'submit form': function(e) {
		e.preventDefault();
		var user = {
			username: $(e.target).find('[name=username]').val(),
			password: $(e.target).find('[name=password]').val()
		};
		var errors = validateUser(user);
		if (errors.username || errors.password)
			return Session.set('registerSubmitErrors', errors);
			
		var trimInput = function(input) {
			return input.replace(/^\s*|\s*$/g, "");
		}
		trimInput(user["username"]);
		
		var isValidPassword = function(input) {
			return input.length >= 6 ? true : false;
		}
		isValidPassword(user["password"]);
		
		Meteor.loginWithPassword(user["username"], user["password"], function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('veggies');
			}
		});
		
	}
		
});
Template.login.created = function (){
	Session.set('registerSubmitErrors', {});
};
Template.login.helpers({
	errorMessage: function(field) {
		return Session.get('registerSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('registerSubmitErrors')[field] ? 'has-error' : ' ';
	}
});