/*!
 * jQuery Mobile Basic Carousel
 * Source: https://github.com/Golodhros/jqm-basic-carousel.git
 * Demo: http://jsfiddle.net/Golodhros/PKKXp/
 * Web: http://www.marcosiglesias.es
 *
 * Author: Marcos Iglesias Valle
 * Features:
 * - Lightweight and with little dependencies (no jQuery UI library)
 * - Responsive (although would require a reset in order to adapt to viewport widht changes)
 * - Just horizontal swipe events
 * - Configurable transition effect and speed
 * - Configurable AutoPlay
 * 
 * Requirements: 
 * - jQuery 1.7.2 (although maybe a lower version will be OK)
 * - jquery.easing 1.3
 * References:
 * - http://docs.jquery.com/Plugins/Authoring
 */

/**
 * Most useful Methods:
 * $carouselElement.carousel('swipeLeft')	=> Moves the slide to the left if possible
 * $carouselElement.carousel('swipeRight')	=> Moves the slide to the right if possible
 * $carouselElement.carousel('resetCarousel')	=> Resets the carousel, quite useful with orientation changes or page widht changes
 * $carouselElement.carousel('getCurrentSlideIndex')	=> Returns the current slide index
 * $carouselElement.carousel('getSlidersMaxHeight')	=> Returns the maximum height of the loaded slides, useful in order to set this width programatically insted of by css as currently
 * */


/**
 * MarkUp Example
   <div class="carousel-wrapper">
		<div class="carousel" id="carousel">
			<div id="slide-0" class="slide" ><img class="slide-container" src="images/dummy-scrshot-1.png" title="App Screenshot"/></div>
			<div id="slide-1" class="slide" ><img class="slide-container" src="images/dummy-scrshot-2.png" title="App Screenshot"/></div>
			<div id="slide-2" class="slide" ><img class="slide-container" src="images/dummy-scrshot-3.png" title="App Screenshot"/></div>
		</div>
	</div>
	<nav class="carousel-position">
		<span id="position"><em class="on">•</em><em>•</em><em>•</em></span>
	</nav>
	<script>
		(function($){
			$(".carousel-wrappper").carousel(oOptionalConfigObject);
		})(jQuery);
	</script>
 */

