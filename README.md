# jQuery Mobile Basic Carousel

<strong>Simple</strong> and <strong>Lightweight</strong> carousel widget for jQuery Mobile applications. It can be used as an <strong>image slider</strong> or as a <strong>page carousel</strong> wrapping all kind of content.

Check the <a href="http://www.marcosiglesias.es/jqm-carousel/demo/" title="jQuery Mobile Basic Carousel Demo Page">Demo Page</a>.

### Features
- <strong>Lightweight (7Kb total)</strong>
- Little dependencies (just jquery easing)
- <strong>Responsive</strong>
- <strong>AutoPlay</strong> with configurable AutoPlay Time Interval
- Configurable transition effect type and transition speed

### Requirements

* Works with jQuery Mobile from 1.1 up to 1.3.1
* Needs <a href="http://gsgd.co.uk/sandbox/jquery/easing/" title="Check jQuery Easing Plugin Homepage">jquery.easing 1.3</a>


### Installation Instructions

The carousel widget script needs to be loaded just after the jquery-mobile library, as you can see in the demo page.

It needs the carrousel-wrapper element to have data-role="carousel" for it to initialize automatically (with the pageshow event). The markup for a three element Carousel would be:

        <div class="carousel-wrapper" data-role="carousel">
            <div class="carousel">
                 <div class="slide-0 slide">
                     <div class="slide-container"></div>
                 </div>
                 <div class="slide-1 slide">
                     <div class="slide-container"></div>
                 </div>
                <div class="slide-2 slide">
                    <div class="slide-container"></div>
                </div>
            </div>
        </div>

Then you can add the navigation where you want, with this markup:

        <nav class="carousel-position">
            <span id="position"><em class="on">•</em><em>•</em><em>•</em></span>
        </nav>

Fork this project or visit the <a href="http://www.marcosiglesias.es/jqm-carousel/demo/" title="jQuery Mobile Basic Carousel Demo Page">Demo Page</a> in order to see it in action right away!

### Configuration Instructions

The Default configuration options are the following:

		iTransitionSpeed	:500
		iAutoPlayInterval	:2000 (ms)
		sTransitionType		:'easeOutCirc'
		sInitEvent			:'pageshow'

In order to change any of this parameters, you will need just to pass an object with the new value as a reference in the initialization. For example:

		$(carouselElementSelector).carousel({iTransitionSpeed	:1500});
		$(carouselElementSelector).carousel({isAutoPlay: true, iAutoPlayInterval :3500});

### Operating Instructions

Once initialized, the plugin offers several methods, like:

<dl>
  <dt>$carouselElement.carousel('swipeLeft')</dt>
  <dd>Animates the slide to the left if possible</dd>
  <dt>$carouselElement.carousel('swipeRight')</dt>
  <dd>Animates the slide to the right if possible</dd>
  <dt>$carouselElement.carousel('resetCarousel')</dt>
  <dd>Resets the carousel, quite useful with orientation changes or page width changes</dd>
  <dt>$carouselElement.carousel('getCurrentSlideIndex')</dt>
  <dd>Returns the index of the current Slide, starting from 0</dd>
  <dt>$carouselElement.carousel('getSlidersMaxHeight')</dt>
  <dd>Returns the maximum height of the loaded slides, useful in order to set this width programatically insted of by css as currently</dd>
  <dt>$carouselElement.carousel('stopAutoPlay')</dt>
  <dd>Stops the Autoplay feature</dd>
  <dt>$carouselElement.carousel('destroy')</dt>
  <dd>Removes the carousel from the page</dd>
</dl>

### Known Bugs

* Right now, you need to specify the maximum height of the content in the carousel throught css

### Future Improvements

* Remove jQuery easing and use CSS3 Animations
* Add more tests
* Add more navigation options (prev, next and pause buttons)

### Credits and Acknowledgements

* Official jQuery Documentation: <a href="http://docs.jquery.com/Plugins/Authoring" title="Check Official jQuery Plugin Creation Docs">Plugins/Authoring</a>
* Adam J. Sontag: <a href="http://ajpiano.com/widgetfactory/#slide1" title="Check Adam Sontag Slideshow about the Widget Factory">The jQuery UI Widget Factory, WAT?</a>
* Addy Osmani on Smashing Magazine:<a href="http://coding.smashingmagazine.com/2011/10/11/essential-jquery-plugin-patterns/" title="Check Addy Osmani's Article in Smashing Magazine">Essential jQuery Plugin Patterns</a>

### Copyright and Licensing Information

Copyright (c) 2013 Marcos Iglesias Valle
Licensed under the MIT license.

### Changelog

* v1.0 - Initial Version
* v1.1 - Changed Plugin Design Pattern
* v1.2 - Added Widget Version
* v1.5 - Removed the plugin version and added Autoplay option