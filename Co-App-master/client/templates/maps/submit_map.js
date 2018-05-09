var map, markers = { }
var initialize = function (element, center, zoom) {
	map = L.map(element, {
		doubleClickZoom: false,
		touchZoom: false
	}).setView(new L.LatLng(center[0], center[1]), zoom);
	L.tileLayer.provider('Esri.NatGeoWorldMap').addTo(map);
}
var createVeggieLocation = function(latlng) {
	Session.set("createCoords", latlng);
}

var addPopup = function(e) {
	var popup = L.popup();
	popup
		.setLatLng(e.latlng)
		.addTo(map)
		.setContent("Food Location?")
}
Template.submitMap.rendered = function(e) {
	initialize($('#map_submit')[0], [40.007092, -105.203242], 10);
	map.on('dblclick', function(e){
		addPopup(e);
		return createVeggieLocation(e.latlng);
	});
}