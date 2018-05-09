/*Images = new FS.Collection("images", {
	stores: [new FS.StoreFileSystem("images", {path: "~/uploads"})]
});//REFFFFEERRRRRR TO DOCS  https://github.com/CollectionFS/Meteor-CollectionFS
Images.allow({
	insert: function(userId, file) {return userId && file.owner === this.userId},
	update: function(userId, files, fields, modifier) {
		return _.all(files, function(file) {
			return (userId == file.owner);
		});
	},
	remove: function(userId, files) {return false;}
});
/*
Feature not yet defined CollectionFS is still in development and this aspect is not yet working!!!!
Images.filter({
	allow: {
		contentTypes: ['image/*']
	}
});
*/