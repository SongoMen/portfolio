var menuStatus = false;
var scroller = 0;

function closeMenu() {
    $(".top-menu").css('margin-top', '-270%')
    menuStatus = false
    $('.menu-toggle').toggleClass('active');
    if (window.location.hash === '#about' || window.location.hash === "#portfolio") {
        $("body").css('overflow-y', 'auto')
    }
    setTimeout(() => {
        $("footer").css('position', 'fixed')
    }, 800)
}

function openMenu() {
    $(".top-menu").css('display', 'flex')
    $(".top-menu").css('animation', 'topMenu 1s')
    $(".top-menu").css('margin-top', '0%')
    menuStatus = true
    $('.menu-toggle').toggleClass('active');
    $("body").css('overflow', 'hidden')
    $("footer").css('position', 'absolute')
}

function about() {
    $(".about").css({
        display: 'flex'
    });
    $(".home-left").css('width', '100%');
    $(".home-center").css('margin-left', '100%');
    $(".home").css({
        display: 'flex'
    });
    $("#menu-about").addClass('active');
    $(".portfolio").css({
        display: 'flex'
    });
    $(".contact").css({
        display: 'flex'
    });
    scrollabout = setTimeout(() => {
        $(".home-center").css('display', 'none')
        $(".scroll").css('display', 'none')
        $("body").css('overflow-y', 'auto');
    }, 1000)
    window.location.hash = "about";
}

function home() {
    $(".home-left").css('width', '50%')
    $(".home-center").css('margin-left', '0%')
    $("body").css('overflow', 'hidden')
    $(".home-center").css('display', 'flex')
    $(".scroll").css('display', 'block')
    $(".about").css('display', 'none')
    $('body').scrollTop(0);
    scroller = 1;
    window.location.hash = ""
    clearTimeout(scrollabout)
}

jQuery(document).ready(function() {

    //*******************************************************
    //***                     FORM                        ***
    //*******************************************************

    var regex = new RegExp(
        '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
        '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
        '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
    );

    $('.form__input.email input').on('keyup', function(e) {
        $(this).parent().toggleClass('success', regex.test($(this).val()));
    });

    $('.form__input.name input').on('keyup', function(e) {
        $(this).parent().toggleClass('success', $(this).val().length > 2);
    });

    $('.form__input.textarea textarea').on('keyup', function(e) {
        $(this).parent().toggleClass('success', $(this).val().length > 10);
    });

    //*******************************************************
    //***                     SCROLLING                   ***
    //*******************************************************

    $('body').on('scroll', function() {
        var $height = $('body').scrollTop();
        if ($height === 0) scroller = 0;
        if ($height !== 0) scroller = 1;
        if ($height >= 250) $('header').addClass('active');
        if ($height < 250) $('header').removeClass('active');
        if ($height < 700 && $height > 1) window.location.hash = "about";
        if ($height >= 820) window.location.hash = "portfolio";
        if ($height >= 1720) window.location.hash = "contact";
    });
    setTimeout(function() {
        window.addEventListener('wheel', function(e) {
            if (e.deltaY < 0 && window.location.hash === "#about" && menuStatus === false && scroller === 0) {
                $("body").css('overflow', 'hidden')
                $(".about").hide("fast")
                home();
                scroller = 0;
            } else if (e.deltaY > 0 && window.location.hash === "" && menuStatus === false) {
                about();
            }
        }, {
            passive: true
        });
    }, 1500)

    //*******************************************************
    //***                     HASH                        ***
    //*******************************************************

    if (window.location.hash === "") {
        $(".home").css({
            display: 'flex'
        })
        $("#menu-home").toggleClass('active');
    } else if (window.location.hash === '#about') {
        $(".home-left").css('animation', 'leftSide2 1s')
        $('.scroll').css('display', 'none')
        about();
    } else if (window.location.hash === '#portfolio') {
        $(".home-left").css('animation', 'leftSide2 .5s')
        about();
        $('body').scrollTop(840);
        $('.scroll').css('display', 'none')
        window.location.hash = "portfolio"
    } else if (window.location.hash === '#contact') {
        about();
        window.location.hash = "contact"
        $(".home-left").css('animation', 'leftSide2 .5s')
        $('.scroll').css('display', 'none')
        $('body').scrollTop(1820);
    }
    $(window).on('hashchange', function() {
        if (window.location.hash === "") {
            $("#menu-home").toggleClass('active');
            $('#menu-about, #menu-portfolio, #menu-contact').removeClass('active')
        } else if (window.location.hash === '#about') {
            $('#menu-home, #menu-portfolio, #menu-contact').removeClass('active')
            $("#menu-about").addClass('active');
        } else if (window.location.hash === '#portfolio') {
            $('#menu-home, #menu-about, #menu-contact').removeClass('active')
            $("#menu-portfolio").addClass('active');
        } else if (window.location.hash === '#contact') {
            $('#menu-home, #menu-about, #menu-portfolio').removeClass('active')
            $("#menu-contact").addClass('active');
        }
    })

    //*******************************************************
    //***                     MENU                        ***
    //*******************************************************
    $('.menu-toggle').on('click', function() {
        if ($('.menu-toggle').hasClass('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    $('#menu-home').on('click', function() {
        if (window.location.hash !== '#home') {
            home();
            setTimeout(function() {
                closeMenu();
            }, 300)
        } else {
            closeMenu();
        }
    })

    $('#menu-about').on('click', function() {
        if (window.location.hash !== '#about') {
            about();
            setTimeout(function() {
                closeMenu();
            }, 800)
        } else {
            closeMenu();
        }
    })
    $('#menu-portfolio').on('click', function() {
        if (window.location.hash !== '#portfolio') {
            about();
            $('body').scrollTop(840);
            setTimeout(function() {
                closeMenu();
            }, 800)
        } else {
            closeMenu();
        }
    })
    $('#menu-contact').on('click', function() {
        if (window.location.hash !== '#contact') {
            about();
            $('body').scrollTop(1820);
            setTimeout(function() {
                closeMenu();
            }, 800)
        } else {
            closeMenu();
        }
    })
    $(function(){
      $('.form__button').click(()=>{
        var data = {
          name: $('.form__input.name').val(),
          email: $('.form__input.email').val(),
          email: $('.form__input.textareax').val()
        }
        $.ajax({
          type:"POST",
          url:"email.php",
          data: data,
          success:function(){
            console.log("success")
          }
        })
      })
    })
})
