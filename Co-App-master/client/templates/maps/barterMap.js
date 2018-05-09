var map;
var addMarker = function(marker) {
	map.addLayer(marker);
}
var icon = L.icon({
	iconUrl: "/fruit.png",
	iconSize: [30, 30]
});
var initialize = function(element, center, zoom) {
	map = L.map(element, {
		doubleClickZoom: false,
		touchZoom: false
	}).setView(new L.LatLng(center[0], center[1]), zoom)
	L.tileLayer.provider('Esri.NatGeoWorldMap').addTo(map);
}

Template.singleVeggieMap.rendered = function() {
	var veggie = Food.findOne();
	var loc = veggie.foodLocation;
	var locationArray = $.map(loc, function(el) { return el; });
	
	initialize($("#barter-map")[0], locationArray, 15);
	var marker = new L.Marker(veggie.foodLocation, {
		id: veggie._id,
		icon: icon
	});
	map.addLayer(marker);
}
	
	/*Food.findOne({_id: currentFoodId}).observe({
		added: function(food) {
			var marker = new L.Marker(food.veggieLocation, {
				id: food._id,
				icon: icon
			});
			addMarker(marker);
		}
	});*/

