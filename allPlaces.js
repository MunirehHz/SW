

function allPlaces(categoryName, provinceId) {
	var drawerMenu = require('com.tripvi.drawerlayout');
	var menu = require('/navigationMenu');

	var win = Ti.UI.createWindow({
		backgroundColor : "#eee",
		orientationModes : [Ti.UI.PORTRAIT],
		layout : 'vertical',
		title : categoryName,
	});

	var mainView = Ti.UI.createView({
		width : "100%",
		height : "100%",
		layout : "vertical"
	});
	var placeContainer = Ti.UI.createScrollView({
		width : "100%",
		height : "92%",
		layout : "vertical",
		top : 0
	});
	var drawer = drawerMenu.createDrawer({
		leftView : menu,
		centerView : mainView
	});

	var buttonContainer = Ti.UI.createView({
		layout : "horizontal",
		width : Ti.UI.FILL,
		bottom : 0,
		height : "8%"
	});



	var amusingView = Ti.UI.createView({
		width : "25%",
		backgroundColor : "#eee",
		layout:"vertical",
	});

	var amusingIcon = Ti.UI.createImageView({
		image : "/images/parkGreen.png",
	height:"50%",
		top:"5dp",
	});
	var parkLable =Ti.UI.createLabel({
		text:"Park",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"#4eaba1",
		top:"3dp",
	});
	amusingView.add(amusingIcon);
	amusingView.add(parkLable);

	var historicalView = Ti.UI.createView({
		width : "25%",
		backgroundColor : "#eee",
		layout:"vertical",
	});

	var historicalIcon = Ti.UI.createImageView({
		image : "/images/historicalGreen.png",
		height:"50%",
		top:"5dp",
	});
	var historicalLable =Ti.UI.createLabel({
		text:"Historical",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"#4eaba1",
		top:"3dp",
	});
	
	historicalView.add(historicalIcon);
	historicalView.add(historicalLable);
	
	var hotelView = Ti.UI.createView({
		width : "25%",
		backgroundColor : "#eee",
		layout:"vertical",
	});

	var hotelIcon = Ti.UI.createImageView({
		image : "/images/hotelGreen.png",
		height:"50%",
		top:"5dp",
	});
	var hotelLable =Ti.UI.createLabel({
		text:"Hotel",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"#4eaba1",
		top:"3dp",
	});
	

	hotelView.add(hotelIcon);
	hotelView.add(hotelLable);

	var restuarantView = Ti.UI.createView({
		width : "25%",
		backgroundColor : "#eee",
		layout:"vertical",
	});

	var restuarntIcon = Ti.UI.createImageView({
		image : "/images/restuarantGreen.png",
		height:"50%",
		top:"5dp",
	});
		var restuarntLable =Ti.UI.createLabel({
		text:"Restuarnt",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"#4eaba1",
		top:"3dp",
	});
	
	restuarantView.add(restuarntIcon);
	restuarantView.add(restuarntLable);
	
	buttonContainer.add(amusingView);
	buttonContainer.add(historicalView);
	buttonContainer.add(hotelView);
	buttonContainer.add(restuarantView);

	var tempView;
	var tempIcon;
	var tempImage;
	var tempLabel;
	amusingView.addEventListener("click", function(e) {
		list("amusing", provinceId);
	});

	historicalView.addEventListener("click", function(e) {
		list("historical", provinceId);
	});

	hotelView.addEventListener("click", function(e) {
		list("hotel", provinceId);
	});

	restuarantView.addEventListener("click", function(e) {
		list("restaurant", provinceId);
	});
	function list(category, province) {
		placeContainer.removeAllChildren();
		var listOfPlaces = db.execute("select * from " + category + " where province_id = ?", province);
		while (listOfPlaces.isValidRow()) {

			var placeView = Ti.UI.Android.createCardView({
				width : "95%",
				height : Ti.UI.SIZE,
				top : "10dp",
			});

			var img = db.execute("select * from images where category_name = ? and province_id = ? and place_id = ? limit 1", category, province, listOfPlaces.fieldByName('id'));
			var placeImage = Ti.UI.createImageView({
				image : "/images/photos/" + img.fieldByName('name'),
				width : Ti.UI.FILL,
				height : "200dp",
				id : listOfPlaces.fieldByName('id')
			});

			var nameView = Ti.UI.createView({
				backgroundColor : "#801c6e60",
				width : "100%",
				height : "30dp",
				bottom : 0
			});

			var placeName = Ti.UI.createLabel({
				text : listOfPlaces.fieldByName('name'),
				color : "white",
				font : {
					fontWeight : "bold",
					fontSize : "15dp",
					fontFamily:"CaviarDreams_Bold",
				},
				left : "20dp"
			});
			switch(category) {
			case "hotel":
				changeImage(category, hotelView, hotelIcon,hotelLable);
				break;
			case "restaurant":
				changeImage(category, restuarantView, restuarntIcon,restuarntLable);
				break;
			case "historical":
				changeImage(category, historicalView, historicalIcon,historicalLable);
				break;
			case "amusing":
				changeImage(category, amusingView, amusingIcon,parkLable);
				break;
			}

			placeView.add(placeImage);
			nameView.add(placeName);
			placeView.add(nameView);
			placeContainer.add(placeView);

			placeImage.addEventListener('click', function(e) {
				var detailsPage = require('/detials');
				var details = detailsPage.details(e.source.id, province, category);
				details.open();
			});
			listOfPlaces.next();
		}
	}

	function changeImage(category, view, icon,label) {
		if (tempView != null && tempIcon != null ) {
			tempView.setBackgroundColor("#eee");
			tempIcon.setImage(tempImage);
			tempLabel.color="#4eaba1";
			
		}
		tempImage = icon.image;
		tempLabel = label.color;

		view.setBackgroundColor("#1c6e60");
		if (category == 'hotel') {
			icon.image = "/images/hotel.png";
			hotelLable.color="white";
		} else if (category == 'historical') {
			icon.image = "/images/historical.png";
			historicalLable.color="white";
		} else if (category == 'amusing') {
			icon.image = "/images/park.png";
			parkLable.color="white";
		} else {
			icon.image = "/images/restuarant.png";
			restuarntLable.color="white";
		}

		tempView = view;
		tempIcon = icon;
		tempLabel=label;
		
	}


win.addEventListener("open", function(e) {
		var activity = win.getActivity();
		if (Ti.Platform.osname == 'android') {
			var back = activity.actionBar;
			back.displayHomeAsUp = true;
			back.onHomeIconItemSelected = function() {
				drawer.toggleLeftWindow();
			};
		}

	});
	
	win.addEventListener("android:back", function(e){
		win.close();
	});

	list(categoryName, provinceId);

	win.add(drawer);
	mainView.add(placeContainer);
	mainView.add(buttonContainer);
	win.add(mainView);
	return win;
}

exports.allPlaces = allPlaces;

