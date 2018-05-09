Template.veggieEdit.events({
	'submit form': function(e) {
		e.preventDefault();
		
		
		var foodLocation = Session.get("createCoords");
		var currentFoodId = this._id;
		var veggieAttributes = {
			title: $(e.target).find('[name=title]').val(),
			specifications: $(e.target).find('[name=specifications]').val(),
			quantity: $(e.target).find('[name=quantity]').val(),
			compensation: $(e.target).find('[name=compensation]').val(),
			foodLocation: foodLocation
		}
		
		var errors = validateVeggie(veggieAttributes);
		
		if (errors.title || errors.specifications)
			return Session.set('veggieSubmitErrors', errors);
		if (!foodLocation)	
			return throwError("Please enter a location");
			
		Food.update(currentFoodId, {$set: veggieAttributes}, function(error) {
			if (error) {
				throwErorr(error.reason);
			} else {
				Router.go('singleVeggie', {_id: currentFoodId});
			}
		});
	
		
		
		
	},
	'click .editLink': function() {
		$('.expandInput').show();
	}
});
Template.veggieEdit.helpers({
	donation: function () {
		return this.donation !== "TRUE";
	},
	errorMessage: function(field) {
		return Session.get('veggieSubmitErrors')[field];
	},
	errorClass: function(field) {
		return !!Session.get('veggieSubmitErrors')[field] ? 'has-error' : ' ';
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
	}
});
