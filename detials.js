function details(id, provinceId, categoryName) {
	var views = [];
	var controls = [];
	var data2 = db.execute('select * from ' + categoryName + ' where id=?', id);

	Ti.Geolocation.getCurrentPosition(function(e){
		if(e.error){
			alert('Con not get your device location');
			return;
		}else{
			mainLat = e.coords.latitude;
			mainLng = e.coords.longitude;
		}
	});

	var Map = require('ti.map');

	var window = Ti.UI.createWindow({
		backgroundColor : '#ffffff',
		title : data2.fieldByName('name'),
		orientationModes : [Ti.UI.PORTRAIT],
		layout: 'vertical'
	});

	var holeScroll = Ti.UI.createScrollView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL,
		backgroundColor : 'transpatent',
		layout : 'vertical',
	});

	var imageConteiner = Ti.UI.createView({
		height: '200dp',
		width: Ti.UI.FILL,
		top: '8dp',
		top: '0pd'
	});

	var mapConteiner = Ti.UI.Android.createCardView({
		height: '110dp',
		width: '92%',
		top: '8dp',
		layout: 'vertical',
	});

	var titleConteiner = Ti.UI.createView({
		height: '30dp',
		width: Ti.UI.FILL,
		top: '8dp'
	});

	var textConteiner = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: '92%'
	});

	var scrollableView = Ti.UI.createScrollableView({
		top : '0dp',
	});

	var pagingControlConteiner = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		backgroundColor : 'transparent',
		layout : 'horizontal'
	});

	var conteiner = Ti.UI.createView({
		height : '13%',
		width : Ti.UI.FILL,
		backgroundColor : '#60000000',
		bottom : '0dp'
	});

	var locationData = database.execute('select * from '+categoryName+' where id=?', id);
var latitude = locationData.fieldByName('latitude');
var longitude = locationData.fieldByName('longitude');
var annotation = Map.createAnnotation({
	latitude: latitude,
	longitude: longitude,
	title: locationData.fieldByName('name'),
	subtitle: 'Herat  , Afghanistan',
	animate: true,
	leftButton: 'assets/images/heart1.jpg',
	image: 'images/pin.png'
});

