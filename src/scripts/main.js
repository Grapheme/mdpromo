function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

window.vkw = function() {
	VK.Widgets.Group("vk_groups", {mode: 0, width: "358", height: "389", color1: 'FFFFFF', color2: '2B587A', color3: '5B7FA6'}, 33380340);
}
window.countdown = function() {
	$(".js-countdown")
   .countdown("2015/07/18", function(event) {
     $(this).text(
       event.strftime('%D : %H : %M')
     );
   });
}
window.scrollShow = function() {
	var addActive = function(elem, eq, max, time) {
		elem.filter('[data-number="' + eq + '"]').addClass('active');
		eq++;
		if(eq < max) {
			setTimeout(function(){
				addActive(elem, eq, max, time);
			}, time)
		}
	}
	var show = function() {
		$('[data-row]').each(function(){
			var this_row = $(this).attr('data-row');
			var this_elems = $('[data-row="' + this_row + '"]');
			var this_length = this_elems.length;
			if($(this).offset().top < $(window).scrollTop() + $(window).height()) {
				addActive(this_elems, 0, this_length, 500);
			}
		});
	}
	show();
	$(window).on('scroll', show)
}
window.mail = function() {
	$('.js-mail').on('submit', function(e){
		e.preventDefault();
		var $this = $(this);
		var $btn = $(this).find('[type="submit"]');
		if(!validateEmail($this.find('input').val())) {
			$this.find('input').addClass('error-input').trigger('focus');
			return;
		} else {
			$this.find('input').removeClass('error-input');
		}
		$btn.addClass('loading');
		$.ajax({
			url: $this.attr('action'),
			method: $this.attr('method'),
			data: $this.serialize(),
			dataType: 'json'
		}).done(function(data){
			$('.js-form-parent').slideUp(function(){
				$('.js-mail-success').slideDown();
			});
			setTimeout(function(){
				$('.js-form-parent').parent().slideUp();
			}, 2000);
		}).fail(function(data){
			console.log(data);
			$('.js-mail-fail').slideDown();
		}).always(function(){
			$btn.removeClass('loading');
		});
		return false;
	});
}

$(function(){
	scrollShow();
	countdown();
	mail();
	vkw();
});