var scroller = 0;
var menuStatus = false;
var scrollabout;

const topMenu = document.querySelector(".top-menu");
const menuToggle = document.querySelector(".menu-toggle");
const logo = document.querySelector(".header__logo");
const menuHome = document.querySelector("#menu-home");
const menuAbout = document.querySelector("#menu-about");
const menuPortfolio = document.querySelector("#menu-portfolio");
const menuContact = document.querySelector("#menu-contact");
const aside = document.querySelector(".aside");

const homeSelector = document.querySelector(".home");
const portfolio = document.querySelector(".portfolio");
const contact = document.querySelector(".contact");
const aboutSelector = document.querySelector(".about");

const body = document.querySelector("body");

function r(f) {
  /in/.test(document.readyState) ? setTimeout("r(" + f + ")", 9) : f();
}

function Bar() {
  var Scroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (Scroll / height) * 100;
  document.getElementById("progress-bar__fill").style.height = scrolled + "%";
}

function getElementY(query) {
  return (
    window.pageYOffset +
    document.querySelector(query).getBoundingClientRect().top
  );
}

function doScrolling(element, duration) {
  closeMenu();
  var startingY = window.pageYOffset;
  var elementY = getElementY(element);
  var targetY =
    document.body.scrollHeight - elementY < window.innerHeight
      ? document.body.scrollHeight - window.innerHeight
      : elementY;
  var diff = targetY - startingY;
  var easing = function(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  var start;
  if (!diff) return;
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    var time = timestamp - start;
    var percent = Math.min(time / duration, 1);
    percent = easing(percent);
    window.scrollTo(0, startingY + diff * percent);
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  });
}

document
  .getElementById("home-btn")
  .addEventListener("click", doScrolling.bind(null, "#aboutsection", 1000));

function closeMenu() {
  if (menuStatus) {
    menuStatus = false;
    menuToggle.classList.toggle("active");
    topMenu.classList.remove("active");
    body.style.overflowY = "auto";
  }
}

function openMenu() {
  topMenu.classList.add("active");
  menuStatus = true;
  menuToggle.classList.toggle("active");
  body.style.overflow = "hidden";
}

r(function() {
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
    if (!emailval || !nameval || !textval) {
      e.preventDefault();
    }
    if (!emailval) {
      document.querySelector(".form__input.email input").style.border =
        "1px solid #ef233c";
    } else {
      document.querySelector(".form__input.email input").style.border = "none";
    }
    if (!nameval) {
      document.querySelector(".form__input.name input").style.border =
        "1px solid #ef233c";
    } else {
      document.querySelector(".form__input.name input").style.border = "none";
    }
    if (!textval) {
      document.querySelector(".form__input.textarea textarea").style.border =
        "1px solid #ef233c";
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
  document
    .getElementById("menu-home")
    .addEventListener("click", doScrolling.bind(null, "#homesection", 1000));
  document
    .getElementById("menu-about")
    .addEventListener("click", doScrolling.bind(null, "#aboutsection", 1000));
  document
    .getElementById("menu-contact")
    .addEventListener("click", doScrolling.bind(null, "#contactsection", 1000));

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
          !menuStatus &&
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
        if (window.location.hash === "" && !menuStatus) {
          about();
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }

  window.onscroll = function() {
    Bar();
  };

  window.onload = function() {
    if (window.location.hash === "#contactthanks") {
      document.getElementById("thank-you-message").className = "none";
    }
  };
});
