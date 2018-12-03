setTimeout(function(){
  window.addEventListener('wheel', function(e) {
    if (e.deltaY < 0 && window.location.hash=="#about") {
      $(".home-left").css('width','50%')
      $(".home-center").css('margin-left','0%')
      $(".about").css('display','none')
      window.location.hash=""
    }
    if (e.deltaY > 0 && window.location.hash=="") {
      $(".home-left").css('width','100%')
      $(".home-center").css('margin-left','100%')
      $(".about").css('display','flex')
      window.location.hash="#about"
    }
  });
},1500)


jQuery(document).ready(function(){
  if (window.location.hash === "") {
      $(".home").css({ display: 'flex' })
  } else if (window.location.hash === '#about') {
      $(".about").css({display: 'flex'})
      $(".home-left").css('animation','leftSide2 1s')
      $(".home-left").css('width','100%')
      $(".home-center").css('margin-left','100%')
      $(".home").css({ display: 'flex' })
  }
	$('.menu-toggle').on('click',function(){
		$('.menu-toggle').toggleClass('active');
    $(".top-menu").css('display','flex')
    $(".top-menu").css('animation','topMenu 1s')
	});
})
