function createMapWin(params) {
	var win = Ti.UI.createWindow({
		title : 'Map'
	});

	var userLat,
	    userLng;
	
	var destLat = params.latitude,
		destLng = params.longitude;

	Ti.Geolocation.getCurrentPosition(function(e) {
		if (e.error) {
			alert('Cannot get your device location');
			return;
		} else {
			userLat = e.coords.latitude;
			userLng = e.coords.longitude;
			createMap();
		}
	});

	function createMap() {

		var Map = require('ti.map');

		var annotation = Map.createAnnotation({
			latitude : destLat,
			longitude : destLng,
			title : 'Code To Inspire',
			subtitle : 'Herat, Afghanistan',
			animate : true,
			leftButton : 'cti.png',
		});

		var mapview = Map.createView({
			mapType : Map.NORMAL_TYPE,
			region : {
				latitude : destLat,
				longitude : destLng,
				latitudeDelta : 0.02,
				longitudeDelta : 0.02,
			},
			animate : true,
			regionFit : true,
			userLocation : true,
			annotations : [annotation]
		});

		win.add(mapview);
	}


	win.addEventListener('open', function(e) {
		if (!Ti.Geolocation.hasLocationPermissions()) {
			Ti.Geolocation.requestLocationPermissions();
		}
	});

	return win;
}

exports.createMapWin = createMapWin;
