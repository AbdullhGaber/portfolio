(function () {
  "use strict";

  /* ---------------- Theme toggle ---------------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var STORAGE_KEY = "ag-portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.setAttribute("aria-pressed", theme === "light");
  }

  var savedTheme = null;
  try { savedTheme = localStorage.getItem(STORAGE_KEY); } catch (e) {}

  if (savedTheme) {
    applyTheme(savedTheme);
  } else {
    var prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(current);
      try { localStorage.setItem(STORAGE_KEY, current); } catch (e) {}
    });
  }

  /* ---------------- Mobile nav ---------------- */
  var burger = document.getElementById("navBurger");
  var navTabs = document.getElementById("navTabs");

  if (burger && navTabs) {
    burger.addEventListener("click", function () {
      var isOpen = navTabs.classList.toggle("open");
      burger.classList.toggle("open", isOpen);
      burger.setAttribute("aria-expanded", isOpen);
    });

    navTabs.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navTabs.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------------- Scroll reveal ---------------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------------- Active nav link on scroll ---------------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("section[id], header[id]"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-tabs a"));

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0] ? sections[0].id : null;

    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec.id;
    });

    navLinks.forEach(function (link) {
      var match = link.getAttribute("href") === "#" + current;
      link.classList.toggle("active", match);
    });
  }
  window.addEventListener("scroll", throttle(setActiveLink, 100));
  setActiveLink();

  /* ---------------- Back to top ---------------- */
  var toTop = document.getElementById("toTop");
  function toggleToTop() {
    if (!toTop) return;
    toTop.classList.toggle("show", window.scrollY > 700);
  }
  window.addEventListener("scroll", throttle(toggleToTop, 150));
  toggleToTop();
  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------------- Nav background on scroll ---------------- */
  var nav = document.querySelector(".nav");
  function toggleNavBg() {
    if (!nav) return;
    nav.style.borderBottomColor = window.scrollY > 40 ? "var(--border-strong)" : "var(--border)";
  }
  window.addEventListener("scroll", throttle(toggleNavBg, 100));

  /* ---------------- Project filter ---------------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        var tags = (card.getAttribute("data-tags") || "").split(",");
        var show = filter === "all" || tags.indexOf(filter) !== -1;
        card.style.display = show ? "" : "none";
      });
    });
  });

  /* ---------------- Terminal typing effect ---------------- */
  var terminalBody = document.getElementById("terminalBody");
  if (terminalBody) {
    var script = [
      { type: "cmd", text: "whoami" },
      { type: "out", text: "Abdullh Gaber — Native Android Developer" },
      { type: "cmd", text: "stack --core" },
      { type: "out", text: "Kotlin · Jetpack Compose · Clean Architecture" },
      { type: "cmd", text: "status --check" },
      { type: "out", text: "Open to Android / Mobile opportunities ✓" }
    ];

    var lineIndex = 0;
    var charIndex = 0;
    var currentLineEl = null;

    function typeNext() {
      if (lineIndex >= script.length) {
        var cursor = document.createElement("span");
        cursor.className = "terminal-cursor";
        if (currentLineEl) currentLineEl.appendChild(cursor);
        return;
      }

      var item = script[lineIndex];

      if (charIndex === 0) {
        var lineWrap = document.createElement("div");
        lineWrap.className = "terminal-line";

        if (item.type === "cmd") {
          var promptSpan = document.createElement("span");
          promptSpan.className = "prompt";
          promptSpan.textContent = "❯";
          lineWrap.appendChild(promptSpan);
        }

        var textSpan = document.createElement("span");
        textSpan.className = item.type === "cmd" ? "" : "out";
        lineWrap.appendChild(textSpan);

        terminalBody.appendChild(lineWrap);
        currentLineEl = textSpan;
      }

      if (charIndex < item.text.length) {
        currentLineEl.textContent += item.text.charAt(charIndex);
        charIndex++;
        setTimeout(typeNext, item.type === "cmd" ? 42 : 16);
      } else {
        charIndex = 0;
        lineIndex++;
        setTimeout(typeNext, item.type === "cmd" ? 260 : 420);
      }
    }

    var terminalObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setTimeout(typeNext, 400);
          terminalObserver.disconnect();
        }
      });
    }, { threshold: 0.4 });
    terminalObserver.observe(terminalBody);
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------- Utils ---------------- */
  function throttle(fn, wait) {
    var last = 0;
    return function () {
      var now = Date.now();
      if (now - last >= wait) {
        last = now;
        fn();
      }
    };
  }
})();
