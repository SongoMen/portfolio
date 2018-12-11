var menuStatus = false;
var preloaderStatus;
var scroller=0;

function closeMenu(){
  $(".top-menu").css('margin-top','-100%')
  menuStatus = false
  $('.menu-toggle').toggleClass('active');
  if(window.location.hash==='#about'){
    $("html").css('overflow-y','auto')
  }
}

function openMenu(){
  $(".top-menu").css('display','flex')
  $(".top-menu").css('animation','topMenu 1s')
  $(".top-menu").css('margin-top','0%')
  menuStatus = true
  $('.menu-toggle').toggleClass('active');
  $("html").css('overflow','hidden')
}

function  about(){
  $(".about").css({display: 'flex'})
  $(".home-left").css('animation','leftSide2 1s')
  $(".home-left").css('width','100%')
  $(".home-center").css('margin-left','100%')
  $(".home").css({ display: 'flex' })
  $("#menu-about").toggleClass('active');
  $("html").css('overflow-y','auto')
  window.location.hash="about"
}

function home(){
  $(".about").hide("slow");
  $(".home-left").css('width','50%')
  $(".home-center").css('margin-left','0%')
  $("html").css('overflow','hidden')
  scroller=1;
  window.location.hash=""
}

setTimeout(function(){
  window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0 && window.location.hash=="#about" && menuStatus == false && scroller === 0) {
      home();
      $("html").css('overflow','hidden')
    }
    else if (e.deltaY > 0 && window.location.hash=="" && menuStatus == false && preloaderStatus == false) {
      $(".home-left").css('width','100%')
      $(".home-center").css('margin-left','100%')
      $(".about").css('display','flex')
      window.location.hash="#about"
      console.log("XD")
    }
    else if (e.deltaY > 0 && window.location.hash=="#about" && menuStatus == false){
      scroller+=1;
      $("html").css('overflow-y','auto')
    }
    else if (e.deltaY < 0 && window.location.hash=="#about" && menuStatus == false){
      if(scroller!==0){
        scroller-=1;
      }
    }
  });
},1500)

$(window).on('beforeunload', function() {
    $(window).scrollTop(0);
});

jQuery(document).ready(function(){
  $(window).scroll(function() {
  	var $height = $(window).scrollTop();
    if($height > 250) {
  		$('header').addClass('active');
  	} else {
  		$('header').removeClass('active');
  	}
  });
  var height = $(window).scrollTop();
  if (window.location.hash === "") {
      $(".preloader").css({display:'flex'})
      preloaderStatus=true;
      setTimeout(()=>{
        $(".preloader").css({animation:'preloader 1s forwards'})
        preloaderStatus=false;
      },2500)

      $(".home").css({ display: 'flex' })
      $("#menu-home").toggleClass('active');
  } else if (window.location.hash === '#about') {
      about();
  }
  $(window).on('hashchange', function() {
    if (window.location.hash === "") {
        $("#menu-home").toggleClass('active');
        $('#menu-about, #menu-portfolio, #menu-contact').removeClass('active')
        //$("body").css('overflow','hidden')
    } else if (window.location.hash === '#about') {
        $('#menu-home, #menu-portfolio, #menu-contact').removeClass('active')
        $("#menu-about").toggleClass('active');
        //$("body").css('overflow','auto')
    }
  })
	$('.menu-toggle').on('click',function(){
    if($('.menu-toggle').hasClass('active')){
      closeMenu();
    }
    else{
      openMenu();
    }
	});
  $('#menu-home').on('click',function(){
    if(window.location.hash !== '#home'){
      home();
      setTimeout(function(){
        closeMenu();
      },300)
    }
    else{
      closeMenu();
    }
  })

  $('#menu-about').on('click',function(){
    if(window.location.hash !== '#about'){
      about();
      setTimeout(function(){
        closeMenu();
      },300)
    }
    else{
      closeMenu();
    }
  })
})
