( function(){

    "use strict";

    $( function(){

        $.each( $( '.anchor' ), function () {
            new Anchor( $(this) );
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

} )();