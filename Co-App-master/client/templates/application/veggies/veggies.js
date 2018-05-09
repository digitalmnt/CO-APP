Template.veggies.onRendered(function() {
	/*if ($.cookie("pop") == null) {
	        $("#theModal").modal("show");
	    $.cookie("pop", "2");
	    }*/
	//if (Cookie.get('mcook') == null) {
	//	Cookie.set('mcook', 'yes', { expires: 7, path: '/' });
	console.log(this);
		$('#theModal').modal('show');
		//	}

	//Meteor.setTimeout(function() {
	//	$('#theModal').modal('hide');
	//}, 1000)
});

Template.veggies.helpers({
	veggie: function () {
		var clickId = Session.get('clickedVeggie');
		return Food.find({"_id": clickId});
	},
	veggieOwner: function() {
			return this.userId === Meteor.userId();
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
	id: function () {
		return this._id;
	} 
	
});
