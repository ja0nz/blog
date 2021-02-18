(() => {
  // src/main.js
  var exposed = {};
  if (location.search) {
    a = document.createElement("a");
    a.href = location.href;
    a.search = "";
    history.replaceState(null, null, a.href);
  }
  var a;
  function tweet_(url) {
    open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url), "_blank");
  }
  function tweet(anchor) {
    tweet_(anchor.getAttribute("href"));
  }
  expose("tweet", tweet);
  function share(anchor) {
    var url = anchor.getAttribute("href");
    event.preventDefault();
    if (navigator.share) {
      navigator.share({
        url
      });
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      message("Article URL copied to clipboard.");
    } else {
      tweet_(url);
    }
  }
  expose("share", share);
  function message(msg) {
    var dialog = document.getElementById("message");
    dialog.textContent = msg;
    dialog.setAttribute("open", "");
    setTimeout(function() {
      dialog.removeAttribute("open");
    }, 3e3);
  }
  function prefetch(e) {
    if (e.target.tagName != "A") {
      return;
    }
    if (e.target.origin != location.origin) {
      return;
    }
    const removeUrlFragment = (url) => url.split("#")[0];
    if (removeUrlFragment(window.location.href) === removeUrlFragment(e.target.href)) {
      return;
    }
    var l = document.createElement("link");
    l.rel = "prefetch";
    l.href = e.target.href;
    document.head.appendChild(l);
  }
  document.documentElement.addEventListener("mouseover", prefetch, {
    capture: true,
    passive: true
  });
  document.documentElement.addEventListener("touchstart", prefetch, {
    capture: true,
    passive: true
  });
  var GA_ID = document.documentElement.getAttribute("ga-id");
  window.ga = window.ga || function() {
    if (!GA_ID) {
      return;
    }
    (ga.q = ga.q || []).push(arguments);
  };
  ga.l = +new Date();
  ga("create", GA_ID, "auto");
  ga("set", "transport", "beacon");
  var timeout = setTimeout(onload = function() {
    clearTimeout(timeout);
    ga("send", "pageview");
  }, 1e3);
  var ref = +new Date();
  function ping(event2) {
    var now = +new Date();
    if (now - ref < 1e3) {
      return;
    }
    ga("send", {
      hitType: "event",
      eventCategory: "page",
      eventAction: event2.type,
      eventLabel: Math.round((now - ref) / 1e3)
    });
    ref = now;
  }
  addEventListener("pagehide", ping);
  addEventListener("visibilitychange", ping);
  var dynamicScriptInject = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.type = "text/javascript";
      document.head.appendChild(script);
      script.addEventListener("load", () => {
        resolve(script);
      });
    });
  };
  var sendWebVitals = document.currentScript.getAttribute("data-cwv-src");
  if (/web-vitals.js/.test(sendWebVitals)) {
    dynamicScriptInject(`${window.location.origin}/js/web-vitals.js`).then(() => {
      webVitals.getCLS(sendToGoogleAnalytics);
      webVitals.getFID(sendToGoogleAnalytics);
      webVitals.getLCP(sendToGoogleAnalytics);
    }).catch((error) => {
      console.error(error);
    });
  }
  addEventListener("click", function(e) {
    var button = e.target.closest("button");
    if (!button) {
      return;
    }
    ga("send", {
      hitType: "event",
      eventCategory: "button",
      eventAction: button.getAttribute("aria-label") || button.textContent
    });
  }, true);
  var selectionTimeout;
  addEventListener("selectionchange", function() {
    clearTimeout(selectionTimeout);
    var text = String(document.getSelection()).trim();
    if (text.split(/[\s\n\r]+/).length < 3) {
      return;
    }
    selectionTimeout = setTimeout(function() {
      ga("send", {
        hitType: "event",
        eventCategory: "selection",
        eventAction: text
      });
    }, 2e3);
  }, true);
  if (window.ResizeObserver && document.querySelector("header nav #nav")) {
    let scroll = function() {
      if (!requestedAniFrame) {
        requestAnimationFrame(updateProgress);
        requestedAniFrame = true;
      }
      timeOfLastScroll = Date.now();
    }, updateProgress = function() {
      requestedAniFrame = false;
      var percent = Math.min(document.scrollingElement.scrollTop / (bottom - winHeight) * 100, 100);
      progress.style.transform = `translate(-${100 - percent}vw, 0)`;
      if (Date.now() - timeOfLastScroll < 3e3) {
        requestAnimationFrame(updateProgress);
        requestedAniFrame = true;
      }
    };
    scroll2 = scroll, updateProgress2 = updateProgress;
    progress = document.getElementById("reading-progress");
    timeOfLastScroll = 0;
    requestedAniFrame = false;
    addEventListener("scroll", scroll);
    winHeight = 1e3;
    bottom = 1e4;
    new ResizeObserver(() => {
      bottom = document.scrollingElement.scrollTop + document.querySelector("#comments,footer").getBoundingClientRect().top;
      winHeight = window.innerHeight;
      scroll();
    }).observe(document.body);
  }
  var progress;
  var timeOfLastScroll;
  var requestedAniFrame;
  var winHeight;
  var bottom;
  var scroll2;
  var updateProgress2;
  function expose(name, fn) {
    exposed[name] = fn;
  }
  addEventListener("click", (e) => {
    const handler = e.target.closest("[on-click]");
    if (!handler) {
      return;
    }
    e.preventDefault();
    const name = handler.getAttribute("on-click");
    const fn = exposed[name];
    if (!fn) {
      throw new Error("Unknown handler" + name);
    }
    fn(handler);
  });
  document.body.addEventListener("load", (e) => {
    if (e.target.tagName != "IMG") {
      return;
    }
    e.target.style.backgroundImage = "none";
  }, "true");
})();
