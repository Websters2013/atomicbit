( function(){

    "use strict";

    $( function(){

        $( window ).on( {
            'load': function () {

                $('html, body').animate({scrollTop: 0},1);

            }
        } );

        $.each( $( '.sub-menu' ), function () {

            new Sliders( $(this) );

        } );

        $('.site').each( function() {
            new Site( $(this) );
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

    var Site = function(obj) {

        //private properties
        var _self = this,
            _obj = obj,
            _window = $( window ),
            _canUseSmoothScroll = true;

        //private methods
        var _addEvents = function() {

                _window.on( {
                    'scroll': function() {

                        var scrollTop = $(window).scrollTop();

                        _move( scrollTop );

                    },
                    'mousewheel': function( event ) {
                        if ( _canUseSmoothScroll ) {
                            event.preventDefault();

                            _siteScroll( event );

                        }
                    },
                    'DOMMouseScroll': function( event ) {
                        if ( _canUseSmoothScroll ) {
                            event.preventDefault();

                            _siteScroll( event );

                        }
                    }
                } );

            },
            _move = function( scrollTop ){

                $('.services__title').each( function () {
                    var elem = $(this),
                        koefX = .2;

                    elem.css( {
                        '-webkit-transform': 'translate( ' + scrollTop * koefX + 'px, 0px )',
                        'transform': 'translate( ' + scrollTop * koefX + 'px, 0px )'
                    } );
                } );

                $('.services__subtitle').each( function () {
                    var elem = $(this),
                        koefY = .05;

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

                $('.services__description').each( function () {
                    var elem = $(this),
                        koefY = .1;

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

            },
            _siteScroll = function( event ) {
                var scrollTime = 1.2,
                    scrollDistance = 170,
                    delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3,
                    scrollTop = _window.scrollTop(),
                    finalScroll = scrollTop - parseInt( delta * scrollDistance );

                TweenMax.to( _window, scrollTime, {
                    scrollTo : { y: finalScroll, autoKill:true },
                    ease: Power1.easeOut,
                    overwrite: 5
                });
            },
            _init = function() {
                _obj[ 0 ].obj = _self;
                _addEvents();
            };

        //public properties

        //public methods
        _self.setCanUseScroll = function ( param ) {
            _canUseSmoothScroll = param;
        };

        _init();
    };

} )();