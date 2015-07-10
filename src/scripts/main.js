window.vkw = function() {
	VK.Widgets.Group("vk_groups", {mode: 0, width: "358", height: "389", color1: 'FFFFFF', color2: '2B587A', color3: '5B7FA6'}, 20003922);
}
window.countdown = function() {
	$(".js-countdown")
   .countdown("2015/07/18", function(event) {
     $(this).text(
       event.strftime('%D : %H : %M')
     );
   });
}

$(function(){
	countdown();
	vkw();
});