var bart, donat;
Template.veggieSubmit.rendered = function () {
	$('.barterExpand').hide();
	$('.donationExpand').hide();
	
};
Template.veggieSubmit.events({
	'click .buttonBarter': function(e) {
		e.preventDefault();
		$('.barterExpand').show();
		$('.buttonBarter').addClass('btn-success');
		$('.buttonNoBarter').removeClass('btn-success');
		$('.donationExpand').hide();
		bart = $(e.target).find('[name=buttonBarter]').val();
	},
	'click .buttonNoBarter': function(e) {
		e.preventDefault();
		$('.buttonNoBarter').addClass('btn-success');
		$('.barterExpand').hide();
		$('.buttonBarter').removeClass('btn-success');
		$('.donationExpand').show();
	},
	'submit form': function(e) {
		e.preventDefault();
		
		var foodLocation = Session.get("createCoords");
		
		var food = {
			title: $(e.target).find('[name=title]').val(),
			specifications: $(e.target).find('[name=specifications]').val(),
			quantity: $(e.target).find('[name=quantity]').val(),
			compensation: $(e.target).find('[name=compensation]').val(),
			donation: $(e.target).find('[name=donation]').val(),
			foodLocation: foodLocation,
			image: $(e.target).find('[name=image]').val()
		};
		
		var errors = validateVeggie(food);
		
		if (errors.title || errors.specifications)
			return Session.set('veggieSubmitErrors', errors);
		if (errors.donation || errors.compensation) {}
			Session.set('veggieSubmitErrors', errors);
		if (!foodLocation)	
			return throwError("Please enter a location");
			
			
		Meteor.call('veggie', food, function(error, id) {
			if (error) {
				throwError(error.reason);
			} else {
				Router.go('singleVeggie', { _id: id } );
			}
		});
	}
});
Template.veggieSubmit.created = function (){
	Session.set('veggieSubmitErrors', {});
};
Template.veggieSubmit.helpers({
	errorMessage: function(field) {
		return Session.get('veggieSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('veggieSubmitErrors')[field] ? 'has-error' : ' ';
	}
});


