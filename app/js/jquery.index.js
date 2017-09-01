( function(){

    "use strict";

    $( function(){

        $( window ).on( {
            'load': function () {

                $('html, body').animate({scrollTop: 0},1);

            }
        } );

        $.each( $( '.site__header' ), function () {
            new Header( $(this) );
        } );

        $.each( $( '.anchor' ), function () {
            new Anchor( $(this) );
        } );

        $.each( $( '.sub-menu' ), function () {
            new Sliders( $(this) );
        } );

        $.each( $( '.site' ), function () {
            new Site( $(this) );
        } );

    } );

    var Anchor = function ( obj ) {
        var _obj = obj,
            _body = $( 'html, body' ),
            _window = $( window );

        var _onEvents = function() {

                _obj.on( {
                    click: function() {

                        var curBtn = $( this ),
                            curMargin = curBtn.data( 'margin' );

                        if ( curMargin == undefined && _window.outerWidth() < 1200 ) {
                            curMargin = 60
                        } else if ( curMargin == undefined && _window.outerWidth() >= 1200 ) {
                            curMargin = 80
                        }

                        _body.animate( {
                            scrollTop: $( curBtn.attr( 'href' ) ).offset().top - curMargin
                        }, 600);

                        return false;
                    }
                } );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

    var Header = function ( obj ) {
        var _obj = obj,
            _window = $( window );

        var _onEvents = function() {

                _window.on( {
                    scroll: function() {

                        if ( _window.scrollTop() > _obj.outerHeight() ) {
                            _obj.addClass( 'fixed' );
                        } else {
                            _obj.removeClass( 'fixed' );
                        }

                    }
                } );

            },
            _construct = function() {
                _onEvents();
            };

        _construct()
    };

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

                if ( scrollTop < 100 ){

                    $('.hero__logo').each( function () {
                        var elem = $(this),
                            koefY = -.9;

                        elem.removeClass( 'topper' )

                        elem.css( {
                            'top': scrollTop * koefY
                        } );
                    } );

                } else if ( scrollTop >= 100 ) {

                    $('.hero__logo').each( function () {
                        var elem = $(this),
                            koefY = .2;

                        elem.addClass( 'topper' )

                        elem.css( {
                            '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                            'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                        } );
                    } );

                }

                $('.hero__logo-name-shadow').each( function () {
                    var elem = $(this),
                        koefX = .005;

                    elem.css( {
                        'opacity': 2 - ( scrollTop + 200 ) * koefX
                    } );
                } );

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

                $('.promo__subtitle').each( function () {
                    var elem = $(this),
                        koefX = .02;

                    elem.css( {
                        '-webkit-transform': 'translate( ' + scrollTop * koefX + 'px, 0px )',
                        'transform': 'translate( ' + scrollTop * koefX + 'px, 0px )'
                    } );
                } );

                $('.promo__description').each( function () {
                    var elem = $(this),
                        koefX = -.02;

                    elem.css( {
                        '-webkit-transform': 'translate( ' + scrollTop * koefX + 'px, 0px )',
                        'transform': 'translate( ' + scrollTop * koefX + 'px, 0px )'
                    } );
                } );

            },
            _heroPosition = function () {

                var scrollTop = $(window).scrollTop();

                $('.hero__logo').each( function () {
                    var elem = $(this),
                        koefY = -.9,
                        koefYDown = .2;

                    elem.css( {
                        'top': scrollTop * koefY,
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefYDown + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefYDown + 'px )'
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
                _heroPosition();
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