let scroller = 0;
let menuStatus = false;
let scrollabout;

let topMenu = document.querySelector(".top-menu");
let menuToggle = document.querySelector(".menu-toggle");
let footer = document.querySelector(".footer");
let homeLeft = document.querySelector(".home__left");
let menuHome = document.querySelector("#menu-home");
let menuAbout = document.querySelector("#menu-about");
let menuPortfolio = document.querySelector("#menu-portfolio");
let menuContact = document.querySelector("#menu-contact");
let homeCenter = document.querySelector(".home__center");
let homeScroll = document.querySelector(".home__scroll");

let homeSelector = document.querySelector(".home");
let portfolio = document.querySelector(".portfolio");
let contact = document.querySelector(".contact");
let aboutSelector = document.querySelector(".about");
let scroll = document.querySelector(".scroll");

let body = document.querySelector("body");

function r(f) {
  /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f();
}

function closeMenu() {
  topMenu.style.marginTop = "-300%";
  menuStatus = false;
  menuToggle.classList.toggle("active");
  if (
    window.location.hash === "#about" ||
    window.location.hash === "#portfolio" ||
    window.location.hash === "#contact" ||
    window.location.hash === "#contactthanks"
  ) {
    body.style.overflowY = "auto";
  }
  setTimeout(() => {
    footer.style.position = "fixed";
  }, 800);
}

function openMenu() {
  topMenu.style.display = "flex";
  topMenu.style.animation = "topMenu .7s";
  topMenu.style.marginTop = "0%";
  menuStatus = true;
  menuToggle.classList.toggle("active");
  body.style.overflow = "hidden";
  footer.style.position = "absolute";
}

function about() {
  homeLeft.style.width = "100%";
  homeCenter.style.marginLeft = "100%";
  homeSelector.style.display = "flex";
  menuAbout.classList.add("active");
  portfolio.style.display = "flex";
  contact.style.display = "flex";
  body.scrollTop = 0;
  scrollabout = setTimeout(() => {
    homeSelector.classList.remove("active");
    homeCenter.style.display = "none";
    homeScroll.style.display = "none";
    body.style.overflowY = "auto";
    aboutSelector.style.display = "flex";
  }, 800);
}

