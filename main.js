var scroller = 0;
var menuStatus = false;
var scrollabout;

const topMenu = document.querySelector(".top-menu");
const menuToggle = document.querySelector(".menu-toggle");
const footer = document.querySelector(".footer");
const homeLeft = document.querySelector(".home__left");
const menuHome = document.querySelector("#menu-home");
const menuAbout = document.querySelector("#menu-about");
const menuPortfolio = document.querySelector("#menu-portfolio");
const menuContact = document.querySelector("#menu-contact");
const homeCenter = document.querySelector(".home__center");
const homeScroll = document.querySelector(".home__scroll");

const homeSelector = document.querySelector(".home");
const portfolio = document.querySelector(".portfolio");
const contact = document.querySelector(".contact");
const aboutSelector = document.querySelector(".about");
const scroll = document.querySelector(".scroll");

const body = document.querySelector("body");

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
  //***                     MENU                        ***
  //*******************************************************
  //
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
