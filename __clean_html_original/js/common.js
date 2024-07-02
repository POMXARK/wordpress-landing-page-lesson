function heightDetect() {
	$(".main_head").css("height", $(window).height());
};
heightDetect();
$(window).resize(function() {
	heightDetect();
})

$(".toggle_mnu").click(function() {
	$(".sandwich").toggleClass("active");
});

$(window).load(function() {
	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");
});