( function(){

    $( function(){

        $( window ).on( {
            'load': function () {

                $('html, body').animate({scrollTop: 0},1);

            }
        } );

        $.each( $( '.site__header' ), function () {
            new Header( $(this) );
        } );

        $.each( $( '.menu' ), function () {

            new Menu( $( this ) );

        } );

        $.each( $( '.preloader' ), function () {

            new Preloader( $( this ) );

        } );

        $.each( $( '.sub-menu' ), function () {
            new Sliders( $( this ) );
            new SubMenu( $( this ) );
        } );

        $.each( $( '.case__project' ), function () {
            new Sliders( $(this) );
        } );

        $.each( $( '.case__main-slider' ), function () {
            new Sliders( $(this) );
        } );

        $.each( $( '.site' ), function () {
            new Site( $(this) );
        } );

    } );

    var SubMenu = function ( obj ) {
        var _obj = obj,
            _body = $( 'html, body' ),
            _anchor = _obj.find( '.sub-menu__item' ),
            _window = $( window );

        var _onEvents = function() {

                _anchor.on( {
                    click: function() {

                        var curBtn = $( this ),
                            curMargin = curBtn.data( 'margin' );

                        if ( curMargin == undefined && _window.outerWidth() < 1200 ) {
                            curMargin = 75
                        } else if ( curMargin == undefined && _window.outerWidth() >= 1200 ) {
                            curMargin = 283
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
        var _self = this,
            _obj = obj,
            _lastPos,
            _canUseSmoothScroll = true,
            _indexHero = $( '.hero' ),
            _window = $( window );

        var _onEvents = function() {

                _window.on( {
                    'DOMMouseScroll': function ( e ) {
                        var delta = e.originalEvent.detail;
                        if ( delta ) {
                            var direction = ( delta > 0 ) ? 1 : -1;
                            _checkScroll( direction );
                        }
                    },
                    'mousewheel': function ( e ) {
                        var delta = e.originalEvent.wheelDelta;
                        if ( delta ) {
                            var direction = ( delta > 0 ) ? -1 : 1;
                            _checkScroll( direction );
                        }
                    },
                    'touchmove': function ( e ) {
                        var currentPos = e.originalEvent.touches[0].clientY;
                        if ( currentPos > _lastPos ) {
                            _checkScroll( -1 );
                        } else if ( currentPos < _lastPos ) {
                            _checkScroll( 1 );
                        }
                        _lastPos = currentPos;
                    },
                    'keydown': function ( e ) {
                        switch( e.which ) {

                            case 32:
                                _checkScroll( 1 );
                                break;
                            case 33:
                                _checkScroll( -1 );
                                break;
                            case 34 :
                                _checkScroll( 1 );
                                break;
                            case 35 :
                                _checkScroll( 1 );
                                break;
                            case 36 :
                                _checkScroll( -1 );
                                break;
                            case 38:
                                _checkScroll( -1 );
                                break;
                            case 40:
                                _checkScroll( 1 );
                                break;

                            default:
                                return;
                        }
                    },
                    'scroll': function() {

                        var space = 340;

                        if ( _indexHero.length > 0 ) {
                            space = _indexHero.outerHeight();
                        }

                        if ( _window.scrollTop() > space ) {
                            _obj.addClass( 'fixed' );
                        } else {
                            _obj.removeClass( 'fixed' );
                        }

                    }
                } );

            },
            _checkScroll = function( direction ){
                if( direction > 0 && !_obj.hasClass( 'hidden' ) && _window.scrollTop() > _obj.outerHeight() && _canUseSmoothScroll ) {
                    _hideHeader();
                } else if( direction < 0 && _obj.hasClass( 'hidden' ) && _canUseSmoothScroll ) {
                    _showHeader();
                }
            },
            _showHeader = function () {
                _obj.removeClass( 'hidden' );
            },
            _hideHeader = function () {
                _obj.addClass( 'hidden' );
            },
            _construct = function() {
                _obj[ 0 ].obj = _self;
                _onEvents();
            };

        //public methods
        _self.setCanUseScroll = function ( param ) {
            _canUseSmoothScroll = param;
        };

        _construct()
    };

    var Menu = function( obj ){

        //private properties
        var _obj = obj,
            _btn = $( '.menu-mobile-btn' ),
            _header = $( '.site__header ' ),
            _html = $( 'html' ),
            _body = $( 'body' ),
            _window = $( window ),
            _closeBtn = _obj.find( '.menu__close' );

        //private methods
        var _constructor = function(){
                _onEvents();
            },
            _onEvents = function(){

                _btn.on( 'click', function() {
                    _openMenu();
                    return false;
                } );

                _closeBtn.on( 'click', function() {
                    _closeMenu();
                    return false;
                } );

            },
            _openMenu = function(){
                _obj.addClass( 'visible' );
                // _obj.css( 'height', _window.outerHeight() );
                // _window.css( 'overflow-y', 'hidden' );
                _html.css( 'overflow-y', 'hidden' );

                _body.on( 'touchmove', function () {
                    return false;
                } );

                _obj.on( 'touchmove', function () {
                    return true;
                } );

                $( '.site__header' )[0].obj.setCanUseScroll( false );
                $( '.site' )[0].obj.setCanUseScroll( false );

            },
            _closeMenu = function(){
                _obj.removeClass( 'visible' );
                // _obj.removeAttr( 'style' );
                _html.removeAttr( 'style' );
                _body.removeAttr( 'style' );

                $( '.site__header' )[0].obj.setCanUseScroll( true );
                $( '.site' )[0].obj.setCanUseScroll( true );

            };

        //public properties

        //public methods

        _constructor();

    };

    var Preloader = function ( obj ) {

        var _obj = obj,
            _loader = _obj.find( '.preloader__bar' ),
            _flag = false,
            _loadFlag = false,
            _delay = _obj.data( 'delay' ),
            _window = $( window );

        var _onEvents = function () {

                _window.on( {
                    load: function() {

                        _loadFlag = true;

                    }
                } );

            },
            _init = function() {
                _onEvents();
                _loadBar();
            },
            _loadBar = function (){

                var firstLoadVal = Math.floor(Math.random() * 10) + 1,
                    curValue = firstLoadVal;

                _loader.animate({'width':''+firstLoadVal+'%'}, 200);

                setTimeout(function () {

                    setInterval(function () {

                        var loadVal = Math.floor(Math.random() * 90) + 1;

                        if(loadVal<90 && loadVal>curValue){

                            curValue = loadVal;

                            _loader.animate({'width':''+loadVal+'%'}, 200);

                        }

                    }, 500);

                }, 1000);

                setInterval(function (){
                    if(_loadFlag){

                        _loader.animate({'width': 100+'%'}, 200);

                        _obj.css( {
                            'opacity': 0,
                            'visibility': 'hidden'
                        } );

                        setTimeout(function () {
                            _obj.remove();
                        }, 650);

                        _flag = true

                    }
                }, 500);


            };

        _init();
    };

    var Sliders = function( obj ) {

        //private properties
        var _obj = obj,
            _subMenuSwiper = _obj.find( '.sub-menu__swiper' ),
            _caseSwiper = _obj.find( '.case__project-swiper' ),
            _caseMainSwiper = _obj.find( '.case__main-swiper' ),
            _subMenuPrev = _obj.find( '.sub-menu__prev' ),
            _casePrev = _obj.find( '.case__project-prev' ),
            _caseMainSliderPrev = _obj.find( '.case__main-slider-prev' ),
            _subMenuNext = _obj.find( '.sub-menu__next' ),
            _caseNext = _obj.find( '.case__project-next' ),
            _casMainSlidereNext = _obj.find( '.case__main-slider-next' ),
            _casePagination = _obj.find( '.case__project-pagination' ),
            _caseMainSliderPagination = _obj.find( '.case__main-slider-pagination' ),
            _subMenuItem = _obj.find( '.sub-menu__item' ),
            _subMenu, _caseMainSlider, _case,
            _window = $( window );

        //private methods
        var _initSlider = function() {

                if ( _window.outerWidth() < 1200 ){

                    _subMenu = new Swiper ( _subMenuSwiper, {
                        autoplay: false,
                        speed: 500,
                        effect: 'slide',
                        slidesPerView: 'auto',
                        loopAdditionalSlides: 0,
                        loop: false,
                        spaceBetween: 36,
                        onInit: function () {

                            var activeSlide = _subMenuItem.filter( '.active' ).index();

                            _subMenuSwiper[0].swiper.slideTo( activeSlide, 500, false )

                        }
                    } );

                } else {

                    _subMenu = new Swiper ( _subMenuSwiper, {
                        autoplay: false,
                        speed: 500,
                        effect: 'slide',
                        slidesPerView: 3,
                        loopAdditionalSlides: 0,
                        loop: false,
                        nextButton: _subMenuNext,
                        prevButton: _subMenuPrev,
                        onInit: function () {

                            var activeSlide = _subMenuItem.filter( '.active' ).index();

                            _subMenuSwiper[0].swiper.slideTo( activeSlide, 500, false )

                        }
                    } );

                }

                _case = new Swiper ( _caseSwiper, {
                    autoplay: false,
                    speed: 500,
                    effect: 'fade',
                    slidesPerView: 'auto',
                    loop: true,
                    nextButton: _caseNext,
                    prevButton: _casePrev,
                    pagination: _casePagination
                } );

                _caseMainSlider = new Swiper ( _caseMainSwiper, {
                    autoplay: false,
                    speed: 500,
                    effect: 'fade',
                    slidesPerView: 'auto',
                    loop: true,
                    nextButton: _casMainSlidereNext,
                    prevButton: _caseMainSliderPrev,
                    pagination: _caseMainSliderPagination
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

                        if ( _window.outerWidth() > 1200 ){
                            _move( scrollTop );
                        }

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

                    $('.hero__logo').removeClass( 'topper' );

                    $('.hero__logo-img').each( function () {
                        var elem = $(this),
                            koefY = -.8;

                        elem.css( {
                            'top': scrollTop * koefY
                        } );
                    } );

                    $('.hero__logo-name').each( function () {
                        var elem = $(this),
                            koefY = -.2;

                        elem.css( {
                            'top': scrollTop * koefY
                        } );
                    } );

                } else if ( scrollTop >= 100 ) {

                    $('.hero__logo').addClass( 'topper' );

                    $('.hero__logo-img').each( function () {
                        var elem = $(this),
                            koefY = .1;

                        elem.css( {
                            '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                            'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                        } );

                    } );

                    $('.hero__title').each( function () {
                        var elem = $(this),
                            koefY = .1;

                        elem.css( {
                            '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                            'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                        } );

                    } );

                    $('.hero__logo-name').each( function () {
                        var elem = $(this),
                            koefY = .13;

                        elem.css( {
                            '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                            'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                        } );

                    } );

                    $('.hero__logo-shadow').each( function () {
                        var elem = $(this),
                            koef = .002;

                        elem.css( {
                            '-webkit-transform': 'scale(' + ( scrollTop + 200 ) * koef + ')',
                            'transform': 'scale(' + ( scrollTop + 200 ) * koef + ')'
                        } );

                    } );

                }

                $('.hero__logo-name-clarification').each( function () {
                    var elem = $(this),
                        koef = .005;

                    elem.css( {
                        'opacity': 2 - ( scrollTop + 200 ) * koef
                    } );
                } );

                $('.services__title').each( function () {
                    var elem = $(this),
                        koefX = .02;

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
                        koefY = .02;

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

                $('.promo__subtitle').each( function () {
                    var elem = $(this),
                        koefY = .02;

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

                $('.promo__description').each( function () {
                    var elem = $(this),
                        koefY = .04;

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

                $('.portfolio__item-content').each( function () {
                    var elem = $(this),
                        koefY = elem.data( 'koef' );

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

                $('.services__item-title').each( function () {
                    var elem = $(this),
                        koefX = elem.data( 'koef' );

                    elem.css( {
                        '-webkit-transform': 'translate( ' + scrollTop * koefX + 'px, 0px )',
                        'transform': 'translate( ' + scrollTop * koefX + 'px, 0px )'
                    } );
                } );

                $('.blog__item-content').each( function () {
                    var elem = $(this),
                        koefY = elem.data( 'koef' );

                    elem.css( {
                        '-webkit-transform': 'translate( 0px, ' + scrollTop * koefY + 'px )',
                        'transform': 'translate( 0px, ' + scrollTop * koefY + 'px )'
                    } );
                } );

                $('.case__project-text').each( function () {
                    var elem = $(this),
                        koefX = elem.data( 'koef' );

                    elem.css( {
                        '-webkit-transform': 'translate( ' + scrollTop * koefX + 'px, 0px )',
                        'transform': 'translate( ' + scrollTop * koefX + 'px, 0px )'
                    } );
                } );

            },
            _heroPosition = function () {

                var scrollTop = 0;

                $('.hero__logo').removeClass( 'topper' );

                $('.hero__logo-img').each( function () {
                    var elem = $(this),
                        koefY = -.8;

                    elem.css( {
                        'top': scrollTop * koefY
                    } );
                } );

                $('.hero__logo-name').each( function () {
                    var elem = $(this),
                        koefY = -.2;

                    elem.css( {
                        'top': scrollTop * koefY
                    } );
                } );

                $('.hero__logo-shadow').each( function () {
                    var elem = $(this),
                        koef = .002;

                    elem.css( {
                        '-webkit-transform': 'scale(' + ( scrollTop + 200 ) * koef + ')',
                        'transform': 'scale(' + ( scrollTop + 200 ) * koef + ')'
                    } );

                } );

            },
            _siteScroll = function( event ) {
                var scrollTime = 0.2,
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