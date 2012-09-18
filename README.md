jQuery Mobile Basic Carousel
====================================

Very basic Carousel Plugin for jQuery Mobile

Demo Page: http://marcosiglesias.es/plugins/jqm-basic-carousel/demo.html

Features
 - Lightweight 
 - Little dependencies, just jquery easing library
 - Responsive (although would require a reset in order to adapt to viewport width changes)
 - Just for horizontal swipe events
 - Configurable transition effect type and transition speed

Configuration Instructions

	The Default configuration options are the following:
	
		iTransitionSpeed	:500
		sTransitionType		:'easeOutCirc'
		sInitEvent			:'pageshow'
	
	In order to change any of this parameters, you will need just to pass an object with the new value as a reference in the initialization. 
	For example:
		$(carouselElementSelector).carousel({iTransitionSpeed	:1500});

Requirements

	- jQuery 1.7.2 (although maybe an older version will be OK)
	- jquery.easing 1.3
	
Installation Instructions

 	In order to use this plugin you just need to include the above libraries and execute 
 		$(carouselWrapperSelector).carousel();
 		
	The required markup for a three element Carousel would be:
		<div class="carousel-wrapper">
			<div class="carousel" id="carousel">
				<div id="slide-0" class="slide" >
					<div class="slide-container"></div>
				</div>
				<div id="slide-1" class="slide" >
					<div class="slide-container"></div>
				</div>
				<div id="slide-2" class="slide" >
					<div class="slide-container"></div>
				</div>
			</div>
		</div>
		<nav class="carousel-position">
			<span id="position"><em class="on">•</em><em>•</em><em>•</em></span>
		</nav>
	In this specific case, we will initialize the Carousel with:
		<script>
			(function($){
				$(".carousel-wrappper").carousel();
			})(jQuery);
		</script>
	
Operating Instructions

	Once initialized, the plugin offers several methods, like:
		$carouselElement.carousel('swipeLeft')				=> Moves the slide to the left if possible
		$carouselElement.carousel('swipeRight')				=> Moves the slide to the right if possible
		$carouselElement.carousel('resetCarousel')			=> Resets the carousel, quite useful with orientation changes or page widht changes
		$carouselElement.carousel('getCurrentSlideIndex')	=> Returns the index of the current Slide, starting from 0
		$carouselElement.carousel('getSlidersMaxHeight')	=> Returns the maximum height of the loaded slides, useful in order to set this width programatically insted of by css as currently
		
Known Bugs
	
	- Right now, you need to specify the maximum height of the content in the carousel throught css

Future Improvements

	- Cleaning of unnecessary classes in the markup
	- Make it horizontally responsive
	- Convert the plugin structure to a widget structure
	- Polish Up and add more tests

Credits and Acknowledgements

	References:
 		- http://docs.jquery.com/Plugins/Authoring
 		- http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/
 		
Copyright and Licensing Information

Changelog