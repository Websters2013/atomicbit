( function(){

    $( function(){

        $( '.menu' ).each( function(){
            new Menu( $( this ) );
        } );

    } );

    var Menu = function( obj ){

        //private properties
        var _obj = obj,
            _btn = $( '.menu-mobile-btn' ),
            _closeBtn = _obj.find( '.menu__close' );

        //private methods
        var _constructor = function(){
                _onEvents();
            },
            _onEvents = function(){

                _btn.on( 'click', function() {
                    _openMenu();
                } );

                _closeBtn.on( 'click', function() {
                    _closeMenu();
                } );

            },
            _openMenu = function(){
                _obj.addClass( 'visible' );
            },
            _closeMenu = function(){
                _obj.removeClass( 'visible' );
            };

        //public properties

        //public methods

        _constructor();

    };

} )();