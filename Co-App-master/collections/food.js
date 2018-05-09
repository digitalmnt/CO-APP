Food = new Meteor.Collection('foods');

Food.allow({
	update: docOwner,
	remove: docOwner
});
Food.deny({
	update: function(userId, title, specifications, foodLocation, fieldNames) {
		return (_.without(fieldNames, 'title', 'specifications', 'foodLocation').length > 0);
	}
});
validateVeggie = function(food) {
	var errors = { };
	if (!food.title)
		errors.title = "Please fill the type of food";
	if (!food.specifications)
		errors.specifications = "Please tell us a little bit about your submission";
	if (!food.donation)
		errors.donation = "Please fill in donation instructions";
	if (!food.compensation)
		errors.compensation = "Please fill in compensation instructions";
	return errors;
}
Meteor.methods({
	veggie: function(veggieAttributes) {
		check(this.userId, String);
		check(veggieAttributes["title"], String);
		check(veggieAttributes["specifications"], String);
		check(veggieAttributes["title"], String);
		check(veggieAttributes["compensation"], String);
		check(veggieAttributes["donation"], String);
		
		var errors = validateVeggie(veggieAttributes);
		if (errors.title || errors.specifications || errors.foodLocation)
			throw new Meteor.Error('Invalid Veggie', "You must set a title, specifications, and location of your veggie"); 
		
		
		var user = Meteor.user();
		console.log(user);
		var veggie = _.extend(_.pick(veggieAttributes, 'title', 'specifications', 'quantity', 'compensation', 'donation', 'foodLocation'), {
			userId: user._id,
			author: user.username,
			authorEmail: user.emails[0],
			submitted: new Date().getTime()
		});
		/*var image = veggieAttributes.image;
		console.log(Images);
		var imageId = Images.storeFiles(image);//Options to store Meta Data about the image http://raix.github.io/Meteor-CollectionFS/
		*/
		var veggieId = Food.insert(veggie);
		return veggieId; //, imageId
	}
});
