var win = Ti.UI.createWindow({
	title : "Tourism",
	backgroundImage : "images/app_photo/bg.png",
	orientationModes : [Ti.UI.PORTRAIT]
});

var main_container = Ti.UI.createView({
	width : "100%",
});

var province_container = Ti.UI.createView({
	width : "80%",
	height : Ti.UI.SIZE,
	layout : "horizontal",
});

var circle = Ti.UI.createImageView({
	width : '105%',
	image : "/images/app_photo/circlefinal.png",
});

var matrix = Ti.UI.create2DMatrix({
	rotate : 360
});

var animation = Ti.UI.createAnimation();

function animateCircle() {

	animation.duration = 15000;
	animation.transform = matrix;

	circle.animate(animation);
}

animateCircle();
main_container.add(circle);
main_container.add(province_container);

var provinces = db.execute("select * from Province");

while (provinces.isValidRow()) {
	var imageArray = [];
	var provinceImages = db.execute("select * from provinces_images where province_id = ?", provinces.fieldByName('id'));
	while (provinceImages.isValidRow()) {
		imageArray.push(provinceImages.fieldByName('name'));
		provinceImages.next();
	}
	var randomImage = Math.floor(Math.random() * imageArray.length);

	var province_view = Ti.UI.createView({
		width : "49.9%",
		height : Ti.UI.SIZE,
		top : "10dp",
		borderRadius : 100000,
	});

	var imageView = Ti.UI.createView({
		width : "83%",
		borderRadius : 200000,
	});
	var province_image = Ti.UI.createImageView({
		image : "/images/province_image/" + imageArray[randomImage],
		width : "100%",
		borderRadius : 100000,
		provinceId : 1,
		province_id : provinces.fieldByName('id'),
	});

	var province_name = Ti.UI.createLabel({
		text : provinces.fieldByName('name'),
		font : {
			fontSize : "17dp",
			fontWeight : "bold",
			fontFamily : "Offerings Regular",
		},
		color : "white",
		bottom : "0dp",
		width : "100%",
		height : "35dp",
		backgroundColor : "#70000000",
		province_id : provinces.fieldByName('id'),
		textAlign : "center"
	});

	province_image.addEventListener("click", function(e) {
		var categoryPage = require('/categories');
		var category = categoryPage.categories(e.source.province_id);
		category.open();
	});

	imageView.add(province_image);
	imageView.add(province_name);
	province_view.add(imageView);
	province_container.add(province_view);

	provinces.next();

}




win.add(main_container);

module.exports = win;
