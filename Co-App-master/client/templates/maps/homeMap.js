var map;
var addMarker = function(marker) {
	map.addLayer(marker);
}
var icon = L.icon({
	iconUrl: "Onion_512.png",
	iconSize: [30, 30]
});

var initialize = function (element, center, zoom) {
	map = L.map(element, {
		doubleClickZoom: true,
		zoomControl: true
		
	}).setView(new L.LatLng(center[0], center[1]), zoom);
	map.scrollWheelZoom.disable();
	map.zoomControl.setPosition('bottomleft');
	L.tileLayer.provider('Esri.NatGeoWorldMap').addTo(map);
}

Template.homeMap.rendered = function() {
	initialize($("#home-map")[0], [40.033516, -105.258860], 13);
	Food.find().observe({
		added: function(food) {
			var marker = new L.Marker(food.foodLocation, {
				id: food._id,
				icon: icon,
				title: food.title
			}).on('mouseover', function(e) {
				Session.set('fID', food._id);
				e.target.bindPopup('<b><a id="fLink">' + food.title + "</a><b>").openPopup();
			})
			addMarker(marker);
			
		}
	});
}
Template.homeMap.events({

	'click #fLink': function(id) {
		var foodId = Session.get('fID');
		console.log(foodId);
		Router.go('singleVeggie', {_id: foodId});
	}

	
});