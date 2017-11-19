var introWin = Ti.UI.createWindow({
	backgroundImage : "images/province_image/bamian.jpg",
	layout : "vertical",
	theme : 'Theme.AppCompat.Fullscreen'
});
var backgroundview = Ti.UI.createView({
	height : "100%",
	width : "100%",
	backgroundColor : "black",
	opacity : "0.9",
	layout : "vertical",
});

var lable = Ti.UI.createLabel({
	text : "Tourism",
	color : "white",
	top : "15%",
	font : {
		fontSize : "30dp",
		fontWeight : "bold",
		fontFamily : "Offerings Regular",
	},
});
var lable1 = Ti.UI.createLabel({
	text : "Welcom to Tourism Application",
	color : "#5bcdba",
	top : "15%",
	font : {
		fontSize : "22dp",
		fontWeight : "bold",
		fontFamily : "Offerings Regular",
	},
});
var lable2 = Ti.UI.createLabel({
	text : "This is the first application that show the new face of Afghanistan to the WORLD",
	color : "white",
	top : "4%",
	font : {
		fontSize : "14dp",
		fontWeight : "bold",
		fontFamily : "Offerings Regular",
	},
	textAlign : "center",
	left : "5%",
	right : "5%"
});

var btn1 = Ti.UI.createButton({
	height : "8%",
	width : "60%",
	backgroundColor : "#5bcdba",
	top : '17%',
	borderRadius : "10dp",
	title : "GOT IT",
	font : {
		fontSize : "14dp",
		fontWeight : "bold",
		fontFamily : "Offerings Regular",
	},
	color : "white",
});

btn1.addEventListener("click", function(e) {
	Ti.App.Properties.setBool('firstLunch', true);
	require('/cities').open();
});

introWin.add(backgroundview);

backgroundview.add(lable);
backgroundview.add(lable1);
backgroundview.add(lable2);
backgroundview.add(btn1);

module.exports = introWin;