var maps = Map.createView({
	height: '75%',
	mapType: Map.NORMAL_TYPE,
	region:	{
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 0.01,
		longitudeDelta: 0.01
	},
	animate: true,
	regionFit: true,
	userLocation: true,
	annotations: [annotation]
});

	var locationView = Ti.UI.createView({
	height: '25%',
	width: Ti.UI.FILL,
	backgroundColor: '#5ccdbb'
	});

	var icons = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.SIZE,
		layout: 'horizontal'
	});

	var locationIcon = Ti.UI.createImageView({
		image: '/images/locationM.png'
	});

	var mailIcon = Ti.UI.createImageView({
		image: '/images/emailM.png',
		left: '20dp'
	});

	var webIcon = Ti.UI.createImageView({
		image: '/images/websiteM.png',
		left: '20dp'
	});

	var phoneIcon = Ti.UI.createImageView({
		image: '/images/phoneM.png',
		left: '20dp'
	});

	var emailDialogue = Ti.UI.createEmailDialog({
		subject : "Send Email to" + data2.fieldByName('name'),
		toRecipients : data2.fieldByName('email'),
		messageBody : "" ,
	});
	
	var title = Ti.UI.createLabel({
	text: data2.fieldByName('name'),
	font: {
		fontSize: '20dp'
	},
	color: '#505256',
	bottom: '4dp'
	});
	
	var info = Ti.UI.createLabel({
		text : data2.fieldByName('description'),
		color : '#505256',
		height : Ti.UI.SIZE,
	});
	
	var data = db.execute("select * from images where place_id=? and province_id = ? and category_name = ?", id, provinceId, categoryName);

	var ID = 0;

	while (data.isValidRow()) {
		var img = Ti.UI.createImageView({
			image : "/images/photos/" + data.fieldByName('name'),
			width : Ti.UI.FILL,
			height : Ti.UI.FILL,
			top : '0dp'
		});

		var pagingControl = Ti.UI.createView({
			height : '10dp',
			width : '10dp',
			left : '4dp',
			backgroundColor : 'transparent',
			borderColor : '#5ccdbb',
			borderWidth : '2dp',
			borderRadius : 100,
			//top : '30%',
			id : ID,
			//opacity : "0.4",
		});

		pagingControl.addEventListener('click', function(e) {
			scrollableView.scrollToView(e.source.id);
			i = e.source.id;
		});
		

		controls.push(pagingControl);

		var view = Ti.UI.createView({
			height : Ti.UI.FILL,
			top : '0dp'
		});

		view.add(img);
		views.push(view);

		data.next();
		ID = ID + 1;
	}

	for ( i = 0; i < controls.length; i++) {
		pagingControlConteiner.add(controls[i]);
	}

	var previous = 0;
	function changePagingCtrlBG(previous, current) {
		controls[previous].backgroundColor = 'transparent';
		controls[current].backgroundColor = '#5ccdbb';
	}

	var i = 1;
	function changeScrholl() {
		if (i > controls.length) {
			i = 0;
			scrollableView.setCurrentPage(i);
		} else {
			scrollableView.scrollToView(i);
			i = i + 1;
		}
	}

	scrollableView.addEventListener('scroll', function(e) {
		changePagingCtrlBG(previous, e.currentPage);
		previous = e.currentPage;
	});

	scrollableView.setViews(views);

	var webWin = require('/webSite');

	webIcon.addEventListener('click', function(e) {
		var webSiteWin = webWin.createWebSite(categoryName, id);
	});

	phoneIcon.addEventListener('click', function(e) {
		var the_number = data2.fieldByName('phone');
		Ti.Platform.openURL('tel:' + the_number);
	});

	mailIcon.addEventListener('click', function(e) {
		emailDialogue.open();
	});
	
	var slidShow;
	window.addEventListener("open", function(e) {
		slidShow = setInterval(changeScrholl, 5000);
		var activity = window.activity.onCreateOptionsMenu = function(e) {
		var contact = e.menu.add({
			title : "Contact",
			color:"black",
		});
		
		var fontSize = e.menu.add({
			title:"Font Size",
			color:"black",
		});
		
		var fontType = e.menu.add({
			title:"Font Type",
			color:"black"
		});
		
		contact.addEventListener("click", function(e) {
			require('/contact').open();
		});
		
		fontSize.addEventListener("click", function(e){
			require('/fontSize').open();
		});
		
		fontType.addEventListener("click", function(e){
			require('/fontType').open();
		});
	};
});

	window.addEventListener("focus", function(e){
		info.font = {
			fontSize : fontSize(),
			fontFamily : fontType()
		};
	});

	function fontSize(){
		var newSize = Ti.App.Properties.getString("fontSize", "");
		var defaultSize = "13dp";
		var font_size = (newSize == '' ? defaultSize : newSize);
		return font_size;
	}
	
	function fontType(){
		var newType = Ti.App.Properties.getString("fontType", "");
		var defaultType = "Offerings Regular";
		var font_type = (newType == '' ? defaultType : newType);
		return font_type;
	}
	
	window.addEventListener("android:back", function(e){
		window.close();
	});
	
	imageConteiner.addEventListener("click", function(e){
		var slideShow = require('/slideShow');
		var slideShowPage = slideShow.slideShowPage(id, categoryName, provinceId);
		slideShowPage.open();
	});

	window.add(holeScroll);
	holeScroll.add(imageConteiner);
	holeScroll.add(mapConteiner);
	holeScroll.add(titleConteiner);
	holeScroll.add(textConteiner);
	
	imageConteiner.add(scrollableView);
	imageConteiner.add(conteiner);
	
	conteiner.add(pagingControlConteiner);
	mapConteiner.add(maps);
	mapConteiner.add(locationView);
	locationView.add(icons);
	icons.add(locationIcon);
	if (categoryName == 'hotel' || categoryName == 'restaurant') {
		icons.add(mailIcon);
		icons.add(webIcon);
		icons.add(phoneIcon);
	}
	titleConteiner.add(title);
	textConteiner.add(info);
	return window;
}

exports.details = details;
