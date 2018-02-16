<script id="floatingBannerJS" data-clicktag="" src="" data-stage=".rightBanner iframe">



/* Banner library asset */

(function(d, w){

  Object.keys = Object.keys || function(o)
  {
    var r = [];

    for(var name in o)
    {
      if (o.hasOwnProperty(name))
        r.push(name);
    }

    return r;
  }

  w.$ = function(s){ return new getObj(s); };

  function getObj(sel, doc){

    doc = doc? doc : d;

    this.e = typeof sel === 'string'? doc.querySelector(sel) :
             typeof sel === 'object'? sel :
             null;

    this.get = function(){ return this.e; };

    return this;
  }

  getObj.prototype.css = function(){

      if(!this.e) return;

      if( this.css.arguments.length == 2 && typeof this.css.arguments[0] == 'string' )
        this.e.style[ this.css.arguments[0] ] = this.css.arguments[1];
      else if( this.css.arguments.length == 1 && typeof this.css.arguments[0] == 'object' )
        for(var x in Object.keys( this.css.arguments[0] ) )
          this.e.style[ Object.keys( this.css.arguments[0] )[x] ] = this.css.arguments[0][ Object.keys( this.css.arguments[0] )[x] ];
      else return;

      return this;
  }

  getObj.prototype.on = function(e, f){

      if(!this.e) return;

      this.e.addEventListener = this.e.addEventListener || function (ev, f, foo) { this.e.attachEvent('on' + ev, f); };
      this.e.addEventListener(e, f, false);

      return this;
  }

  getObj.prototype.anim = function(o, speed, fn){

    speed = speed? speed : 500;

    var el = this.e,
        styName = Object.keys( o )[0],
        styProp = o[ Object.keys( o )[0] ],
        step = Math.abs( parseInt( el.style[ styName ] ) - parseInt( styProp ) ),
        tid;

    tid = w.setInterval( function(){
        doAnim( el, tid );
      }, speed/step );

    function doAnim( el, cid ){

      var fromProp = parseInt( el.style[ styName ] ),
          toProp = parseInt( styProp ),
          incDecFlag = toProp - fromProp;

      if( incDecFlag != 0 )
        el.style[ styName ] = ( fromProp + 1 * ( incDecFlag/Math.abs( incDecFlag ) ) ) + ( /(px)$/i.test( styProp )? 'px' : '' );
      else {
        w.clearInterval( cid );
        if( typeof fn === 'function' ) fn();
      }

    }

    return this;
  }

  getObj.prototype.animate = function(o, speed, fn){

    var props = Object.keys( o );

    //console.log( typeof fn );

    for( var x in props )
    {
      var obj = {};
      obj[ props[x] ] = o[ props[x] ];
      this.anim( obj, speed, ( x == props.length - 1 && typeof fn === 'function'? fn : null ) );
    }

    return this;
  }

})(document, window);

/* Banner library asset end */

/* Banner script */

(function(d, w){

  var o = new Object, tid = null;

  console.log('floating banner >>>>> js v.3.11');

  var data = $('#floatingBannerJS').get().dataset,
  /* banner config */
      config = {
      clickTag: typeof data.clicktag != 'undefined' && data.clicktag? encodeURIComponent( data.clicktag ) : '#',
      w: 300,
      h: 250,
      maxW: 600,
      maxH: 300,
      delay: 0,
      url: 'https://rawgit.com/Eriel/TEST/master/index.htmlbimg.abv.bg/banners/HTML5/Nasic2017/expandable-600-300x250/index.html',
      stage: typeof data.stage != 'undefined' && data.stage? data.stage : 'body',
      sel: typeof data.selector != 'undefined' && data.selector? data.selector : '',
      impress: typeof data.impress != 'undefined' && data.impress? data.impress : '',
      css: 'position: absolute; right: 0;'
    };
  /* banner config end */

  if( config.impress ) (new Image).src = config.impress;

  window.addEventListener('load', function(){
    setTimeout( function(){
      o = d.querySelector( config.stage );
      //console.log('floating banner >>>>>', config.stage,  w.$( config.stage )[0], o, $( 'body' ).get() );
      
      $(o.parentNode, d).css({ width: config.w + 'px', height: config.h + 'px', position: 'relative', zIndex: 499 });
	  //$(o.parentNode, d).on('mouseover', function(){
		  show();
	  //});      
    }, 300 );
  });
  
	$(o.parentNode, d).on('click', function(){
	  hide();
	  console.log('close fired!');
	});

  var html = '<div style="width: ' + config.w + 'px; height: ' + config.h + 'px;" ' +
             'id="bannerWrapper300x250"><iframe id="bannerContainer300x250" src="' + config.url + '#clickTag=' + config.clickTag + '&doexpand=open&dolittle=close" ' +
             'scrolling="no" frameborder="no" width="' + config.w + '" height="' + config.h + '" ' +
             'style="' + config.css + '"></iframe></div>',
      div = document.createElement('div');

  div.innerHTML = html;

  $('body').get().appendChild(div);

  window.addEventListener('message', receiveMessage);

  function receiveMessage(event)
  {
   
    
    if( tid ) clearTimeout( tid );
    
    if( event.data == 'open' ) { show(); }
    else if ( event.data == 'close' ) {
       
      if( config.delay )
        tid = setTimeout( hide, config.delay );
      else 
        hide();
         
    }
  }

  function show(){
    //console.log('show was called',  o );

    $( o, d ).css({
      width: config.maxW + 'px',
      height: config.maxH + 'px',
      position: 'absolute',
      right: 0
    });

    $('#bannerContainer300x250').css({
      width: config.maxW + 'px',
      height: config.maxH + 'px'
    });
  }

  function hide(){
    //console.log('hide was called', o );

    $( o, d ).css({
      width: config.w + 'px',
      height: config.h + 'px'
    });

    $('#bannerContainer300x250').css({
      width: config.w + 'px',
      height: config.h + 'px'
    });
  }

})(parent.window.document, parent.window);





</script>