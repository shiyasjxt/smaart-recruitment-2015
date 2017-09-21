
var winWt = $(window).width(),
    winHt = $(window).height();

function valignMiddle(obj){
  var objHt = $(obj).innerHeight();
  var childHt = $(obj).find('img').height();
  var htDiff = objHt - childHt;
  if( htDiff>0 ){
    $(obj).css({
      'padding-top': htDiff/2
    })
  }
}

function equalHts(obj){
  var maxHt = 100;
  $(obj).each( function(){
     var ht = $(this).height(); 
     if( ht>maxHt ){
      maxHt = ht;
     }
  });
  $(obj).height(maxHt);
}

$(window).load(function(){
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        items:1,
        loop: true,
        nav:false,
        autoplay:true,
        autoplayTimeout:5000,
        //animateOut:'fadeOut',
        onTranslated: function(){
            var r = owl.find('.active');
            
            if( r.find('.item').hasClass('bg-2') ){
               $('#header').addClass('t2'); 
            }else{
               $('#header').removeClass('t2');  
            }
        }
    });
    
    
    $(".owl-responsive").owlCarousel({
        navClass: ['owl-prev icon-arrow-prev','owl-next icon-arrow-next'],
        responsive:{
            0:{
                items:1,
                nav:true,
            },
            992:{
                items:3,
                dots:false,
            }
        }
    });

    $(".owl-responsive-4").owlCarousel({
        navClass: ['owl-prev icon-arrow-prev','owl-next icon-arrow-next'],
        responsive:{
            0:{
                items:1,
                nav:true,
            },
            992:{
                items:4,
                nav:false,
                dots:false,
            }
        }
    });
    $(".owl-responsive-4x").owlCarousel({
        navClass: ['owl-prev icon-arrow-prev','owl-next icon-arrow-next'],
        dots:false,
        nav:true,
        responsive:{
            0:{
                items:1
            },
            992:{
                items:4
            }
        }
    });
    

    $(".owl-default").owlCarousel({
        items:1,
        nav: false,
    });

    if( $(window).width()>992 ){
        skrollr.init({
            forceHeight: false,
            mobileCheck: function(){
              return false;
            }
        });
    }

  //innerpages
  if( $('.innerpage-header').length ){
      $('body').addClass('innerpage');
      if( $(window).width()<992 ){
       $('#widget-search').addClass('stickyMobile');
       $('.form-textbox').attr('placeholder','KeyWords');
      }
  }

  valignMiddle('.item .image-wrap');
  
  if( winWt >= 992 ){
    equalHts('.item-wrap');
  }
  


  //System scripts
  // Page Title
  $('.dynamic-content-holder .page-head').appendTo($('.inner-banner .row div.col-md-12'));
  $('#content-container #content h1:first').appendTo($('.inner-banner .row div.col-md-12'));
  $('#CV-content h1.CV-Builder-title').appendTo($('.inner-banner .row div.col-md-12'));

  if( $('.page-head').attr('data-extraClass')!='' ){
    $('.inner-banner').addClass( $('.page-head').attr('data-extraClass') );
  }

  $('.video-blocks a.video-poster').click( function(){
    $(this).ekkoLightbox();
    return false;
  });

});   

$(window).scroll(function(){
  var st = $(window).scrollTop();
  
  if( $('.home_banner').length && $(window).width()>=992 ){

    if( st >= $('.home_banner').height() - 100 ){
      $('.homepage-header, #widget-search').addClass('sticky');
    }else{
      $('.homepage-header, #widget-search').removeClass('sticky');
    }

  }
  else if( $('.home_banner').length && $(window).width()<992 ){
    if( st >= $('.home_banner').height() ){
      $('.homepage-header, #widget-search').addClass('stickyMobile');
      $('.form-textbox').attr('placeholder','KeyWords');
    }else{
      $('.homepage-header, #widget-search').removeClass('stickyMobile');
      $('.form-textbox').attr('placeholder','Enter Job KeyWords');
    }
  }

  //innerpages
  if( $('.innerpage-header').length && $(window).width()>=992 ){
    if( st>0 ){
      $('.innerpage-header').addClass('sticky-sm'); 
      $('#header .inner-banner').addClass('less-pad');
    }else{
      $('.innerpage-header').removeClass('sticky-sm');
      $('#header .inner-banner').removeClass('less-pad'); 
    }
  }

}); 

// Resize function
var timer;
function resizeFunc(){
//innerpages
  if( $('.innerpage-header').length ){
    if( $(window).width()<992 ){
      $('#widget-search').addClass('stickyMobile');
      $('.form-textbox').attr('placeholder','KeyWords');
    }else{
      $('#widget-search').removeClass('stickyMobile');
      $('.form-textbox').attr('placeholder','Enter Job KeyWords'); 
    }
  }
}

$(window).resize(function(){
  if(timer) {
    window.clearTimeout(timer);
  }

  timer = window.setTimeout(function() {
      // actual callback
      resizeFunc();
  }, 100);

});