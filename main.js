var menuStatus = false;
var preloaderStatus;
var scroller=0;

function closeMenu(){
  $(".top-menu").css('margin-top','-270%')
  menuStatus = false
  $('.menu-toggle').toggleClass('active');
  if(window.location.hash==='#about' || window.location.hash==="#portfolio"){
    $("html").css('overflow-y','auto')
  }
  setTimeout(()=>{
    $("footer").css('position','fixed')
  },800)
}

function openMenu(){
  $(".top-menu").css('display','flex')
  $(".top-menu").css('animation','topMenu 1s')
  $(".top-menu").css('margin-top','0%')
  menuStatus = true
  $('.menu-toggle').toggleClass('active');
  $("html").css('overflow','hidden')
  $("footer").css('position','absolute')
}

function about(){
  preloaderStatus = false;
  $(".about").css({display: 'flex'});
  $(".home-left").css('width','100%');
  $(".home-center").css('margin-left','100%');
  $(".home").css({ display: 'flex' });
  $("#menu-about").addClass('active');
  setTimeout(()=>{
    $(".home-center").css('display','none')
    $(".scroll").css('display','none')
    $("html").css('overflow-y','auto');
  },1000)
  window.location.hash="about";
}

function home(){
  $(".about").hide("slow");
  $(".home-left").css('width','50%')
  $(".home-center").css('margin-left','0%')
  $("html").css('overflow','hidden')
  $(".home-center").css('display','flex')
  $(".scroll").css('display','block')
  scroller=1;
  window.location.hash=""
}

jQuery(document).ready(function(){
  $(window).scroll(function() {
  	var $height = $(window).scrollTop();
    console.log($height)
    if($height===0) scroller = 0;
    if($height!==0) scroller = 1;
    if($height >= 250) $('header').addClass('active');
    if($height<250) $('header').removeClass('active');
    if($height < 700 && $height>1) window.location.hash="about";
    if($height >= 720) window.location.hash="portfolio";
  });
  setTimeout(function(){
    window.addEventListener('wheel', function(e) {
      if (e.deltaY < 0 && window.location.hash==="#about" && menuStatus === false && scroller === 0) {
        home();
        scroller = 0;
        $("html").css('overflow','hidden')
      }
      else if (e.deltaY > 0 && window.location.hash==="" && menuStatus === false && preloaderStatus === false) {
        about();
      }
    });
  },1500)
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
      $(".home-left").css('animation','leftSide2 1s')
      about();
  }
    else if (window.location.hash === '#portfolio') {
      $(".home-left").css('animation','leftSide2 .5s')
      about();
      $(window).scrollTop(720);
    }
  $(window).on('hashchange', function() {
    if (window.location.hash === "") {
        $("#menu-home").toggleClass('active');
        $('#menu-about, #menu-portfolio, #menu-contact').removeClass('active')
    } else if (window.location.hash === '#about') {
        $('#menu-home, #menu-portfolio, #menu-contact').removeClass('active')
        $("#menu-about").addClass('active');
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
      },800)
    }
    else{
      closeMenu();
    }
  })
})
