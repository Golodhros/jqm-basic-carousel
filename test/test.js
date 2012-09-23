$('#testing-page').live('pageinit', function(event) {
    
	$(document).on('pageshow', function(){
		var $carouselWrapperElement = $('.carousel-wrapper'),
			$carouselElement 		= $('.carousel');

		module("Basic Carousel most useful public methods");
		
		test( "Get Current Slide Index Test", function() {
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});
		
		test( "Swipe Left Test", function() {
			$carouselWrapperElement.carousel('swipeLeft');
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 1);	
		});
		
		test( "Swipe Right Test", function() {
			$carouselWrapperElement.carousel('swipeRight');
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});
		
		test( "Reset Carousel Test", function() {
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeRight');
			$carouselWrapperElement.carousel('resetCarousel');
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});
		
		test( "Orientation Change Test", function() {
			$carouselWrapperElement.carousel('swipeLeft');
			$('.ui-page').trigger('orientationchange');			
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});
		
		module("Basic Carousel internal methods");
		
		test( "Counters Test", function() {
			$carouselWrapperElement.carousel('setDotCounter', 0);
			equal( $('.position em').eq(0).hasClass('on'), true);	
		});

		test( "Counter Changing Test", function() {
			$carouselWrapperElement.carousel('setDotCounter', 1);
			$carouselWrapperElement.carousel('setDotCounter', 0);
			$carouselWrapperElement.carousel('setDotCounter', 2);
			equal( $('.position em').eq(2).hasClass('on'), true);	
		});

		test( "Counters Reset Test", function() {
			$carouselWrapperElement.carousel('setDotCounter', 1);
			$carouselWrapperElement.carousel('setDotCounter', 0);
			$carouselWrapperElement.carousel('setDotCounter', 2);
			$carouselWrapperElement.carousel('resetDotCounter');
			equal( $('.position em').find('on').length, 0);	
		});
		
		module("Basic Carousel public methods stress test");

		test( "Two Swipes Test", function() {
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeRight');
			$carouselWrapperElement.carousel('swipeRight');
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});
		
		test( "Zig-Zag Swipes Test", function() {
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeRight');
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeRight');
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});

		test( "Three Swipes Test", function() {
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeLeft');
			$carouselWrapperElement.carousel('swipeRight');
			$carouselWrapperElement.carousel('swipeRight');
			$carouselWrapperElement.carousel('swipeRight');
			equal( $('.carousel-wrapper').carousel('getCurrentSlideIndex'), 0);	
		});
	});
});
