menuStatus = false;

function closeMenu(){
  $(".top-menu").css('margin-top','-100%')
  menuStatus = false
  $('.menu-toggle').toggleClass('active');
}

function openMenu(){
  $(".top-menu").css('display','flex')
  $(".top-menu").css('animation','topMenu 1s')
  $(".top-menu").css('margin-top','0%')
  menuStatus = true
  $('.menu-toggle').toggleClass('active');
}

function  about(){
  $(".about").css({display: 'flex'})
  $(".home-left").css('animation','leftSide2 1s')
  $(".home-left").css('width','100%')
  $(".home-center").css('margin-left','100%')
  $(".home").css({ display: 'flex' })
  $("#menu-about").toggleClass('active');
  window.location.hash="about"
}

function home(){
  $(".home-left").css('width','50%')
  $(".home-center").css('margin-left','0%')
  $(".about").css('display','none')
  window.location.hash=""
}

setTimeout(function(){
  window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0 && window.location.hash=="#about" && menuStatus == false) {
      home();
    }
    if (e.deltaY > 0 && window.location.hash=="" && menuStatus == false) {
      $(".home-left").css('width','100%')
      $(".home-center").css('margin-left','100%')
      $(".about").css('display','flex')
      window.location.hash="#about"
    }
  });
},1500)

jQuery(document).ready(function(){
  var height = $(window).scrollTop();
  if (window.location.hash === "") {
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
    home();
    setTimeout(function(){
      closeMenu();
    },300)
  })

  $('#menu-about').on('click',function(){
    about();
    setTimeout(function(){
      closeMenu();
    },300)
  })
})
