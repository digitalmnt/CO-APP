Template.header.helpers({
	isAdmin: function() {
		if (Roles.userIsInRole(Meteor.user(), ["admin"])) {
			return true;
		} else {
			return false;
		}
	},
	activeIfTemplateIs: function (template) {
		var currentRoute = Router.current();
		return currentRoute && 
			template === currentRoute.lookupTemplate() ? 'active' : '';
	},
	/*activeRouteClass: function() {
		var args = Array.prototype.slice.call(arguments, 0);
		args.pop();
		
		var active = _.any(args, function(name) {
			return Router.current() && Router.current().route.name === name
		});
		return active && 'active';
	},*/
	logIn: function() {
		if (Meteor.user()) {
			return false;
		} else {
			return true;
		}
	},
	user: function() {
		return Meteor.user().username;
	}
	//Started making a header div that displays the login user's username
});
Template.header.events({
	'click #logout': function() {
		Meteor.logout(function(error) {
			if (error)
				throwError(error.reason)
		})
	}
});