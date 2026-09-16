(function () {
  "use strict";

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Scroll progress bar ---------- */
  var progressBar = document.getElementById("progressBar");
  function updateProgress() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }

  /* ---------- Sticky header shadow + back-to-top ---------- */
  var header = document.getElementById("siteHeader");
  var backToTop = document.getElementById("backToTop");
  function updateOnScroll() {
    updateProgress();
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
    if (window.scrollY > 600) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
    updateActiveNav();
  }

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", function () {
    var isOpen = mainNav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      mainNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Scrollspy for nav links ---------- */
  var navLinks = Array.prototype.slice.call(mainNav.querySelectorAll("a"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      return document.getElementById(id);
    })
    .filter(Boolean);

  function updateActiveNav() {
    var scrollPos = window.scrollY + 140;
    var currentId = null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) {
        currentId = sec.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle("is-active", link.getAttribute("href") === "#" + currentId);
    });
  }

  /* Now that updateActiveNav's dependencies exist, wire up scroll handling */
  window.addEventListener("scroll", updateOnScroll, { passive: true });
  updateOnScroll();

  /* ---------- Tabs (Two Reforms) ---------- */
  document.querySelectorAll("[data-tabs]").forEach(function (tabsEl) {
    var buttons = tabsEl.querySelectorAll(".tab-btn");
    var panels = tabsEl.querySelectorAll(".tab-panel");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        panels.forEach(function (p) {
          p.classList.remove("is-active");
          p.hidden = true;
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        var target = document.getElementById(btn.getAttribute("data-tab-target"));
        target.classList.add("is-active");
        target.hidden = false;
      });
    });
  });

  /* ---------- Interactive split chart ---------- */
  document.querySelectorAll("[data-split-chart]").forEach(function (chart) {
    var segs = chart.querySelectorAll(".split-seg");
    var panels = chart.querySelectorAll("[data-seg-panel]");
    function activate(segKey) {
      segs.forEach(function (s) {
        s.classList.toggle("is-active", s.getAttribute("data-seg") === segKey);
      });
      panels.forEach(function (p) {
        p.classList.toggle("is-active", p.getAttribute("data-seg-panel") === segKey);
      });
    }
    segs.forEach(function (seg) {
      seg.addEventListener("mouseenter", function () {
        activate(seg.getAttribute("data-seg"));
      });
      seg.addEventListener("click", function () {
        activate(seg.getAttribute("data-seg"));
      });
      seg.addEventListener("focus", function () {
        activate(seg.getAttribute("data-seg"));
      });
    });
  });

  /* ---------- Accordion (Putting it into a plan) ---------- */
  document.querySelectorAll("[data-accordion]").forEach(function (accordion) {
    var items = accordion.querySelectorAll(".accordion-item");
    items.forEach(function (item) {
      var trigger = item.querySelector(".accordion-trigger");
      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");
        items.forEach(function (i) {
          i.classList.remove("is-open");
          i.querySelector(".accordion-trigger").setAttribute("aria-expanded", "false");
        });
        if (!isOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }
      });
    });
  });
})();
