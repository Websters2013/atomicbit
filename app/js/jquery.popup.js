( function(){

    $( function(){

        $( '.popup' ).each(function(){

            new Popup($(this));

        });

    });

    var Popup = function( obj ){

        //private properties
        var _self = this,
            _popupPadding = 40,
            _btnShow =  $( '.popup__open' ),
            _obj = obj,
            _btnClose = _obj.find( '.popup__close, .popup__cancel' ),
            _wrap = _obj.find( '.popup__wrap' ),
            _contents = _obj.find( '.popup__content' ),
            _scrollConteiner = $( 'html' ),
            _window = $( window ),
            _timer = setTimeout( function(){}, 1 );

        //private methods
        var _centerWrap = function(){
                if ( _window.height() - ( _popupPadding * 2 ) - _wrap.height() > 0 ) {
                    _wrap.css( { top: ( ( _window.height() - ( _popupPadding * 2 ) ) - _wrap.height() ) / 2 } );
                } else {
                    _wrap.css( { top: 0 } );
                }
            },
            _getScrollWidth = function (){
                var scrollDiv = document.createElement( 'div'),
                    scrollBarWidth;

                scrollDiv.className = 'popup__scrollbar-measure';

                document.body.appendChild( scrollDiv );

                scrollBarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

                document.body.removeChild(scrollDiv);

                return scrollBarWidth;
            },
            _hide = function(){
                _obj.css( {
                    overflowY: 'hidden'
                } );

                _scrollConteiner.removeAttr( 'style' );

                _obj.removeClass( 'popup_opened' );
                _obj.addClass( 'popup_hide' );

                _timer = setTimeout( function(){

                    _obj.css ({
                        overflowY: 'auto'
                    });

                    _obj.removeClass( 'popup_hide' );
                }, 300 );

                $( 'select' )[0].obj.close();

                $( '.site' )[0].obj.setCanUseScroll( true );
                $( '.site__header' )[0].obj.setCanUseScroll( true );

            },
            _init = function(){
                _obj[ 0 ].obj = _self;
                _onEvents();
            },
            _onEvents = function(){
                _window.on( {
                    resize: function(){
                        _centerWrap();
                    },
                    'keydown': function ( e ) {
                        switch( e.which ) {

                            case 27:
                                _hide();
                                break;

                            default:
                                return;
                        }
                    }
                } );
                _btnShow.on( {
                    click: function(){
                        _show( $( this ).attr( 'data-popup' ) );
                        return false;
                    }
                } );
                _btnClose.on( {
                    click: function(){
                        _hide();
                        return false;
                    }
                } );
            },
            _show = function( className ){
                _setPopupContent( className );

                _scrollConteiner.css( {
                    overflowY: 'hidden',
                    paddingRight: _getScrollWidth()
                } );

                _obj.addClass( 'popup_opened' );
                _centerWrap();

                google.maps.event.trigger( $( '.map' )[0] , 'resize');

                $( '.site' )[0].obj.setCanUseScroll( false );
                $( '.site__header' )[0].obj.setCanUseScroll( false );

            },
            _setPopupContent = function( className ){
                var curContent = _contents.filter( '.popup__' + className );

                _contents.css( { display: 'none' } );
                curContent.css( { display: 'block' } );
            };

        //public properties

        //public methods

        _init();
    };

} )();

