function validateEmail(email) {
	var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	return re.test(email);
}

window.vkw = function() {
	VK.Widgets.Group("vk_groups", {mode: 0, width: "358", height: "389", color1: 'FFFFFF', color2: '2B587A', color3: '5B7FA6'}, 33380340);
};
window.countdown = function() {
	$(".js-countdown")
		.countdown("2015/07/18 12:00:00", function(event) {
			$(this).text(
				event.strftime('%D : %H : %M')
			);
		});
};
window.insta = function() {
	var show = function(eq, parent) {
		$.each(['.js-instalink', '.js-instab'], function(i, v){
			parent.find(v).eq(eq).addClass('active')
				.siblings().removeClass('active');
		});
	}
	var getPhotos = function(dataStr, callback) {
		$.ajax({
			url: 'instagram.php',
			data: dataStr,
			dataType: 'json',
			type: 'GET'
		})
		.done(function(data){
			callback(data);
		})
		.fail(function(data){
			console.log(data);
			$('.js-instablock').hide();
		});
	}
	var init = function() {
		$(document).on('click', '.js-instalink', function(){
			var parent = $(this).parents('.js-instablock');
			show($(this).index(), parent);
			return false;
		});
		// Modis, ilikemodis, modisfashion
		getPhotos('tags[]=modisfashion&tags[]=ilikemodis&tags[]=modis', function(data){
			var parent = $('.js-instablock[data-i="1"]'),
				title = parent.find('.js-instatitle'),
				list = parent.find('.js-instaphotolist');
				$.each(data, function(i, v){
					title.append('<a href="#" class="js-instalink title__item">#' + i + '</a>');
					list.append('<div class="insta__photos js-instab" data-tag="' + i + '"></div>');
					var count = 0;
					$.each(v, function(index, value){
						count++;
						if(count > 18) return;
						$('[data-tag="' + i + '"]').append('<a target="_blank" href="' + value.link + '" style="background-image: url(' + value.image + ');" class="photos__item"></a>');
					});
				});
				show(0, $('[data-i="1"]'));
		});
		getPhotos('tags[]=modisбонус&tags[]=modislook', function(data){
			var parent = $('.js-instablock[data-i="0"]'),
				title = parent.find('.js-instatitle'),
				list = parent.find('.js-instaphotolist');
				$.each(data, function(i, v){
					title.append('<a href="#" class="js-instalink title__item">#' + i + '</a>');
					list.append('<div class="insta__photos js-instab" data-tag="' + i + '"></div>');
					$.each(v, function(index, value){
						$('[data-tag="' + i + '"]').append('<a target="_blank" href="' + value.link + '" style="background-image: url(' + value.image + ');" class="photos__item"></a>');
					});
				});
				show(0, $('[data-i="0"]'));
		});
	}
	init();
}
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
			// debugger
			console.log(data);
			$('.js-mail-fail').slideDown();
		};

		$btn.addClass('loading');

		// var MAILCHIMP_API_KEY = '9019ebbf2137b5602e8d143b82fc50bd-us11';
		// var MAILCHIMP_API_URL = 'https://us11.api.mailchimp.com/3.0/';
		// var MAILCHIMP_LIST_ID = '0bdb331b30';

		var email_address = $emailInput.val();

		// $.ajax({
		// 	url: MAILCHIMP_API_URL + 'lists/' + MAILCHIMP_LIST_ID + '/members',
		// 	method: 'post',
		// 	data: JSON.stringify({
		// 		email_address: email_address,
		// 		status: 'subscribed'
		// 	}),
		// 	dataType: 'json',

		// 	headers: {
		// 		'Authorization': 'Basic ' + btoa('apikey:' + MAILCHIMP_API_KEY)
		// 	}
		// })
	
		// var BASE_URL = 'http://modis.ru/';
		var url = 'https://docs.google.com/forms/d/1bGvGUSdYXqGeO2CBPNPp63cpt8hPas_6nvL8opiBmU8/formResponse';

		$.ajax({
			url: url,
			method: 'get',
			crossDomain: true,
			data: {
				'entry.935812420': email_address,
			}
		})
			// .done(function(data){
			// 	if (data && data.result === 'success') {
			// 		onSuccess(data);
			// 	} else {
			// 		onError(data);
			// 	}
			// })
			// .fail(onError)
			.always(function(){
				onSuccess();
				$btn.removeClass('loading');
			});

		return false;
	});
};
window.vote = function() {
	var voteGirl = function(i) {
		$('.js-girl[data-girl="' + i + '"] .js-girl-like').addClass('liked');
		$.ajax({
			url: 'vote.php',
			data: 'girl=' + i
		}).done(function(data){
			var likesDiv = $('.js-girl[data-girl="' + i + '"] .js-girl-likes')
			likesDiv.text(data);
			$.cookie('girl' + i, 'true', {
				path: '/'
			});
		}).fail(function(data){
			console.log(data);
		});
	}
	var init = function() {
		$('.js-girl-like').on('click', function(){
			if($(this).hasClass('liked')) return false;
			voteGirl($(this).parents('.js-girl').attr('data-girl'));
			return false;
		});
		$('.js-girl').each(function(){
			var thisId = $(this).attr('data-girl');
			if($.cookie('girl' + thisId) == 'true') {
				$(this).find('.js-girl-like').addClass('liked');
			}
		});
		$.get('../pdf/vote.json')
			.done(function(data){
				$.each(data, function(index, value){
					$('.js-girl[data-girl="' + index + '"]').find('.js-girl-likes').text(value);
				});
			})
			.fail(function(data){
				console.log(data);
			});
	}
	init();
}

$(function(){
	scrollShow();
	countdown();
	insta();
	mail();
	vkw();
	vote();
	$(".js-fancybox").fancybox({
		padding: 0
	});
});