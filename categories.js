
function categories(provinceId) {
var db = Ti.Database.install("assets/tourism.sqlite", "tourism.sqlite");
	var province_data = db.execute("select * from province where id = ?", provinceId);

	var win = Ti.UI.createWindow({
		backgroundImage : "/images/app_photo/bg.png",
		layout:"vertical",
		orientationModes:[Ti.UI.PORTRAIT],
		
		
	});
	var scrlView = Ti.UI.createScrollView({
	height:"100%",
	width:Ti.UI.FILL,
layout:"vertical",
top:"5%",
});

	var topImg = '';
	var smallImg = '';
	var weather = '';
	switch(provinceId) {
	case 1:
		topImg = "/images/province_image/kabul-header-image.png";
		smallImg = "/images/province_image/kabul1.jpg";
		weather = db.execute("select * from weather where province_id = ?", provinceId);
		break;
	case 2:
		topImg = "/images/province_image/herat-header-image.png";
		smallImg = "/images/province_image/Herat1.jpg";
		weather = db.execute("select * from weather where province_id = ?", provinceId);
		break;
	case 3:
		topImg = "/images/province_image/Marzar-Header-Image.png";
		smallImg = "/images/photos/holy_shrain2.jpg";
		weather = db.execute("select * from weather where province_id = ?", provinceId);
		break;
	case 4:
		topImg = "/images/province_image/bamian-header-image.png";
		smallImg = "/images/province_image/bamian.jpg";
		weather = db.execute("select * from weather where province_id = ?", provinceId);
		break;
	}
	var topImage = Ti.UI.createImageView({
		width : Ti.UI.FILL,
		
		image : topImg,
		top:"-15dp",
		
	});

	var slideImageView = Ti.UI.createView({
		width : Ti.UI.SIZE,
		height : "38%",
		layout : 'vertical',
		top:"-150dp",
		
		bottom:"-36dp",
		
	});

	var smallImage = Ti.UI.createView({
		backgroundImage : smallImg,
		width : "145dp",
		height : "145dp",
		borderRadius : 100,
		top:"6%",
		borderWidth : 3,
		borderColor : '#701c6e60',
			});
			var provinceNameView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
				
				top:"2%",
			});
	var provinceName = Ti.UI.createLabel({
		text : province_data.fieldByName('name'),
		
		font : {
			fontSize : "18dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color : "white",
		
	});
	slideImageView.add(smallImage);
	slideImageView.add(provinceNameView);
	provinceNameView.add(provinceName);
		

	var descriptionView = Ti.UI.createView({
		height:"0%",
		width:Ti.UI.FILL,
		backgroundColor:"#404eaba1",
		//opacity:"0.4",
		layout:"vertical",
		
		left:'1dp',
		right:"1dp",
		
	
	});
	var btn = Ti.UI.Android.createCardView({
	backgroundColor:"#357e72",
	borderColor:"white",
	borderRadius:"2dp",
	height:"28dp",
	width:"30%",
	top:"6dp",
});
var btnLable = Ti.UI.createLabel({
	text:"More Info",
	font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams",
		},
	color:"white",
});
 var imageView = Ti.UI.createImageView({
 	height:"250dp",
 	width:Ti.UI.FILL,
 	
 	duration:3000,
 	top:"6dp",
 	images:["/images/photos/arg9.jpg","/images/photos/arg_hotel18.jpg","/images/photos/arg1.jpg","/images/photos/arg3.jpg"],
 	
 });
	var label = Ti.UI.createLabel({
	text : 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure L',
	height: Ti.UI.SIZE,
	font : {
			fontSize : "12dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams",
		},
	color:"white",
	textAlign:"center",
	left:"5dp",
	right:"5dp",
});
var animated = false;
	btn.addEventListener('click', function(e){
	if(!animated){
		descriptionView.animate({
			height : label.toImage().height/1,
			duration : 2000,
		}); 
		btnLable.setText("Less Info");
		animated = true;
	}else{
		descriptionView.animate({
			height : 0,
			duration : 2000,
		}); 
		animated = false;
			btnLable.setText("More Info");
	}
	
});
descriptionView.add(label);
descriptionView.add(imageView);
setTimeout(function(){imageView.start();},500);
var weatherLabel = Ti.UI.createLabel({
	text:"Weather",
	font : {
			fontSize : "12dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
	color:"white",
	left:"10%",
	top:"-10dp",
});
var weatherLine = Ti.UI.createView({
	height:"1dp",
	width:"80%",
	left:"10%",
	backgroundColor:"white",
	opacity:"0.3"
});
	var weatherView = Ti.UI.createView({
		width:"98%",
		height:"90dp",
		layout:"horizontal",
		
		top:"-15dp",
		
	
		
	});
	
	var springView = Ti.UI.createView({
		width:"24%",
		height:"100%",
		layout:"vertical",
		top:"20dp",
		
	
		
	});
	
	var springIcon = Ti.UI.createImageView({
		image : "/images/spring.png",
		top:"8%",
	});
		
	var springLabel = Ti.UI.createLabel({
		text:weather.fieldByName('spring'),
		top:"6dp",
		color:"white",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams",
		},
	});
	
	var summerView = Ti.UI.createView({
		width:"24%",
		height:"100%",
		layout:"vertical",
		top:"20dp",
		
	});
	
	var summerIcon = Ti.UI.createImageView({
		image : "/images/summer.png",
		top:"8%",

	});

	var summerLabel = Ti.UI.createLabel({
		text:weather.fieldByName('summer'),
		color:"white",
		top:"6dp",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams",
		},
	});
	
	var fallView = Ti.UI.createView({
		width:"24%",
		height:"100%",
		layout:"vertical",
		top:"20dp",
	
	});
	
	var fallIcon = Ti.UI.createImageView({
		image : "/images/fall1.png",
		
		top:"8%",

	});

	
	var fallLabel = Ti.UI.createLabel({
		text:weather.fieldByName('fall'),
		top:"6dp",
		color:"white",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams",
		},
	});
	
	var winterView = Ti.UI.createView({
		width:"24%",
		height:"100%",
		layout:"vertical",
		top:"20dp",
		
	});
	
	var winterIcon = Ti.UI.createImageView({
		image : "/images/winter.png",
		
		top:"8%",

	});

	var winterLabel = Ti.UI.createLabel({
		text:weather.fieldByName('winter'),
		top:"6dp",
		color:"white",
		font : {
			fontSize : "10dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams",
		},
	});
			var matrixScale = Ti.UI.create2DMatrix({
			scale:1.3,
					});
	var animationScale = Ti.UI.createAnimation({
		transform: matrixScale,
			duration:500,
			autoreverse:true,
			repeat:1,
	});
	
	var matrixRotate = Ti.UI.create2DMatrix({
			rotate: 360,
		});
	var animationRotate = Ti.UI.createAnimation({
		transform: matrixRotate,
			duration:1000,
			autoreverse:false,
	});
	function animateIcon2 (){
		springIcon.animate(animationRotate);
		setTimeout(function(){summerIcon.animate(animationRotate);},1000);
		setTimeout(function(){winterIcon.animate(animationRotate);},3000);
		setTimeout(function(){fallIcon.animate(animationScale);},2000);
		
		
		
		
	};
	
	setTimeout(function(){animateIcon2();},2000);
	
	springView.add(springIcon);
	springView.add(springLabel);
	summerView.add(summerIcon);
	summerView.add(summerLabel);
	fallView.add(fallIcon);
	fallView.add(fallLabel);
	winterView.add(winterIcon);
	winterView.add(winterLabel);
	
	weatherView.add(springView);
	weatherView.add(summerView);
	weatherView.add(fallView);
	weatherView.add(winterView);
	
	var categoriesView = Ti.UI.createView({
		width:"65%",
		height:"230dp",
		layout:"horizontal",
		top:"-20dp",
		backgroundColor:"transparent",
		
	});
	
	var historicalview = Ti.UI.Android.createCardView({
		height:"46%",
		width:"46%",
		top:"2%",
		left:"1%",
	backgroundColor:"#357e72",
		name:"historical",
		opacity:"0.7",
		layout:"vertical",
		
	});
	var historicalImage=Ti.UI.createImageView({
		image:"/images/historical.png",
		top:"20%",
		name:"historical"
	});
	var historicalLabel = Ti.UI.createLabel({
		text:"Historical",
			font : {
			fontSize : "12dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"white",
		top:"8%",
		
	});
	
	var parkview = Ti.UI.Android.createCardView({
		height:"46%",
		width:"46%",
		top:"2%",
		opacity:"0.7",
		left:"2%",
		backgroundColor:"#357e72",
		name:"amusing",
			layout:"vertical",
	});
		var parkImage=Ti.UI.createImageView({
		image:"/images/park.png",
		top:"20%",
		name:"amusing"
	});
		var parkLabel = Ti.UI.createLabel({
		text:"Parks",
			font : {
			fontSize : "12dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"white",
		top:"4%",
		
	});
	var hotelview = Ti.UI.Android.createCardView({
		height:"46%",
		width:"46%",
		top:"2%",
	opacity:"0.7",
		left:"1%",
	backgroundColor:"#357e72",
		layout:"vertical",
		
		name:"hotel"
	});
	var hotelImage=Ti.UI.createImageView({
		image:"/images/hotel.png",
		top:"25%",
		name:"hotel"
	});
		var hotelLabel = Ti.UI.createLabel({
		text:"Hotel",
			font : {
			fontSize : "12dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"white",
		top:"8%",
		
	});
	var restuarantview = Ti.UI.Android.createCardView({
		height:"46%",
		width:"46%",
	top:"2%",
		opacity:"0.6",
		left:"2%",
		backgroundColor:"#357e72",
		name:"restaurant",
			layout:"vertical",
	});
	
	var restuarantImage=Ti.UI.createImageView({
		 image:"/images/restuarant.png",
		top:"18%",
		name:'restaurant',
	});
		var restuarantLabel = Ti.UI.createLabel({
		text:"Restuarant",
			font : {
			fontSize : "12dp",
			fontWeight : "bold",
			fontFamily:"CaviarDreams_Bold",
		},
		color:"white",
		top:"14%",
		
	});
	
	categoriesView.add(historicalview);
	historicalview.add(historicalImage);
	historicalview.add(historicalLabel);
	 categoriesView.add(parkview);
	 parkview.add(parkImage);
	 parkview.add(parkLabel);
	 categoriesView.add(hotelview);
	 hotelview.add(hotelImage);
	 hotelview.add(hotelLabel);
	 categoriesView.add(restuarantview);
	 restuarantview.add(restuarantImage);
	 restuarantview.add(restuarantLabel);

	historicalview.addEventListener("click", function(e){
		
		var placesList = require("/allPlaces");
		var allPlaces = placesList.allPlaces(e.source.name, provinceId);
		allPlaces.open();
	});
	
	parkview.addEventListener("click", function(e){
		
		var placesList = require("/allPlaces");
		var allPlaces = placesList.allPlaces(e.source.name, provinceId);
		allPlaces.open();
	});
	
	hotelview.addEventListener("click", function(e){
		
		var placesList = require("/allPlaces");
		var allPlaces = placesList.allPlaces(e.source.name, provinceId);
		allPlaces.open();
	});
	
	restuarantview.addEventListener("click", function(e){
		
		var placesList = require("/allPlaces");
		var allPlaces = placesList.allPlaces(e.source.name, provinceId);
		allPlaces.open();
	});
	
		win.addEventListener("open", function(e){
		if(Ti.Platform.osname == "android"){
			var back = win.activity.actionBar;
			back.displayHomeAsUp = true;
			back.onHomeIconItemSelected = function(e){
				win.close();
			};
		}
	});
	
	win.addEventListener("android:back", function(e){
		win.close();
	});

	scrlView.add(descriptionView);
	scrlView.add(btn);
	btn.add(btnLable);
	scrlView.add(weatherLabel);
	scrlView.add(weatherLine);
	scrlView.add(weatherView);
	
	scrlView.add(categoriesView);
	win.add(topImage);
	win.add(slideImageView);
	win.add(scrlView);
	return win;
}

exports.categories = categories;

