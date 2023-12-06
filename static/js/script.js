(function ($) {

	"use strict";

	//Write Here Nu




	if ($("#switch-toggle-tab").length) {
		var toggleSwitch = $("#switch-toggle-tab label.switch");
		var TabTitle = $("#switch-toggle-tab li");
		var monthTabTitle = $("#switch-toggle-tab li.month");
		var yearTabTitle = $("#switch-toggle-tab li.year");
		var monthTabContent = $("#month");
		var yearTabContent = $("#year");
		// hidden show deafult;
		monthTabContent.fadeIn();
		yearTabContent.fadeOut();

		function toggleHandle() {
			if (toggleSwitch.hasClass("on")) {
				yearTabContent.fadeOut();
				monthTabContent.fadeIn();
				monthTabTitle.addClass("active");
				yearTabTitle.removeClass("active");
			} else {
				monthTabContent.fadeOut();
				yearTabContent.fadeIn();
				yearTabTitle.addClass("active");
				monthTabTitle.removeClass("active");
			}
		}
		monthTabTitle.on("click", function () {
			toggleSwitch.addClass("on").removeClass("off");
			toggleHandle();
			return false;
		});
		yearTabTitle.on("click", function () {
			toggleSwitch.addClass("off").removeClass("on");
			toggleHandle();
			return false;
		});
		toggleSwitch.on("click", function () {
			toggleSwitch.toggleClass("on off");
			toggleHandle();
		});
	}



	// Accrodion
	if ($(".accrodion-grp").length) {
		var accrodionGrp = $(".accrodion-grp");
		accrodionGrp.each(function () {
			var accrodionName = $(this).data("grp-name");
			var Self = $(this);
			var accordion = Self.find(".accrodion");
			Self.addClass(accrodionName);
			Self.find(".accrodion .accrodion-content").hide();
			Self.find(".accrodion.active").find(".accrodion-content").show();
			accordion.each(function () {
				$(this)
					.find(".accrodion-title")
					.on("click", function () {
						if ($(this).parent().hasClass("active") === false) {
							$(".accrodion-grp." + accrodionName)
								.find(".accrodion")
								.removeClass("active");
							$(".accrodion-grp." + accrodionName)
								.find(".accrodion")
								.find(".accrodion-content")
								.slideUp();
							$(this).parent().addClass("active");
							$(this).parent().find(".accrodion-content").slideDown();
						}
					});
			});
		});
	}



	if ($(".marquee_mode").length) {
		$('.marquee_mode').marquee({
			speed: 50,
			gap: 0,
			delayBeforeStart: 0,
			direction: 'left',
			duplicated: true,
			pauseOnHover: true,
			startVisible: true,
		});
	}















	//Submenu Dropdown Toggle
	if ($('.main-header li.dropdown ul').length) {
		$('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="far fa-angle-down fa-fw"></span></div>');

		//Dropdown Button
		$('.main-header li.dropdown .dropdown-btn').on('click', function () {
			$(this).prev('ul').slideToggle(500);
		});

		//Disable dropdown parent link
		$('.navigation li.dropdown > a').on('click', function (e) {
			e.preventDefault();
		});


		$('.hamburger').on('click', function (e) {
			$('.about-sidebar').addClass('active');
		});

		$('.about-sidebar .close-button').on('click', function (e) {
			$('.about-sidebar').removeClass('active');
		});

		$('.about-sidebar .gradient-layer').on('click', function (e) {
			$('.about-sidebar').removeClass('active');
		});

		$('.xs-sidebar-group .close-button').on('click', function (e) {
			$('.xs-sidebar-group.info-group').removeClass('isActive');
		});

	}



	// Mobile Nav Hide Show
	if ($('.mobile-menu').length) {
		//$('.mobile-menu .menu-box').mCustomScrollbar();
		var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
		$('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
		$('.sticky-header .main-menu').append(mobileMenuContent);

		//Hide / Show Submenu
		$('.mobile-menu .navigation > li.dropdown > .dropdown-btn').on('click', function (e) {
			e.preventDefault();
			var target = $(this).parent('li').children('ul');

			if ($(target).is(':visible')) {
				$(this).parent('li').removeClass('open');
				$(target).slideUp(500);
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown > ul').slideUp(500);
				return false;
			} else {
				$(this).parents('.navigation').children('li.dropdown').removeClass('open');
				$(this).parents('.navigation').children('li.dropdown').children('ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//3rd Level Nav
		$('.mobile-menu .navigation > li.dropdown > ul  > li.dropdown > .dropdown-btn').on('click', function (e) {
			e.preventDefault();
			var targetInner = $(this).parent('li').children('ul');

			if ($(targetInner).is(':visible')) {
				$(this).parent('li').removeClass('open');
				$(targetInner).slideUp(500);
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				return false;
			} else {
				$(this).parents('.navigation > ul').find('li.dropdown').removeClass('open');
				$(this).parents('.navigation > ul').find('li.dropdown > ul').slideUp(500);
				$(this).parent('li').toggleClass('open');
				$(this).parent('li').children('ul').slideToggle(500);
			}
		});

		//Menu Toggle Btn
		$('.mobile-nav-toggler').on('click', function () {
			$('body').addClass('mobile-menu-visible');

		});

		//Menu Toggle Btn
		$('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
			$('body').removeClass('mobile-menu-visible');
			$('.mobile-menu .navigation > li').removeClass('open');
			$('.mobile-menu .navigation li ul').slideUp(0);
		});


		$(document).keydown(function (e) {
			if (e.keyCode == 27) {
				$('body').removeClass('mobile-menu-visible');
				$('.mobile-menu .navigation > li').removeClass('open');
				$('.mobile-menu .navigation li ul').slideUp(0);
			}
		});

	}


	//  Progress Bar
	if ($(".count-bar").length) {
		$(".count-bar").appear(
			function () {
				var el = $(this);
				var percent = el.data("percent");
				$(el).css("width", percent).addClass("counted");
			}, {
				accY: 150
			}
		);
	}

	//Progress Bar / Levels
	if ($(".progress-levels .progress-box .bar-fill").length) {
		$(".progress-box .bar-fill").each(
			function () {
				$(".progress-box .bar-fill").appear(function () {
					var progressWidth = $(this).attr("data-percent");
					$(this).css("width", progressWidth + "%");
				});
			}, {
				accY: 0
			}
		);
	}


	//Fact Counter + Text Count
	if ($(".count-box").length) {
		$(".count-box").appear(
			function () {
				var $t = $(this),
					n = $t.find(".count-text").attr("data-stop"),
					r = parseInt($t.find(".count-text").attr("data-speed"), 10);

				if (!$t.hasClass("counted")) {
					$t.addClass("counted");
					$({
						countNum: $t.find(".count-text").text()
					}).animate({
						countNum: n
					}, {
						duration: r,
						easing: "linear",
						step: function () {
							$t.find(".count-text").text(Math.floor(this.countNum));
						},
						complete: function () {
							$t.find(".count-text").text(this.countNum);
						}
					});
				}
			}, {
				accY: 0
			}
		);
	}


	if ($("#testimonial-one__thumb").length) {
		let testimonialsThumb = new Swiper("#testimonial-one__thumb", {
			slidesPerView: 3,
			spaceBetween: 0,
			speed: 1400,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			loopedSlides: 4,
			direction: 'vertical',
			loop: true,
			autoplay: {
				delay: 5000
			},
			breakpoints: {
				0: {
					slidesPerView: 3,
					spaceBetween: 0
				},
				575: {
					slidesPerView: 3,
					spaceBetween: 0
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 0
				},

			}
		});

		let testimonialsCarousel = new Swiper("#testimonial-one__carousel", {
			observer: true,
			observeParents: true,
			loop: true,
			speed: 1400,
			mousewheel: false,
			slidesPerView: 1,
			spaceBetween: 72,
			autoplay: {
				delay: 5000
			},
			thumbs: {
				swiper: testimonialsThumb
			},
			pagination: {
				el: "#testimonials-one__carousel-pagination",
				type: "bullets",
				clickable: true
			},

			navigation: {
				nextEl: "#testimonial-three__swiper-button-next",
				prevEl: "#testimonial-three__swiper-button-prev"
			}
		});
	}




	if ($("#testimonial-two__thumb").length) {
		let testimonialsThumb = new Swiper("#testimonial-two__thumb", {
			slidesPerView: 4,
			spaceBetween: 10,
			speed: 1400,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			loopedSlides: 4,
			loop: true,
			autoplay: {
				delay: 5000
			},
			breakpoints: {
				0: {
					slidesPerView: 4,
					spaceBetween: 5
				},
				575: {
					slidesPerView: 4,
					spaceBetween: 5
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 5
				},

			}
		});

		let testimonialsCarousel = new Swiper("#testimonial-two__carousel", {
			observer: true,
			observeParents: true,
			loop: true,
			speed: 1400,
			mousewheel: false,
			slidesPerView: 1,
			spaceBetween: 72,
			autoplay: {
				delay: 5000
			},
			thumbs: {
				swiper: testimonialsThumb
			},
			pagination: {
				el: "#testimonials-two__carousel-pagination",
				type: "bullets",
				clickable: true
			},

			navigation: {
				nextEl: "#testimonial-three__swiper-button-next",
				prevEl: "#testimonial-three__swiper-button-prev"
			}
		});
	}





	if ($("#testimonial-three__thumb").length) {
		let testimonialsThumb = new Swiper("#testimonial-three__thumb", {
			slidesPerView: 3,
			spaceBetween: 47,
			speed: 1400,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			slideToClickedSlide: true,
			loopedSlides: 4,
			direction: 'vertical',
			loop: true,
			autoplay: {
				delay: 5000
			},
			breakpoints: {
				0: {
					slidesPerView: 3,
					spaceBetween: 47
				},
				575: {
					slidesPerView: 3,
					spaceBetween: 47
				},
				768: {
					slidesPerView: 3,
					spaceBetween: 47
				},

			}
		});

		let testimonialsCarousel = new Swiper("#testimonial-three__carousel", {
			observer: true,
			observeParents: true,
			loop: true,
			speed: 1400,
			mousewheel: false,
			slidesPerView: 1,
			spaceBetween: 72,
			autoplay: {
				delay: 5000
			},
			thumbs: {
				swiper: testimonialsThumb
			},
			pagination: {
				el: "#testimonials-one__carousel-pagination",
				type: "bullets",
				clickable: true
			},

			navigation: {
				nextEl: "#testimonial-three__swiper-button-next",
				prevEl: "#testimonial-three__swiper-button-prev"
			}
		});
	}



	if ($(".img-popup").length) {
		var groups = {};
		$(".img-popup").each(function () {
			var id = parseInt($(this).attr("data-group"), 10);

			if (!groups[id]) {
				groups[id] = [];
			}

			groups[id].push(this);
		});

		$.each(groups, function () {
			$(this).magnificPopup({
				type: "image",
				closeOnContentClick: true,
				closeBtnInside: false,
				gallery: {
					enabled: true
				}
			});
		});
	}


	if ($(".project-three__list li").length) {
		$(".project-three__list li").each(function () {
			let self = $(this);

			self.on("mouseenter", function () {
				console.log($(this));
				$(".project-three__list li").removeClass("active");
				$(this).addClass("active");
			});
		});
	}




	// ===Project One Swiper Carousel===
	if ($(".project-one__swiper-carousel").length > 0) {
		var totalSlides2 = $(".project-one__swiper-carousel .swiper-slide").length;
		var gridCarusel = new Swiper(".project-one__swiper-carousel", {
			preloadImages: false,
			loop: true,
			freeMode: false,
			slidesPerView: 1,
			spaceBetween: 30,
			grabCursor: true,
			mousewheel: false,
			speed: 500,
			effect: "slide",
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				nextEl: '.project-one__nav-next',
				prevEl: '.project-one__nav-prev',
			},
			breakpoints: {
				1600: {
					slidesPerView: 4,
				},
				1200: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 3,
				},
				768: {
					slidesPerView: 2,
				},

			}
		});

		gridCarusel.on('slideChange', function () {
			var csli = gridCarusel.realIndex + 1,
				curnum = $('#current2');
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: -10,
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: function () {
					TweenMax.to(curnum, 0.1, {
						force3D: true,
						y: 10
					});
					curnum.html('0' + csli);
				}
			});
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: 0,
				delay: 0.3,
				opacity: 1,
				ease: Power2.easeOut
			});
		});

		var totalSlides2 = gridCarusel.slides.length - 6;
		$('#total2').html(totalSlides2);
	}




	// Banner Slider One //Home One
	if ($(".slider-one-style1").length > 0) {
		var bannerSlider = new Swiper('.slider-one-style1', {
			spaceBetween: 0,
			slidesPerView: 1,
			mousewheel: false,
			height: 500,
			grabCursor: true,
			loop: true,
			speed: 1400,
			autoplay: {
				delay: 10000,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				prevEl: '.slider-one-button-prev',
				nextEl: '.slider-one-button-next',
			},
		});
		bannerSlider.on('slideChange', function () {
			var csli = bannerSlider.realIndex + 1,
				curnum = $('#slider-one-current');
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: -10,
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: function () {
					TweenMax.to(curnum, 0.1, {
						force3D: true,
						y: 10
					});
					curnum.html('0' + csli);
				}
			});
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: 0,
				delay: 0.3,
				opacity: 1,
				ease: Power2.easeOut
			});
		});

		var totalSlides = bannerSlider.slides.length - 2;
		$('#slider-one-total').html('0' + totalSlides);
	}


	// Banner Slider Two //Home Two
	if ($(".slider-two-style2").length > 0) {
		var bannerSlider = new Swiper('.slider-two-style2', {
			spaceBetween: 0,
			slidesPerView: 1,
			mousewheel: false,
			height: 500,
			grabCursor: true,
			loop: true,
			speed: 1400,
			autoplay: {
				delay: 10000,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				prevEl: '.slider-two-button-prev',
				nextEl: '.slider-two-button-next',
			},
		});
		bannerSlider.on('slideChange', function () {
			var csli = bannerSlider.realIndex + 1,
				curnum = $('#slider-two-current');
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: -10,
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: function () {
					TweenMax.to(curnum, 0.1, {
						force3D: true,
						y: 10
					});
					curnum.html('0' + csli);
				}
			});
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: 0,
				delay: 0.3,
				opacity: 1,
				ease: Power2.easeOut
			});
		});

		var totalSlides = bannerSlider.slides.length - 2;
		$('#slider-two-total').html('0' + totalSlides);
	}



	// Banner Slider Three //Home Three
	if ($(".slider-three-style3").length > 0) {
		var bannerSlider = new Swiper('.slider-three-style3', {
			spaceBetween: 0,
			slidesPerView: 1,
			mousewheel: false,
			height: 500,
			grabCursor: true,
			loop: true,
			speed: 1400,
			autoplay: {
				delay: 10000,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'progressbar',
			},
			navigation: {
				prevEl: '.slider-three-button-prev',
				nextEl: '.slider-three-button-next',
			},
		});
		bannerSlider.on('slideChange', function () {
			var csli = bannerSlider.realIndex + 1,
				curnum = $('#slider-three-current');
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: -10,
				opacity: 0,
				ease: Power2.easeOut,
				onComplete: function () {
					TweenMax.to(curnum, 0.1, {
						force3D: true,
						y: 10
					});
					curnum.html('0' + csli);
				}
			});
			TweenMax.to(curnum, 0.2, {
				force3D: true,
				y: 0,
				delay: 0.3,
				opacity: 1,
				ease: Power2.easeOut
			});
		});

		var totalSlides = bannerSlider.slides.length - 2;
		$('#slider-three-total').html('0' + totalSlides);
	}




	if ($('.paroller').length) {
		$('.paroller').paroller({
			factor: 0.2, // multiplier for scrolling speed and offset, +- values for direction control  
			factorLg: 0.4, // multiplier for scrolling speed and offset if window width is less than 1200px, +- values for direction control  
			type: 'foreground', // background, foreground  
			direction: 'horizontal' // vertical, horizontal  
		});
	}


	// Button Hover Animation
	$('.get-in_touch').on('mouseenter', function (e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		$(this).find('span').css({
			top: y,
			left: x
		});
	});


	$('.get-in_touch').on('mouseout', function (e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		$(this).find('span').css({
			top: y,
			left: x
		});
	});




	// Button Hover Animation
	$('.projects_more').on('mouseenter', function (e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		$(this).find('span').css({
			top: y,
			left: x
		});
	});

	$('.projects_more').on('mouseout', function (e) {
		var x = e.pageX - $(this).offset().left;
		var y = e.pageY - $(this).offset().top;

		$(this).find('span').css({
			top: y,
			left: x
		});
	});



	if ($(".odometer").length) {
		var odo = $(".odometer");
		odo.each(function () {
			$(this).appear(function () {
				var countNumber = $(this).attr("data-count");
				$(this).html(countNumber);
			});

		});
	}


	// LightBox Image
	if ($('.lightbox-image').length) {
		$('.lightbox-image').magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			}
		});
	}


	//LightBox Video
	if ($('.lightbox-video').length) {
		$('.lightbox-video').magnificPopup({
			// disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			iframe: {
				patterns: {
					youtube: {
						index: 'youtube.com',
						id: 'v=',
						src: 'https://www.youtube.com/embed/%id%'
					},
				},
				srcAction: 'iframe_src',
			},
			fixedContentPos: false
		});
	}



	//Contact Form Validation
	if ($('#contact-form').length) {
		$('#contact-form').validate({
			rules: {
				username: {
					required: true
				},
				email: {
					required: true
				},
				organization: {
					required: true
				},
				job: {
					required: true
				},
				message: {
					required: true
				}
			}
		});
	}



	// Scroll to a Specific Div
	if ($('.scroll-to-target').length) {
		$(".scroll-to-target").on('click', function () {
			var target = $(this).attr('data-target');
			// animate
			$('html, body').animate({
				scrollTop: $(target).offset().top
			}, 1500);

		});
	}



	// Elements Animation
	if ($('.wow').length) {
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: true, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();
	}


	//Header Search
	if ($('.header-upper__search').length) {
		$('.header-upper__search').on('click', function () {
			$('body').addClass('search-active');
		});
		$('.close-search').on('click', function () {
			$('body').removeClass('search-active');
		});

		$('.search-popup .color-layer').on('click', function () {
			$('body').removeClass('search-active');
		});
	}





	// FullHeight
	function fullHeight() {
		$('.full-height').css("height", $(window).height());
	}




	//Update Header Style and Scroll to Top
	function headerStyle() {
		if ($('.main-header').length) {
			var windowpos = $(window).scrollTop();
			var siteHeader = $('.main-header');
			var scrollLink = $('.scroll-to-top');

			var HeaderHight = $('.main-header').height();
			if (windowpos >= HeaderHight) {
				siteHeader.addClass('fixed-header');
				scrollLink.fadeIn(300);
			} else {
				siteHeader.removeClass('fixed-header');
				scrollLink.fadeOut(300);
			}

		}
	}



	//Hide Loading Box (Preloader)
	function handlePreloader() {
		if ($('.preloader').length) {
			$('.preloader').delay(200).fadeOut(500);
		}
	}


	function thmOwlInit() {
		// owl slider

		if ($(".thm-owl__carousel").length) {
			$(".thm-owl__carousel").each(function () {
				let elm = $(this);
				let options = elm.data('owl-options');
				let thmOwlCarousel = elm.owlCarousel(options);
			});
		}

		if ($(".thm-owl__carousel--custom-nav").length) {
			$(".thm-owl__carousel--custom-nav").each(function () {
				let elm = $(this);
				let owlNavPrev = elm.data('owl-nav-prev');
				let owlNavNext = elm.data('owl-nav-next');
				$(owlNavPrev).on("click", function (e) {
					elm.trigger('prev.owl.carousel');
					e.preventDefault();
				})

				$(owlNavNext).on("click", function (e) {
					elm.trigger('next.owl.carousel');
					e.preventDefault();
				})
			});
		}

	}


	// ===Portfolio===
	function projectMasonaryLayout() {
		if ($(".masonary-layout").length) {
			$(".masonary-layout").isotope({
				layoutMode: "masonry"
			});
		}
		if ($(".post-filter").length) {
			$(".post-filter li")
				.children(".filter-text")
				.on("click", function () {
					var Self = $(this);
					var selector = Self.parent().attr("data-filter");
					$(".post-filter li").removeClass("active");
					Self.parent().addClass("active");
					$(".filter-layout").isotope({
						filter: selector,
						animationOptions: {
							duration: 500,
							easing: "linear",
							queue: false
						}
					});
					return false;
				});
		}

		if ($(".post-filter.has-dynamic-filters-counter").length) {
			// var allItem = $('.single-filter-item').length;
			var activeFilterItem = $(".post-filter.has-dynamic-filters-counter").find(
				"li"
			);
			activeFilterItem.each(function () {
				var filterElement = $(this).data("filter");
				var count = $(".filter-layout").find(filterElement).length;
				$(this)
					.children(".filter-text")
					.append('<span class="count">' + count + "</span>");
			});
		}
	}


	function SmoothMenuScroll() {
		var anchor = $(".scrollToLink");
		if (anchor.length) {
			anchor.children("a").bind("click", function (event) {
				if ($(window).scrollTop() > 10) {
					var headerH = "90";
				} else {
					var headerH = "90";
				}
				var target = $(this);
				$("html, body")
					.stop()
					.animate({
							scrollTop: $(target.attr("href")).offset().top - headerH + "px"
						},
						1200,
						"easeInOutExpo"
					);
				anchor.removeClass("current");
				anchor.removeClass("current-menu-ancestor");
				anchor.removeClass("current_page_item");
				anchor.removeClass("current-menu-parent");
				target.parent().addClass("current");
				event.preventDefault();
			});
		}
	}


	function OnePageMenuScroll() {
		var windscroll = $(window).scrollTop();
		if (windscroll >= 117) {
			var menuAnchor = $(".one-page-scroll-menu .scrollToLink").children("a");
			menuAnchor.each(function () {
				var sections = $(this).attr("href");
				$(sections).each(function () {
					if ($(this).offset().top <= windscroll + 120) {
						var Sectionid = $(sections).attr("id");
						$(".one-page-scroll-menu").find("li").removeClass("current");
						$(".one-page-scroll-menu").find("li").removeClass("current-menu-ancestor");
						$(".one-page-scroll-menu").find("li").removeClass("current_page_item");
						$(".one-page-scroll-menu").find("li").removeClass("current-menu-parent");
						$(".one-page-scroll-menu")
							.find("a[href*=\\#" + Sectionid + "]")
							.parent()
							.addClass("current");
					}
				});
			});
		} else {
			$(".one-page-scroll-menu li.current").removeClass("current");
			$(".one-page-scroll-menu li:first").addClass("current");
		}
	}







	const serviceImgItem = document.querySelectorAll(".service-block_one-inner");

	function followImageCursor(event, serviceImgItem) {
		const contentBox = serviceImgItem.getBoundingClientRect();
		const dx = event.clientX - contentBox.x;
		const dy = event.clientY - contentBox.y;
		serviceImgItem.children[4].style.transform = `translate(${dx}px, ${dy}px)`;
	}
	serviceImgItem.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
			setInterval(followImageCursor(event, item), 1000);
		});
	});




	const serviceImgItemTwo = document.querySelectorAll(".service-block_four-inner");

	function followImageCursorTwo(event, serviceImgItemTwo) {
		const contentBox = serviceImgItemTwo.getBoundingClientRect();
		const dx = event.clientX - contentBox.x;
		const dy = event.clientY - contentBox.y;
		serviceImgItemTwo.children[2].style.transform = `translate(${dx}px, ${dy}px)`;
	}
	serviceImgItemTwo.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
			setInterval(followImageCursorTwo(event, item), 1000);
		});
	});




	const partnersImgItem = document.querySelectorAll(".partners-one li");

	function followPartnersCursor(event, partnersImgItem) {
		const contentBox = partnersImgItem.getBoundingClientRect();
		const dx = event.clientX - contentBox.x;
		const dy = event.clientY - contentBox.y;
		//partnersImgItem.children[0].style.mix-blend-mode = 'difference';
		partnersImgItem.children[1].style.transform = `translate(${dx}px, ${dy}px)`;
	}
	partnersImgItem.forEach((item, i) => {
		item.addEventListener("mousemove", (event) => {
			setInterval(followPartnersCursor(event, item), 1000);
		});
	});




	const portfolio_listss = gsap.utils.toArray(".project-detail_image img")
	if (portfolio_listss) {
		portfolio_listss.forEach((item, i) => {
			gsap.from(item, {
				scrollTrigger: {
					trigger: item,
					start: "top center",
					scrub: 1.2,
				},
				scale: 2.0,
				duration: 1,
			})
		})
	}




	//  Animation Fade Left End
	/////////////////////////////////////////////////////
	// CURSOR
	var cursor = $(".cursor"),
		follower = $(".cursor-follower");

	var posX = 0,
		posY = 0;

	var mouseX = 0,
		mouseY = 0;

	TweenMax.to({}, 0.016, {
		repeat: -1,
		onRepeat: function () {
			posX += (mouseX - posX) / 9;
			posY += (mouseY - posY) / 9;

			TweenMax.set(follower, {
				css: {
					left: posX - 12,
					top: posY - 12
				}
			});

			TweenMax.set(cursor, {
				css: {
					left: mouseX,
					top: mouseY
				}
			});
		}
	});

	$(document).on("mousemove", function (e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	});
	//circle
	$(".theme-btn, a").on("mouseenter", function () {
		cursor.addClass("active");
		follower.addClass("active");
	});
	$(".theme-btn, a").on("mouseleave", function () {
		cursor.removeClass("active");
		follower.removeClass("active");
	});
	// CURSOR End





	// Style 4 Zoom out
	let splitTitleLines = gsap.utils.toArray(".title-anim");
	splitTitleLines.forEach(splitTextLine => {
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: splitTextLine,
				start: 'top 90%',
				end: 'bottom 60%',
				scrub: false,
				markers: false,
				toggleActions: 'play none none none'
			}
		});
		const itemSplitted = new SplitText(splitTextLine, {
			type: "words, lines"
		});
		gsap.set(splitTextLine, {
			perspective: 400
		});
		itemSplitted.split({
			type: "lines"
		})
		tl.from(itemSplitted.lines, {
			duration: 1,
			delay: 0.3,
			opacity: 0,
			rotationX: -80,
			force3D: true,
			transformOrigin: "top center -50",
			stagger: 0.1
		});
	});




	// Add Current Class Auto
	function dynamicCurrentMenuClass(selector) {
		let FileName = window.location.href.split("/").reverse()[0];

		selector.find("li").each(function () {
			let anchor = $(this).find("a");
			if ($(anchor).attr("href") == FileName) {
				$(this).addClass("current");
			}
		});
		// if any li has .current elmnt add class
		selector.children("li").each(function () {
			if ($(this).find(".current").length) {
				$(this).addClass("current");
			}
		});
		// if no file name return
		if ("" == FileName) {
			selector.find("li").eq(0).addClass("current");
		}
	}

	if ($('.main-header .header-lower .main-menu .navigation').length) {
		dynamicCurrentMenuClass($('.main-header .header-lower .main-menu .navigation'));
	}


	//Write Here Nu



















	/* ==========================================================================
	   When document is Scrollig, do
	   ========================================================================== */

	$(window).on('scroll', function () {
		headerStyle();
	});

	/* ==========================================================================
	   When document is loading, do
	   ========================================================================== */

	$(window).on('load', function () {
		handlePreloader();
		thmOwlInit();
		projectMasonaryLayout();
		SmoothMenuScroll();
		OnePageMenuScroll();
		fullHeight();




		if ($('.curved-circle').length) {
			$('.curved-circle').circleType({
				position: 'absolute',
				dir: 1,
				radius: 60,
				forceHeight: true,
				forceWidth: true
			});
		}




	});

})(window.jQuery);