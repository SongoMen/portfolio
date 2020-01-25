var menuStatus = false;
var scroller = 0;
let scrollabout;

function closeMenu() {
    $(".top-menu").css("margin-top", "-270%");
    menuStatus = false;
    $(".menu-toggle").toggleClass("active");
    if (window.location.hash === "#about" || window.location.hash === "#portfolio" || window.location.hash === "#contact"
    || window.location.hash === "#contactthanks") {
        $("body").css("overflow-y", "auto");
    }
    setTimeout(() => {
        $("footer").css("position", "fixed");
    }, 800)
}

function openMenu() {
    $(".top-menu").css("display", "flex");
    $(".top-menu").css("animation", "topMenu 1s");
    $(".top-menu").css("margin-top", "0%");
    menuStatus = true;
    $(".menu-toggle").toggleClass("active");
    $("body").css("overflow", "hidden");
    $("footer").css("position", "absolute");
}

function about() {
    $(".home__left").css("width", "100%");
    $(".home__center").css("margin-left", "100%");
    $(".home").css({
        display: "flex"
    });
    $("#menu-about").addClass("active");
    $(".portfolio").css({
        display: "flex"
    });
    $(".contact").css({
        display: "flex"
    });
    $("body").scrollTop(0);
    scrollabout = setTimeout(() => {
    $(".home").removeClass("active");
        $(".home__center").css("display", "none");
        $(".scroll").css("display", "none");
        $("body").css("overflow-y", "auto");
        $(".about").css("display", "flex");
   }, 1000);
}

function home() {
    $(".home__left").css("width", "50%");
    $(".home").addClass("active");
    $(".home__center").css("margin-left", "0%");
    $("body").css("overflow", "hidden");
    $(".home__center").css("display", "flex");
    $(".scroll").css("display", "flex");
    $(".about").css("display", "none");
    $("body").scrollTop(0);
    scroller = 1;
    window.location.hash = "";
    clearTimeout(scrollabout);
}

