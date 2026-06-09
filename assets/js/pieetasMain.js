/*
	Gravity by Chipper Technology
  chippertechnology.com
*/

function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  const body = document.body;
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }

  if (body) {
    body.classList.remove("navPanel-visible");
  }
}

var settings = {
  slideshow: {
    // Transition speed (in ms)
    // For timing purposes only. It *must* match the transition speed of ".carousel > article".
    speed: 350,
  },
};

(function ($) {
  var $window = $(window),
    $body = $("body");

  // Breakpoints.
  breakpoints({
    xlarge: ["1281px", "1680px"],
    large: ["981px", "1280px"],
    medium: ["737px", "980px"],
    small: ["481px", "736px"],
    xsmall: [null, "480px"],
  });

  // Play initial animations on page load.
  $window.on("load", function () {
    window.setTimeout(function () {
      $body.removeClass("is-preload");
    }, 100);
  });

  // Touch mode.
  if (browser.mobile) $body.addClass("is-touch");

  // Dropdowns.
  $("#nav > ul").dropotron({
    alignment: $body.hasClass("landing") ? "center" : "right",
    hideDelay: 400,
  });

  // Off-Canvas Navigation.

  // Title Bar.

  $(
    '<div id="titleBar">' +
      '<a href="#navPanel" class="toggle"></a>' +
      '<span class="title">' +
      $("#logo").html() +
      "</span>" +
      "</div>",
  ).appendTo($body);

  // Navigation Panel.
  $('<div id="navPanel">' + "<nav>" + $("#nav").navList() + "</nav>" + "</div>")
    .appendTo($body)
    .panel({
      delay: 500,
      hideOnClick: true,
      hideOnSwipe: true,
      resetScroll: true,
      resetForms: true,
      side: "left",
      target: $body,
      visibleClass: "navPanel-visible",
    });

  /**
   * Custom carousel for Altitude.
   * @return {jQuery} jQuery object.
   */
  $.fn._slideshow = function (options) {
    var $window = $(window),
      $this = $(this);

    // Handle no/multiple elements.
    if (this.length == 0) return $this;

    if (this.length > 1) {
      for (var i = 0; i < this.length; i++) $(this[i])._slider(options);

      return $this;
    }

    // Vars.
    var current = 0,
      pos = 0,
      lastPos = 0,
      slides = [],
      $slides = $this.children("article"),
      intervalId,
      isLocked = false,
      i = 0;

    // Functions.
    $this._switchTo = function (x, stop) {
      // Handle lock.
      if (isLocked || pos == x) return;

      isLocked = true;

      // Stop?
      if (stop) window.clearInterval(intervalId);

      // Update positions.
      lastPos = pos;
      pos = x;

      // Hide last slide.
      slides[lastPos].removeClass("visible");

      // Finish hiding last slide after a short delay.
      window.setTimeout(function () {
        // Hide last slide (display).
        slides[lastPos].hide();

        // Show new slide (display).
        slides[pos].show();

        // Show new new slide.
        window.setTimeout(function () {
          slides[pos].addClass("visible");
        }, 25);

        // Unlock after sort delay.
        window.setTimeout(function () {
          isLocked = false;
        }, options.speed);
      }, options.speed);
    };

    // Slides.
    $slides.each(function () {
      var $slide = $(this);

      // Add to slides.
      slides.push($slide);

      // Hide.
      $slide.hide();

      i++;
    });

    // Nav.
    $this
      .on("click", ".next", function (event) {
        console.log("da li je tu uopste?");
        // Prevent default.
        event.preventDefault();
        event.stopPropagation();

        // Increment.
        current++;

        if (current >= slides.length) current = 0;

        // Switch.
        $this._switchTo(current);
      })
      .on("click", ".previous", function (event) {
        // Prevent default.
        event.preventDefault();
        event.stopPropagation();

        // Decrement.
        current--;

        if (current < 0) current = slides.length - 1;

        // Switch.
        $this._switchTo(current);
      });

    // Initial slide.
    slides[pos].show().addClass("visible");

    // Bail if we only have a single slide.
    if (slides.length == 1) return;
  };

  // Carousels.
  $(".slideshow")._slideshow(settings.slideshow);

  // Carousel.
  $(".carousel").each(function () {
    var $this = $(this);

    if (!browser.mobile) {
      $this.css("overflow-x", "hidden");

      // Wrapper.
      $this.wrap('<div class="carousel-wrapper" />');
      var $wrapper = $this.parent();

      // Nav.
      var $navRight = $('<div class="nav right"></div>').insertAfter($this),
        $navLeft = $('<div class="nav left"></div>').insertAfter($this),
        intervalId;

      $navLeft
        .on("mouseenter", function () {
          intervalId = window.setInterval(function () {
            $this.scrollLeft($this.scrollLeft() - 5);
          }, 10);
        })
        .on("mouseleave", function () {
          window.clearInterval(intervalId);
        });

      $navRight
        .on("mouseenter", function () {
          intervalId = window.setInterval(function () {
            $this.scrollLeft($this.scrollLeft() + 5);
          }, 10);
        })
        .on("mouseleave", function () {
          window.clearInterval(intervalId);
        });

      // Events.
      $window.on("resize load", function () {
        if ($this.width() < $this.prop("scrollWidth"))
          $wrapper.removeClass("no-scroll");
        else $wrapper.addClass("no-scroll");
      });
    }

    // Poptrox.
    $this.poptrox({
      baseZIndex: 100001,
      useBodyOverflow: false,
      usePopupEasyClose: false,
      overlayColor: "#000000",
      overlayOpacity: 0.75,
      usePopupDefaultStyling: false,
      popupLoaderText: "",
      usePopupNav: true,
      usePopupCaption: true,
    });

    breakpoints.on("<=small", function () {
      $this[0]._poptrox.usePopupCaption = false;
      $this[0]._poptrox.usePopupCloser = false;
      $this[0]._poptrox.windowMargin = 10;
    });

    breakpoints.on(">small", function () {
      $this[0]._poptrox.usePopupCaption = true;
      $this[0]._poptrox.usePopupCloser = true;
      $this[0]._poptrox.windowMargin = 50;
    });
  });
})(jQuery);
