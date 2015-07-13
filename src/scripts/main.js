function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

window.vkw = function() {
	VK.Widgets.Group("vk_groups", {mode: 0, width: "358", height: "389", color1: 'FFFFFF', color2: '2B587A', color3: '5B7FA6'}, 33380340);
};
window.countdown = function() {
	$(".js-countdown")
   .countdown("2015/07/18", function(event) {
     $(this).text(
       event.strftime('%D : %H : %M')
     );
   });
};
window.scrollShow = function() {
	var addActive = function(elem, eq, max, time) {
		elem.filter('[data-number="' + eq + '"]').addClass('active');
		eq++;
		if(eq < max) {
			setTimeout(function(){
				addActive(elem, eq, max, time);
			}, time);
		}
	};
	var show = function() {
		$('[data-row]').each(function(){
			var this_row = $(this).attr('data-row');
			var this_elems = $('[data-row="' + this_row + '"]');
			var this_length = this_elems.length;
			if($(this).offset().top < $(window).scrollTop() + $(window).height()) {
				addActive(this_elems, 0, this_length, 500);
			}
		});
	};
	show();
	$(window).on('scroll', show);
};
window.mail = function() {
	$('.js-mail').on('submit', function(e){
		e.preventDefault();
		var $this = $(this);
		var $btn = $(this).find('[type="submit"]');
		var $emailInput = $this.find('input[name=EMAIL]');
		if(!validateEmail($emailInput.val())) {
			$emailInput.addClass('error-input').trigger('focus');
			return;
		} else {
			$emailInput.find('input').removeClass('error-input');
		}

		var onSuccess = function(data) {
			$('.js-form-parent').slideUp(function(){
				$('.js-mail-success').slideDown();
			});
			setTimeout(function(){
				$('.js-form-parent').parent().slideUp();
			}, 2000);
		};

		var onError = function(data) {
			debugger
			console.log(data);
			$('.js-mail-fail').slideDown();
		};

		$btn.addClass('loading');

		var MAILCHIMP_API_KEY = '9019ebbf2137b5602e8d143b82fc50bd-us11';
		var MAILCHIMP_URL = 'https://us11.api.mailchimp.com/';
		var email_address = $emailInput.val();
		var listId = 154181;

		$.ajax({
			url: MAILCHIMP_URL + 'lists/' + listId + '/members',
			method: 'post',
			data: {
				email_address: email_address
			},
			dataType: 'json',


			username: 'test',
			password: MAILCHIMP_API_KEY
		})
			.done(function(data){
				if (data && data.result === 'success') {
					onSuccess(data);
				} else {
					onError(data);
				}
			})
			.fail(onError)
			.always(function(){
				$btn.removeClass('loading');
			});

		return false;
	});
};

$(function(){
	scrollShow();
	countdown();
	mail();
	vkw();
});