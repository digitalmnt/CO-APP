var user = { };
Template.register.events({
	'submit form': function(e, t) {
		e.preventDefault();
		user = {
			email: $(e.target).find('[name=email]').val(),
			username: $(e.target).find('[name=username]').val(),
			password: $(e.target).find('[name=password]').val()
		};
		
		var errors = validateUser(user);
		if (errors.email || errors.username || errors.password)
			return Session.set('registerSubmitErrors', errors);
		
		
		
		var trimInput = function(input) {
			return input.replace(/^\s*|\s*$/g, "");
		}
		trimInput(user["email"]);
		trimInput(user["username"]);
		
		var isValidPassword = function(input) {
			return input.length >= 6 ? true : false;
		}
		
		isValidPassword(user["password"]);
		
		Accounts.createUser(user, function(error) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('veggies');
				//Router.go('checkEmail');
			}
		});
		
		
		//next setiup email verification and lost password
	}
});
Template.register.created = function (){
	Session.set('registerSubmitErrors', {});
};
Template.register.helpers({
	errorMessage: function(field) {
		return Session.get('registerSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('registerSubmitErrors')[field] ? 'has-error' : ' ';
	}
});