Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading'
});
Router.map(function() {
	this.route('veggies', {
		path: '/',
		waitOn: function() {
			return Meteor.subscribe('publicFoodInfo');
		},
		data: function() { return {food: Food.find()} }
	});
	this.route('singleVeggie', {
		path: '/veggie/:_id',
		waitOn: function() {
			return Meteor.subscribe('singleVeggie', this.params._id);// , Meteor.subscribe('pics')]
		}, 
		data: function () {
			return Food.findOne(this.params._id);
		}
	})
	this.route('veggieSubmit', {
		path: '/submit'
	});
	this.route('veggieEdit', {
		path: '/veggie/edit/:_id',
		waitOn: function() {
			return Meteor.subscribe('singleVeggie', this.params._id);
		},
		data: function () {
			return Food.findOne(this.params._id);
		}
	});
	this.route('veggieBarter', {
		path: '/barter/:_id',
		waitOn: function() {
			return Meteor.subscribe('singleVeggie', this.params._id);
		},
		data: function () {
			return Food.findOne(this.params._id);
		}
	});
	this.route('message', {
		path:'/message/:_id',
		waitOn: function() {
			return Meteor.subscribe('singleMessage', this.params._id)
		},
		data: function() {
			return Messages.findOne(this.params._id);
		}
	});
	this.route('myMessages', {
		path:'/mymessages',
		waitOn: function() {
			return Meteor.subscribe('myMessages', this.params._id);
		}
	});
	this.route('login', {
		path: '/login'
	});
	this.route('register', {
		path: '/register'
	});
	this.route('contact');
	this.route('privacy');
	this.route('ack');
	
	/*this.route('reset', {
		path: '/reset'
	});
	this.route('verifyEmail', {
		controller: 'AccountController',
		path: '/verify-email/:token',
		action: 'verifyEmail'
	});
	this.route('verified', {
		path: '/verified',
		template: 'verified'
	});
	this.route('checkEmail', {
		path: '/checkemail',
		template: 'checkEmail'
	})*/
});
AccountController = RouteController.extend({
	verifyEmail: function() {
		Accounts.verifyEmail(this.params.token, function() {
			Router.go('verified');
		});
	}
});
var requireLogin = function() {
	if (! Meteor.user() || Meteor.loggingIn()) {
		this.render('accessDenied');
	} else {
		this.next();
	}
	
}
/*
var setFooter = function() {
	var route = this.route.name;
	var routes = ['veggies'];
	if (_.contains(routes, route) {
		
	})
}*/
if (Meteor.isClient) {
	Router.onBeforeAction('loading');
	Router.onBeforeAction(requireLogin, {only: 'veggieSubmit' && 'veggieEdit' && 'veggieBarter' && 'myMessages' && 'message'});
}



//Router.onBeforeAction(requireLogin, {only: 'veggieSubmit'})

//remember to remove insecure