;(function ( $, window, document, undefined ) {
	"use strict";
	var config ={
		iTransitionSpeed		:500,
		sTransitionType			:'easeOutCirc',
		sInitEvent				:'pageshow',
		iNumSlides				:0,
		iSliderWidth			:0,
		sPageContainer			:'.ui-page',
		//Internal classes TODO: to remove
		sCarouselWrapperClass	:'.carousel-wrapper',
		sCarouselElementClass	:'.carousel',
		sSlideClass				:'.slide',
		sContentClass			:'.slide-container',
		sSlideIdPrefix			:'#slide-', 
		sCounterElements		:".position em",
		sCounterOnClassName		:'on',
		iAutoPlayInterval		:2000,
		isAutoPlay				:false,
		isSwipeSet				:false
	},
	methods = {
		iSlideCounter : 0,

		//	Options loading and events setting
		init: function(oConfigOptions){
			// We extend the carousel configuration with the custom options given
			config = $.extend( config, oConfigOptions );

			// We add the events to the page
			methods.setCarouselInit();
		},	
		
		//	We wait until the configurable event in order to get updated info about the width of the carousel
		setCarouselInit: function(){
			$(document).on( config.sInitEvent, config.sPageContainer, methods.handleCarouselInit);
		},
		
		//	If it is not the first time the Carousel is loaded in the Dom we reset the Carousel
		handleCarouselInit: function(){
			if(!config.isSwipeSet){
			    methods.setSliderInfo();
				methods.bindOrientationChange();
				config.isSwipeSet = true;
			}else{
				methods.resetCarousel()
			}
		    methods.bindSwipeEvents();
		    methods.setAutoPlay();
		},
		
		//	We obtain the width of the responsive carousel and apply it to the containers of the slide elements and its content
		setSliderInfo: function( ){
			config.iNumSlides = $(config.sCarouselElementClass).find(config.sSlideClass).length;
			config.iSliderWidth	= $(config.sCarouselWrapperClass).width();
	
			$(config.sCarouselWrapperClass)
				.add(config.sSlideClass)
				.add(config.sContentClass)
				.css({width: config.iSliderWidth});
			$(config.sCarouselElementClass)
				.css({width: config.iSliderWidth*config.iNumSlides});
		},

		setAutoPlay: function(){
			if( config.isAutoPlay ){
				methods.autoPlayInterval = setInterval(function() {
					if( methods.isLastSlide() ){
						methods.resetSlidePosition();
					}else{
						methods.swipeLeft();
					}
				}, config.iAutoPlayInterval);
			}
		},
		
		//	Obtains the Max Height of the Carousel contents, in order to set the rest of them
		//	TODO: Make this be more useful
		getSlidersMaxHeight: function(){
			var $sliders	= $(config.sContentClass),
				iNumSliders	= $sliders.length,
				iMaxHeight	= 0, 
				i			= 0;
				
			for(; i<iNumSliders; i++){
				if($sliders.eq(i).height() > iMaxHeight){
					iMaxHeight = $sliders.eq(i).height();
				}
			}
			return iMaxHeight;
		},
		
		//	Resets the navigation dots on the bottom of the carousel
		resetDotCounter: function(){
			$(config.sCounterElements).each(function(item){ 
				$(config.sCounterElements).eq(item).removeClass(config.sCounterOnClassName);
			});
		},
		
		//	Updates the navigation dots with the proper slide position
		setDotCounter: function( iElement ){
			methods.resetDotCounter();
			$(config.sCounterElements).eq( iElement ).addClass(config.sCounterOnClassName);
		},

		isLastSlide: function(){
			return (methods.iSlideCounter === config.iNumSlides - 1) ? true : false;
		},
		
		//	Returns the selected Slide Index
		getCurrentSlideIndex: function(){
			return methods.iSlideCounter;
		},
		
		//	Updates the Slide Counter integer
		setSlideCounter: function( iPosition ){
			methods.iSlideCounter = iPosition;
		},
		
		//	Setting of the callbacks for swipe events
		bindSwipeEvents: function(){
			if(!$(config.sCarouselElementClass)){return;}
			$(config.sCarouselElementClass)
				.on( "swiperight", $(config.sCarouselElementClass), $.proxy(methods.swipeRight, this))
				.on( "swipeleft", $(config.sCarouselElementClass), $.proxy(methods.swipeLeft, this));
		},
		
		//	When an orientation change event occurs, we need to reset the carousel in order to have the proper widths for the slides
		bindOrientationChange: function(){
			$(document).on('orientationchange', config.sPageContainer, function(){
		    	methods.resetCarousel();
			});
		},
		
		//	Depending on the animation direction we set the margin of the slide
		animateSlider: function( iElement, sDirection ){
			var margin = sDirection === 'right' ? 0 : - config.iSliderWidth;
			$(config.sSlideIdPrefix + iElement )
				.animate({
					marginLeft: margin
				}, config.iTransitionSpeed, config.sTransitionType);
		},
		
		//	Callback for right oriented swipe movements
		swipeRight: function(){
			//First checks if we are at the start of the Carousel
			if( methods.iSlideCounter === 0 ){return;}
			methods.iSlideCounter--;
			methods.animateSlider( methods.iSlideCounter, "right" );
			methods.setDotCounter( methods.iSlideCounter );
		},

		//	Callback for left oriented swipe movements
		swipeLeft: function(){
			//	First checks if we are at the end of the Carousel			
			if( methods.iSlideCounter >= config.iNumSlides - 1 ) { return; }
			methods.animateSlider( methods.iSlideCounter, "left" );
			methods.iSlideCounter++;
			methods.setDotCounter( methods.iSlideCounter );
		},

		stopAutoPlay: function(){
			if(methods.autoPlayInterval){
				window.clearInterval( methods.autoPlayInterval );
			}
		},
		
		//	Resets the carousel by setting again the containers and content elements widths
		resetCarousel: function(){
			methods.stopAutoPlay();
			methods.resetSlidePosition();
			methods.setSliderInfo();
		},
		
		//	Moves the slider to the start position
		resetSlidePosition: function(){
			var iCurrentSlide	= methods.iSlideCounter;

			methods.setDotCounter( 0 );
			methods.setSlideCounter( 0 );

			if( iCurrentSlide !== 0){
				for(var i=iCurrentSlide; i>-1; i--){
					methods.animateSlider( i, "right" );
				}			
			}
		}
	};
	
    $.fn.carousel = function(method) {
		// Method calling logic
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if( typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.carousel');
		}
    };
})( jQuery, window, document );