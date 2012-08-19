/*!
 * jQuery Mobile Basic Carousel
 * Source: https://github.com/Golodhros/jqm-basic-carousel.git
 * Demo: 
 * Web: http://www.marcosiglesias.es
 *
 * Author: Marcos Iglesias Valle
 * Features:
 * - Lightweight and with little dependencies (no jQuery UI library)
 * - Responsive (although would require a reset in order to adapt to viewport widht changes)
 * - Just horizontal swipe events
 * - Configurable transition effect and speed
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
 */


(function($) {
	"use strict";
	var config ={
		iNumSlides				:0,
		iSliderWidth			:0,
		iTransitionSpeed		:500,
		sTransitionType			:'easeOutCirc',
		sPageContainer			:'.ui-page',
		sInitEvent				:'pageshow',
		//Internal classes TODO: to remove
		sCarouselWrapperClass	:'.carousel-wrapper',
		sCarouselElementClass	:'.carousel',
		sSlideClass				:'.slide',
		sContentClass			:'.slide-container',
		sSlideIdPrefix			:'#slide-', 
		sCounterElementsQuery	:".position em",
		sCounterOnClassName		:'on'
	},
	methods = {
		iSlideCounter : 0,

		//	Options loading and events setting
		init: function(oConfigOptions){
			// We extend the carousel configuration with the custom options given
			config = $.extend( config, oConfigOptions );
			
			// We add the events to the page
			methods.addEvents();
		},	
		
		//	We wait until the configurable event in order to get updated info about the width of the carousel
		addEvents: function(){
			$(document).on( config.sInitEvent, config.sPageContainer, function(){
				config.iNumSlides = $(config.sCarouselElementClass).find(config.sSlideClass).length;
				methods.setSliderInfo();
				methods.bindSwipeEvents();
			});
		},
		
		//	We obtain the width of the responsive carousel and apply it to the containers of the slide elements and its content
		setSliderInfo: function(){
			config.iSliderWidth	= $(config.sCarouselWrapperClass).width();
			
			$(config.sCarouselWrapperClass)
				.find(config.sSlideClass)
				.add(config.sContentClass)
				.css({width: config.iSliderWidth});
			$(config.sCarouselElementClass)
				.css({width: config.iSliderWidth*config.iNumSlides});
		},
		
		//	Obtains the Max Height of the Carousel contents, in order to set the rest of them
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
		resetCounters: function(){
			$(config.sCounterElementsQuery).each(function(item){ 
				$(config.sCounterElementsQuery).eq(item).removeClass(config.sCounterOnClassName);
			});
		},
		
		//	Updates the navigation dots with the proper slide position
		selectCounter: function( iElement ){
			$(config.sCounterElementsQuery).eq( iElement ).addClass(config.sCounterOnClassName);
		},
		
		//	Depending on the animation direction we set the margin of the slide
		animateSlider: function( iElement, sDirection ){
			var margin = sDirection === 'right' ? 0 : - config.iSliderWidth;
			$(config.sSlideIdPrefix + iElement )
				.animate({
					marginLeft: margin
				}, config.iTransitionSpeed, config.sTransitionType);
		},
		
		//	Setting of the callbacks for swipe events
		bindSwipeEvents: function(){
			if(!$(config.sCarouselElementClass)){return;}
			$(config.sCarouselElementClass)
				.on( "swiperight", $(config.sCarouselElementClass), $.proxy(this.swipeRight, this))
				.on( "swipeleft", $(config.sCarouselElementClass), $.proxy(this.swipeLeft, this));
		},
		
		//	Callback for right oriented swipe movements
		swipeRight: function(){
			var $this = methods;
			
			//First checks if we are at the start of the Carousel
			if( $this.iSlideCounter === 0 ){return;}
			$this.iSlideCounter--;
			$this.animateSlider( $this.iSlideCounter, "right" );
			$this.resetCounters();
			$this.selectCounter( $this.iSlideCounter );
		},

		//	Callback for left oriented swipe movements
		swipeLeft: function(){
			var $this = methods;
			
			//	First checks if we are at the end of the Carousel			
			if( $this.iSlideCounter >= config.iNumSlides - 1 ) { return; }

			$this.animateSlider( $this.iSlideCounter, "left" );
			$this.iSlideCounter++;
			$this.resetCounters();
			$this.selectCounter( $this.iSlideCounter );
		},
		
		//	Resets the carousel by setting again the containers and content elements widths
		resetCarousel: function(){
			this.setSliderInfo();
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
})(jQuery);