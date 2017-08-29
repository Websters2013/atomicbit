( function(){

    "use strict";

    $( function(){

        $.each( $( '.sub-menu' ), function () {

            new Sliders( $(this) );

        } );

    } );

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _subMenuSwiper = _obj.find( '.sub-menu__swiper' ),
            _subMenuIten = _subMenuSwiper.find( '.sub-menu__item' ),
            _window = $( window );

        //private methods
        var _initSlider = function() {

                _subMenuSwiper = new Swiper ( _subMenuSwiper, {
                    autoplay: false,
                    speed: 500,
                    effect: 'slide',
                    slidesPerView: 'auto',
                    loopAdditionalSlides: 0,
                    loop: false
                } );

            },
            _onEvent = function() {

            },
            _init = function() {
                _onEvent();
                _initSlider ();
            };

        //public properties

        //public methods

        _init();
    };

} )();