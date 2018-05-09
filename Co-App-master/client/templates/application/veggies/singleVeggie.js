Template.singleVeggie.helpers({
	veggieOwner: function() {
		return this.userId === Meteor.userId();
	},
	edit: function() {
		console.log(Meteor.user());
		if (Meteor.user().username === this.author) {
			
			return false;
		} else {
			return true;
		}
	},
	barter: function () {
		if (this.compensation === "") {
			console.log(this.compensation);
			return false;
		} else {
			return true;
		}
	},
	donation: function () {
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
	}
});