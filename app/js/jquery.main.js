( function(){

    $( function(){

        $.each( $( '.menu' ), function () {

            new Menu( $( this ) );

        } );

        $.each( $( '.preloader' ), function () {

            new Preloader( $( this ) );

        } );

        $.each( $( '.sub-menu' ), function () {

            new SubMenu( $( this ) );

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

    var Menu = function( obj ){

        //private properties
        var _obj = obj,
            _btn = $( '.menu-mobile-btn' ),
            _html = $( 'html' ),
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
                _html.css( 'overflow-y', 'hidden' )
            },
            _closeMenu = function(){
                _obj.removeClass( 'visible' );
                _html.removeAttr( 'style' );
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

} )();