/*!
 * jQuery Mobile Basic Carousel Widget
 * Author: @golodhros
 * Widget pattern application based on @addyosmani article on Smashing Magazine
 *
 * Copyright (c) 2013 Marcos Iglesias Valle
 * Licensed under the MIT license.
 */

;(function ( $, window, document, undefined ) {

    $.widget( "mobile.carousel", $.mobile.widget, {

        //Options to be used as defaults
        options: {
            iTransitionSpeed        :500,
            sTransitionType         :'easeOutCirc',
            iNumSlides              :0,
            iSliderWidth            :0,
            isAutoPlay              :false,
            iAutoPlayInterval       :2000,
            // Doubts
            sCounterElements        :".position em",
            sCounterOnClassName     :'on',
            sSlideIdPrefix          :'#slide-', 
            sSlideClass             :'.slide',
            sCarouselElementClass   :'.carousel',
            sContentClass           :'.slide-container'
        },

        _iSlideCounter : 0,

        _create: function() {
            // _create will automatically run the first time this 
            // widget is called.

            this._setSliderInfo();
            this._bindOrientationChange();
            this._bindSwipeEvents();
            this._setAutoPlay();
        },

        //  Depending on the animation direction we set the margin of the slide
        _animateSlider: function( iElement, sDirection ){
            var margin = sDirection === 'right' ? 0 : - this.options.iSliderWidth;
            $(this.options.sSlideIdPrefix + iElement )
                .animate({
                    marginLeft: margin
                }, this.options.iTransitionSpeed, this.options.sTransitionType);
        },

        //  When an orientation change event occurs, we need to reset the carousel in order to have the proper widths for the slides
        _bindOrientationChange: function(){
            var self = this;
            $(document).on('orientationchange', function(){
                self.resetCarousel();
            });
        },

        //  Setting of the callbacks for swipe events
        _bindSwipeEvents: function(){
            if(!$(this.options.sCarouselElementClass).length){return;}
            
            $(this.options.sCarouselElementClass)
                .on( "swiperight", $(this.options.sCarouselElementClass), $.proxy(this.swipeRight, this))
                .on( "swipeleft", $(this.options.sCarouselElementClass), $.proxy(this.swipeLeft, this));
        },

        //  _iSlideCounter contains info about the current slide, iNumSlides is the total slide number
        _isLastSlide: function(){
            return (this._iSlideCounter === this.options.iNumSlides - 1) ? true : false;
        },

        //  Moves the slider to the start position
        _resetSlidePosition: function(){
            var iCurrentSlide   = this._iSlideCounter;

            this.setDotCounter( 0 );
            this._setSlideCounter( 0 );

            if( iCurrentSlide !== 0){
                for(var i=iCurrentSlide; i>-1; i--){
                    this._animateSlider( i, "right" );
                }           
            }
        },

        //  Resets the navigation dots on the bottom of the carousel
        resetDotCounter: function(){
            var options = this.options;
            $(options.sCounterElements).each(function(item){ 
                $(options.sCounterElements).eq(item).removeClass(options.sCounterOnClassName);
            });
        },

        //  Sets the AutoPlay feature
        _setAutoPlay: function(){
            if( this.options.isAutoPlay ){
                this._autoPlayInterval = setInterval(function() {
                    if( this._isLastSlide() ){
                        this._resetSlidePosition();
                    }else{
                        this.swipeLeft();
                    }
                }, this.options.iAutoPlayInterval);
            }
        },

        //  Updates the navigation dots with the proper slide position
        setDotCounter: function( iElement ){
            this.resetDotCounter();
            $(this.options.sCounterElements).eq( iElement ).addClass(this.options.sCounterOnClassName);
        },

        //  Updates the Slide Counter integer
        _setSlideCounter: function( iPosition ){
            this._iSlideCounter = iPosition;
        },

        //  We obtain the width of the responsive carousel and apply it to the containers of the slide elements and its content
        _setSliderInfo: function(){
            var $el             = $(this.element),
                iNumSlides      = $el.find(this.options.sSlideClass).length,
                iSliderWidth    = $el.width();
            
            $el
                .add(this.options.sSlideClass)
                .add(this.options.sContentClass)
                .css({width: iSliderWidth});
            $(this.options.sCarouselElementClass)
                .css({width: iSliderWidth*iNumSlides});

            this.options.iNumSlides = iNumSlides;
            this.options.iSliderWidth = iSliderWidth;
        },

        // Public methods that can be called externally: 
        // $("#myelem").carousel( "resetCarousel", arguments );

        //  Returns the selected Slide Index
        getCurrentSlideIndex: function(){
            return this._iSlideCounter;
        },

        //  Resets the carousel by setting again the containers and content elements widths
        resetCarousel: function(){
            this.stopAutoPlay();
            this._resetSlidePosition();
            this._setSliderInfo();
        },

        //  Stops the Autoplay feature if present
        stopAutoPlay: function(){
            if(this._autoPlayInterval){
                window.clearInterval( this._autoPlayInterval );
            }
        },

        //  Callback for left oriented swipe movements
        swipeLeft: function(){
            //  First checks if we are at the end of the Carousel           
            if( this._isLastSlide() ) { return; }
            
            this._animateSlider( this._iSlideCounter, "left" );
            this._iSlideCounter++;
            this.setDotCounter( this._iSlideCounter );
        },

        //  Callback for right oriented swipe movements
        swipeRight: function(){
            //First checks if we are at the start of the Carousel
            if( this._iSlideCounter === 0 ){return;}

            this._iSlideCounter--;
            this._animateSlider( this._iSlideCounter, "right" );
            this.setDotCounter( this._iSlideCounter );
        },

        // Destroy an instantiated plugin and clean up modifications 
        // the widget has made to the DOM
        destroy: function () {
            $.Widget.prototype.destroy.call(this);
        }
    });

    //  This sets the self-init of the widget on an element with
    //  data-role="carousel" on pagecreate
    $(document).bind("pageshow", function (e) {
        $(e.target).find(":jqmData(role='carousel')").carousel({});
    });

})( jQuery, window, document );