function home() {
  homeScroll.style.display = "flex";
  homeLeft.style.width = "50%";
  homeSelector.classList.add("active");
  homeCenter.style.marginLeft = "0%";
  body.style.overflow = "hidden";
  homeCenter.style.display = "flex";
  homeScroll.style.display = "flex";
  aboutSelector.style.display = "none";
  body.scrollTop = 0;
  scroller = 1;
  window.location.hash = "";
  clearTimeout(scrollabout);
}
r(function() {
  //*******************************************************
  //***                   DETECT PHONE                  ***
  //*******************************************************

  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    document.querySelector("#scroll__text").html("Swipe Down");
  }

  //*******************************************************
  //***                     FORM                        ***
  //*******************************************************

  var nameval = false,
    emailval = false,
    textval = false,
    thanks = false;
  document.getElementById("form").action = "";

  var regex = new RegExp(
    '^(([^<>()[\\]\\\\.,;:\\s@\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\"]+)*)|' +
      '(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])' +
      "|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
  );

  document
    .querySelector(".form__input.email input")
    .addEventListener("keyup", function() {
      this.parentElement.classList.toggle("success", regex.test(this.value));
      if (
        regex.test(document.querySelector(".form__input.email input").value)
      ) {
        emailval = true;
      } else {
        emailval = false;
      }
    });

  document
    .querySelector(".form__input.name input")
    .addEventListener("keyup", function() {
      this.parentElement.classList.toggle("success", this.value.length > 2);
      if (document.querySelector(".form__input.name input").value.length > 2) {
        nameval = true;
      } else {
        nameval = false;
      }
    });

  document
    .querySelector(".form__input.textarea textarea")
    .addEventListener("keyup", function() {
      this.parentElement.classList.toggle("success", this.value.length > 10);
      if (
        document.querySelector(".form__input.textarea textarea").value.length >
        10
      ) {
        textval = true;
      } else {
        textval = false;
      }
    });

  document.querySelector("#form").addEventListener("submit", function(e) {
    if (emailval === false || nameval === false || textval === false) {
      e.preventDefault();
    }
    if (emailval === false) {
      document.querySelector(".form__input.email input").style.border =
        "1px solid #fa3620";
    } else {
      document.querySelector(".form__input.email input").style.border = "none";
    }
    if (nameval === false) {
      document.querySelector(".form__input.name input").style.border =
        "1px solid #fa3620";
    } else {
      document.querySelector(".form__input.name input").style.border = "none";
    }
    if (textval === false) {
      document.querySelector(".form__input.textarea textarea").style.border =
        "1px solid #fa3620";
    } else {
      document.querySelector(".form__input.textarea textarea").style.border =
        "none";
    }
    if (nameval === true && emailval === true && textval === true) {
      document.getElementById("form").action =
        "https://getsimpleform.com/messages?form_api_token=d55de506b28707f8ee113a4e3e6c1539";
      thanks = true;
      return true;
    }
    return false;
  });
  //*******************************************************
  //***                     SCROLLING                   ***
  //*******************************************************

  document.querySelector("body").addEventListener("scroll", function() {
    var $height = body.scrollTop;
    if ($height === 0) {
      scroller = 0;
    }
    if ($height !== 0) {
      scroller = 1;
    }
    if ($height >= 100) {
      document.querySelector(".header").classList.add("active");
    }
    if ($height < 250) {
      document.querySelector(".header").classList.remove("active");
    }
    if (
      $height < document.getElementById("aboutsection").offsetTop &&
      $height > 1
    ) {
      window.location.hash = "about";
    } else if (
      $height >= document.getElementById("portfoliosection").offsetTop &&
      $height <= document.getElementById("contactsection").offsetTop - 200
    ) {
      window.location.hash = "portfolio";
    } else if (
      $height >=
      document.getElementById("contactsection").offsetTop - 200
    ) {
      if (window.location.hash !== "#contactthanks" && thanks === false) {
        window.location.hash = "contact";
      } else {
        window.location.hash = "contactthanks";
      }
    }
  });
  setTimeout(function() {
    window.addEventListener(
      "wheel",
      function(e) {
        if (
          e.deltaY < 0 &&
          window.location.hash === "#about" &&
          menuStatus === false &&
          scroller === 0
        ) {
          body.style.overflow = "hidden";
          aboutSelector.style.display = "none";
          home();
          scroller = 0;
        } else if (
          e.deltaY > 0 &&
          window.location.hash === "" &&
          menuStatus === false
        ) {
          about();
          window.location.hash = "about";
        }
      },
      {
        passive: true,
      },
    );
  }, 1200);

  //*******************************************************
  //***                     HASH                        ***
  //*******************************************************

  if (window.location.hash === "") {
    homeSelector.classList.add("active");
    (homeSelector.style.display = "flex"), menuHome.classList.toggle("active");
  } else if (window.location.hash === "#about") {
    homeSelector.classList.add("active");
    homeLeft.style.animation = "leftSide2 1s";
    homeScroll.style.display = "none";
    about();
  } else if (window.location.hash === "#portfolio") {
    homeScroll.style.display = "none";
    homeLeft.style.animation = "leftSide2 .5s";
    about();
    menuPortfolio.classList.toggle("active");
    menuAbout.classList.remove("active");
    document.querySelector("#portfoliosection").scrollIntoView(true);
    homeScroll.style.display = "none";
  } else if (
    window.location.hash === "#contact" ||
    window.location.hash === "#contactthanks"
  ) {
    about();
    homeScroll.style.display = "none";
    menuContact.classList.toggle("active");
    menuAbout.classList.remove("active");
    if (window.location.hash === "#contactthanks") {
      homeLeft.style.animation = "leftSide2 .5s";
      homeScroll.style.display = "none";
      document.querySelector("#contactsection").scrollIntoView(true);
    } else {
      homeLeft.style.animation = "leftSide2 .5s";
      homeScroll.style.display = "none";
      document.querySelector("#contactsection").scrollIntoView(true);
    }
  } else {
    (homeSelector.style.display = "flex"), menuHome.classList.toggle("active");
    window.location.hash = "";
  }
  window.addEventListener("hashchange", function() {
    if (window.location.hash === "") {
      menuHome.classList.toggle("active");
      menuPortfolio.classList.remove("active");
      menuAbout.classList.remove("active");
      menuContact.classList.remove("active");
    } else if (window.location.hash === "#about") {
      menuPortfolio.classList.remove("active");
      menuHome.classList.remove("active");
      menuContact.classList.remove("active");
      menuAbout.classList.add("active");
    } else if (window.location.hash === "#portfolio") {
      menuHome.classList.remove("active");
      menuAbout.classList.remove("active");
      menuContact.classList.remove("active");
      menuPortfolio.classList.add("active");
    } else if (
      window.location.hash === "#contact" ||
      window.location.hash === "#contactthanks"
    ) {
      menuPortfolio.classList.remove("active");
      menuAbout.classList.remove("active");
      menuContact.classList.remove("active");
      menuContact.classList.add("active");
    }
  });

  //*******************************************************
  //***                     MENU                        ***
  //*******************************************************
  menuToggle.addEventListener("click", function() {
    if (menuToggle.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  menuHome.addEventListener("click", function() {
    if (window.location.hash !== "#home") {
      home();
      setTimeout(function() {
        closeMenu();
      }, 300);
    } else {
      closeMenu();
    }
  });

  menuAbout.addEventListener("click", function() {
    if (window.location.hash !== "#about") {
      about();
      window.location.hash = "about";
      setTimeout(function() {
        closeMenu();
      }, 800);
    } else {
      closeMenu();
    }
  });
  menuPortfolio.addEventListener("click", function() {
    if (window.location.hash !== "#portfolio") {
      about();
      document.querySelector("#portfoliosection").scrollIntoView(true);
      setTimeout(function() {
        closeMenu();
      }, 800);
    } else {
      closeMenu();
    }
  });
  menuContact.addEventListener("click", function() {
    if (window.location.hash !== "#contact") {
      about();
      document.querySelector("#contactsection").scrollIntoView(true);
      setTimeout(function() {
        closeMenu();
      }, 800);
    } else {
      closeMenu();
    }
  });

  //*******************************************************
  //***                    SWIPE SUPPORT                ***
  //*******************************************************

  document.addEventListener("touchstart", handleTouchStart, false);
  document.addEventListener("touchmove", handleTouchMove, false);

  var xDown = null;
  var yDown = null;

  function getTouches(evt) {
    return evt.touches || evt.originalEvent.touches;
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
        if (
          window.location.hash === "#about" &&
          menuStatus === false &&
          scroller === 0
        ) {
          body.style.overflow = "hidden";
          aboutSelector.style.display = "none";
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

  window.onload = function() {
    if (window.location.hash === "#contactthanks") {
      document.getElementById("thank-you-message").className = "none";
    }
  };
});
