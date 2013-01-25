# jQuery Mobile Basic Carousel

#### Simple Carousel Plugin for jQuery Mobile

<dl>
  <dt>Plugin Demo Page</dt>
  <dd>http://marcosiglesias.es/plugins/jqm-carousel/demo.html</dd>
  <dt>Widget Demo Page</dt>
  <dd>http://marcosiglesias.es/plugins/jqm-carousel/demo-widget.html</dd>
</dl>

### Features
 - Lightweight 
 - Little dependencies, just jquery easing library
 - Responsive (although would require a reset in order to adapt to viewport width changes)
 - Just for horizontal swipe events
 - Configurable transition effect type and transition speed
 - Configurable AutoPlay and AutoPlay Time Interval

### Configuration Instructions

The Default configuration options are the following:
	
		iTransitionSpeed	:500
		iAutoPlayInterval	:2000 (2 seconds)
		sTransitionType		:'easeOutCirc'
		sInitEvent			:'pageshow'
	
In order to change any of this parameters, you will need just to pass an object with the new value as a reference in the initialization. For example:

		$(carouselElementSelector).carousel({iTransitionSpeed	:1500});
		$(carouselElementSelector).carousel({isAutoPlay: true, iAutoPlayInterval :3500});

### Requirements

* jQuery 1.7.2 (although maybe an older version will be OK)
* <a href="http://gsgd.co.uk/sandbox/jquery/easing/" title="Check jQuery Easing Plugin Homepage">jquery.easing 1.3</a>
	
### Installation Instructions

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
	
### Operating Instructions

Once initialized, the plugin offers several methods, like:

<dl>
  <dt>$carouselElement.carousel('swipeLeft')</dt>
  <dd>Moves the slide to the left if possible</dd>
  <dt>$carouselElement.carousel('swipeRight')</dt>
  <dd>Moves the slide to the right if possible</dd>
  <dt>$carouselElement.carousel('resetCarousel')</dt>
  <dd>Resets the carousel, quite useful with orientation changes or page widht changes</dd>
  <dt>$carouselElement.carousel('getCurrentSlideIndex')</dt>
  <dd>Returns the index of the current Slide, starting from 0</dd>
  <dt>$carouselElement.carousel('getSlidersMaxHeight')</dt>
  <dd>Returns the maximum height of the loaded slides, useful in order to set this width programatically insted of by css as currently</dd>
</dl>
		
## New Widget Version (Needs Testing)

Uses the same markup, but it just needs the carrousel-wrapper element to have data-role="carousel" for it to initialize automatically (with the pageshow event). Example:

		<div class="carousel-wrapper" data-role="carousel">

The position of the widget script needs also to change, as you can see in the <a href="http://marcosiglesias.es/plugins/jqm-carousel/demo-widget.html" title="demo widget page">demo page</a>.

### Known Bugs
	
* Right now, you need to specify the maximum height of the content in the carousel throught css

### Future Improvements
	
* Cleaning of unnecessary classes in the markup
* Make it horizontally responsive
* Polish Up and add more tests
* Lazy loading of the images that could include
* Add more navigation options (prev, next and pause buttons)

### Credits and Acknowledgements

* Official jQuery Documentation: <a href="http://docs.jquery.com/Plugins/Authoring" title="Check Official jQuery Plugin Creation Docs">Plugins/Authoring</a>
* Adam J. Sontag: <a href="http://ajpiano.com/widgetfactory/#slide1" title="Check Adam Sontag Slideshow about the Widget Factory">The jQuery UI Widget Factory, WAT?</a>
* Addy Osmani on Smashing Magazine:<a href="http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/" title="Check Addy Osmani's Article in Smashing Magazine">Essential jQuery Plugin Patterns</a>
 		
### Copyright and Licensing Information

### Changelog

* v1.0 - Initial Version
* v1.1 - Changed Plugin Design Pattern
* v1.2 - Added Widget Version