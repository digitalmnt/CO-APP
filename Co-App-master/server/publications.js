Meteor.publish('publicFoodInfo', function() {
	return Food.find({},{fields: {_id: 1, title: 1, specifications: 1, quantity: 1, compensation: 1, donation: 1, foodLocation: 1, author: 1, submitted: 1}});
});
Meteor.publish('singleVeggie', function(id) {
	return id && Food.find(id);
});
Meteor.publish('singleMessage', function(id) {
	return id && Messages.find(id);
});
Meteor.publish('myMessages', function() {
	return Messages.find({to: this.userId});
});
/*Meteor.publish('pics', function() {
	return Images.find();
});*/