var db = Ti.Database.install("assets/tourism.sqlite", "tourism.sqlite");
if (Ti.App.Properties.getBool('firstLunch', false)) {

	setTimeout(function() {
		require('/cities').open();
	}, 3000);

} else {
	require('/intro').open();
}