jQuery(document).ready(function() {

    //*******************************************************
    //***                   DETECT PHONE                  ***
    //*******************************************************

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      $("#scroll__text").html("Swipe Down");
    }


    //*******************************************************
    //***                     FORM                        ***
    //*******************************************************

    var nameval = false, emailval = false, textval = false,thanks=false;
    document.getElementById("form").action = "";

    var regex = new RegExp(
        '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
        '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
        '|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
    );

    $(".form__input.email input").on("keyup", function() {
        $(this).parent().toggleClass("success", regex.test($(this).val()));
        if(regex.test($(".form__input.email input").val())){
          emailval=true;
        }
        else{
          emailval=false;
        }
    });

    $(".form__input.name input").on("keyup", function() {
        $(this).parent().toggleClass("success", $(this).val().length > 2);
        if($(".form__input.name input").val().length > 2){
          nameval=true;
        }
        else{
          nameval=false;
        }
    });

    $(".form__input.textarea textarea").on("keyup", function() {
        $(this).parent().toggleClass("success", $(this).val().length > 10);
        if($(".form__input.textarea textarea").val().length > 10){
          textval=true;
        }
        else{
          textval=false;
        }
    });

    $("#form").submit(function(){
      if(emailval === false){
        $(".form__input.email input").css("border","1px solid red");
      }
      else {
        $(".form__input.email input").css("border","none");
      }
      if(nameval === false){
        $(".form__input.name input").css("border","1px solid red");
      }
      else{
        $(".form__input.name input").css("border","none");
      }
      if(textval === false){
        $(".form__input.textarea textarea").css("border","1px solid red");
      }
      else{
        $(".form__input.textarea textarea").css("border","none");
      }
      if(nameval === true && emailval === true && textval===true){
        document.getElementById("form").action = "https://getsimpleform.com/messages?form_api_token=d55de506b28707f8ee113a4e3e6c1539";
        thanks=true;
        return true;
      }
      return false;
    })
    //*******************************************************
    //***                     SCROLLING                   ***
    //*******************************************************

    $("body").on("scroll", function() {
        var $height = $("body").scrollTop();
        if ($height === 0) {scroller = 0;}
        if ($height !== 0) {scroller = 1;}
        if ($height >= 200) {$("header").addClass("active");}
        if ($height < 250) {$("header").removeClass("active");}
        if ($height < 700 && $height > 1) {window.location.hash = "about";}
        if ($height >= 820 && $height< 1500){ window.location.hash = "portfolio";}
        if ($height >= document.getElementById("contactsection").offsetTop - 200) {
          if(window.location.hash!=="#contactthanks" && thanks === false){
            window.location.hash = "contact";
          }
          else{
            window.location.hash="contactthanks";
          }
        }
    });
    setTimeout(function() {
        window.addEventListener("wheel", function(e) {
            if (e.deltaY < 0 && window.location.hash === "#about" && menuStatus === false && scroller === 0) {
                $("body").css("overflow", "hidden");
                $(".about").hide("fast");
                home();
                scroller = 0;
            } else if (e.deltaY > 0 && window.location.hash === "" && menuStatus === false) {
                about();
                window.location.hash="about";
            }
        }, {
            passive: true
        });
    }, 1500);

    //*******************************************************
    //***                     HASH                        ***
    //*******************************************************

    if (window.location.hash === "") {
        $(".home").addClass("active");
        $(".home").css({
            display: "flex"
        })
        $("#menu-home").toggleClass("active");
    } else if (window.location.hash === "#about") {
        $(".home").addClass("active");
        $(".home__left").css("animation", "leftSide2 1s");
        $(".scroll").css("display", "none");
        about();
    } else if (window.location.hash === "#portfolio") {
        $(".home__left").css("animation", "leftSide2 .5s");
        about();
        $("#portfoliosection")[0].scrollIntoView( true );
        $(".scroll").css("display", "none");
    } else if (window.location.hash === "#contact" || window.location.hash === "#contactthanks") {
        about();
        if(window.location.hash === "#contactthanks"){
          $(".home__left").css("animation", "leftSide2 .5s");
          $(".scroll").css("display", "none");
          $("#contactsection")[0].scrollIntoView( true );
        }
        else{
          $(".home__left").css("animation", "leftSide2 .5s");
          $(".scroll").css("display", "none");
          $("#contactsection")[0].scrollIntoView( true );
        }
    }
    else{
        $(".home").css({
            display: "flex"
        })
        $("#menu-home").toggleClass("active");
        window.location.hash="";
    }
    $(window).on("hashchange", function() {
        if (window.location.hash === "") {
            $("#menu-home").toggleClass("active");
            $("#menu-about, #menu-portfolio, #menu-contact").removeClass("active");
        } else if (window.location.hash === "#about") {
            $("#menu-home, #menu-portfolio, #menu-contact").removeClass("active");
            $("#menu-about").addClass("active");
        } else if (window.location.hash === "#portfolio") {
            $("#menu-home, #menu-about, #menu-contact").removeClass("active");
            $("#menu-portfolio").addClass("active");
        } else if (window.location.hash === "#contact" || window.location.hash === "#contactthanks") {
            $("#menu-home, #menu-about, #menu-portfolio").removeClass("active");
            $("#menu-contact").addClass("active");
        }
    })

    //*******************************************************
    //***                     MENU                        ***
    //*******************************************************
    $(".menu-toggle").on("click", function() {
        if ($(".menu-toggle").hasClass("active")) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    $("#menu-home").on("click", function() {
        if (window.location.hash !== "#home") {
            home();
            setTimeout(function() {
                closeMenu();
            }, 300);
        } else {
            closeMenu();
        }
    })

    $("#menu-about").on("click", function() {
        if (window.location.hash !== "#about") {
            about();
            window.location.hash="about";
            setTimeout(function() {
                closeMenu();
            }, 800)
        } else {
            closeMenu();
        }
    })
    $("#menu-portfolio").on("click", function() {
        if (window.location.hash !== "#portfolio") {
            about();
            $("#portfoliosection")[0].scrollIntoView( true );
            setTimeout(function() {
                closeMenu();
            }, 800);
        } else {
            closeMenu();
        }
    })
    $("#menu-contact").on("click", function() {
        if (window.location.hash !== "#contact") {
            about();
            $("#contactsection")[0].scrollIntoView( true );
            setTimeout(function() {
                closeMenu();
            }, 800);
        } else {
            closeMenu();
        }
    })

    //*******************************************************
    //***                    SWIPE SUPPORT                ***
    //*******************************************************

    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchmove", handleTouchMove, false);

    var xDown = null;
    var yDown = null;

    function getTouches(evt) {
        return evt.touches || 
            evt.originalEvent.touches;
    }

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];
        xDown = firstTouch.clientX;
        yDown = firstTouch.clientY;
    }

    function handleTouchMove(evt) {
        if (!xDown || !yDown) {
            return;
        }

        var xUp = evt.touches[0].clientX;
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if (Math.abs(xDiff) > Math.abs(yDiff)) {
            if (xDiff > 0) {
                if (window.location.hash === "#about" && menuStatus === false && scroller === 0) {
                    $("body").css("overflow", "hidden");
                    $(".about").hide("fast");
                    home();
                    scroller = 0;
                }
            }
        } else {
            if (yDiff > 0) {
                console.log("");
            } else {
                if (window.location.hash === "" && menuStatus === false) {
                    about();
                }
            }
        }
        /* reset values */
        xDown = null;
        yDown = null;
    }

    window.onload = (function(){
      if(window.location.hash === "#contactthanks"){
        document.getElementById("thank-you-message").className = "none";
      }
    });
});
