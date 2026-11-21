/* Telkom Labs. Plain JavaScript, no dependencies: page transitions, swipe between sections, the publication
   facets and BibTeX copy. Without it the navigation is ordinary links and the publication list shows in full. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var head = document.querySelector(".head");
  var here = head ? Number(head.getAttribute("data-pos")) : 0;
  function $$(sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); }
  function path(url) { return new URL(url, location.href).pathname.replace(/index\.html$/, ""); }

  // Each section has a place in reading order (lab 0, research 100, projects 200, about 300); pages inside a
  // section sit just after it (a paper is 101+), so leaving a paper for its section's index reads as going back.
  var places = {};
  $$("[data-pivot] a[data-pos]").forEach(function (a) { places[path(a.href)] = Number(a.getAttribute("data-pos")); });

  /* ---------- pivot: on narrow screens, scroll it so the current section comes first ---------- */
  function pivots() {
    $$("[data-pivot]").forEach(function (nav) {
      var on = nav.querySelector("[aria-current]");
      if (on && nav.scrollWidth > nav.clientWidth) nav.scrollLeft = on.offsetLeft - nav.offsetLeft;
    });
  }

  /* ---------- leave in the direction of travel; the next page slides in from the same side ---------- */
  function go(url, back) {
    try { sessionStorage.setItem("pivot-dir", back ? "back" : "next"); } catch (e) { /* private mode */ }
    if (reduce.matches) { location.href = url; return; }
    document.body.classList.add("is-leaving");
    document.body.classList.toggle("go-back", back);
    setTimeout(function () { location.href = url; }, 220);
  }
  function isPage(url) {
    if (url.origin !== location.origin) return false;
    if (/\.[a-z0-9]+$/i.test(url.pathname) && !/\.html$/i.test(url.pathname)) return false; // files such as .bib
    return url.pathname !== location.pathname || url.search !== location.search;
  }
  function transitions() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[href]");
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (a.target && a.target !== "_self") return;
      var url = new URL(a.href, location.href);
      if (!isPage(url)) return;
      var to = places[path(url.href)];
      e.preventDefault();
      go(url.href, to !== undefined && to < here);
    });
    window.addEventListener("pageshow", function (e) {
      if (e.persisted) document.body.classList.remove("is-leaving", "go-back");
    });
  }

  /* ---------- swipe sideways to the next or previous section in the pivot, as on Windows Phone ---------- */
  function swipe() {
    var list = $$(".pivot a[data-pos]");
    var section = Math.floor(here / 100) * 100; // from a paper or product, swipe between sections too
    var i = list.findIndex(function (a) { return Number(a.getAttribute("data-pos")) === section; });
    if (i < 0) return;
    var x0 = 0;
    var y0 = 0;
    var tracking = false;
    document.addEventListener("touchstart", function (e) {
      tracking = e.touches.length === 1 && !e.target.closest(".pivot, pre"); // these scroll sideways
      if (!tracking) return;
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (!tracking) return;
      tracking = false;
      var t = e.changedTouches[0];
      var dx = t.clientX - x0;
      var dy = t.clientY - y0;
      if (Math.abs(dx) < 80 || Math.abs(dx) < Math.abs(dy) * 1.8) return;
      var next = list[i + (dx < 0 ? 1 : -1)];
      if (next) go(next.href, dx > 0);
    }, { passive: true });
  }

  /* ---------- Zune facets: one column of lists that narrow the papers beside it, with live counts ---------- */
  function facets() {
    var box = document.querySelector("[data-facets]");
    if (!box) return;
    box.hidden = false;
    var cols = $$("[data-facet]", box);
    var items = $$(".tracks > li");
    var count = document.querySelector("[data-count]");
    var empty = document.querySelector("[data-empty]");
    function picked(col) {
      return $$("button[data-value][aria-pressed='true']", col).map(function (b) { return b.getAttribute("data-value"); });
    }
    function has(li, key, values) {
      if (!values.length) return true;
      var have = (li.dataset[key] || "").split("|");
      return values.some(function (v) { return have.indexOf(v) > -1; });
    }
    function apply() {
      var sel = cols.map(function (c) { return { key: c.getAttribute("data-facet"), values: picked(c) }; });
      var shown = 0;
      items.forEach(function (li) {
        var ok = sel.every(function (s) { return has(li, s.key, s.values); });
        li.hidden = !ok;
        if (ok) shown++;
      });
      // Each value's count: the papers it would add, given what the other columns already hold.
      cols.forEach(function (col, n) {
        var others = sel.filter(function (s, k) { return k !== n; });
        var key = sel[n].key;
        $$("button[data-value]", col).forEach(function (b) {
          var v = b.getAttribute("data-value");
          var c = items.filter(function (li) {
            return has(li, key, [v]) && others.every(function (s) { return has(li, s.key, s.values); });
          }).length;
          b.querySelector("span").textContent = c;
        });
        col.querySelector("[data-all]").setAttribute("aria-pressed", String(!sel[n].values.length));
      });
      count.textContent = shown + " of " + items.length;
      empty.hidden = shown > 0;
    }
    box.addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      var col = b.closest("[data-facet]");
      if (b.hasAttribute("data-all")) {
        $$("button[data-value]", col).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      } else {
        b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"));
      }
      apply();
    });
    document.querySelector("[data-reset]").addEventListener("click", function () {
      $$("button[data-value]", box).forEach(function (x) { x.setAttribute("aria-pressed", "false"); });
      apply();
      box.querySelector("button").focus();
    });
  }

  /* ---------- copy BibTeX ---------- */
  function copy() {
    $$("[data-copy]").forEach(function (btn) {
      var src = document.getElementById(btn.getAttribute("data-copy"));
      var label = btn.querySelector("[data-copy-label]");
      if (!src || !label) return;
      var text = label.textContent;
      label.setAttribute("aria-live", "polite");
      btn.hidden = false;
      btn.addEventListener("click", function () {
        function done(ok) {
          label.textContent = ok ? "copied" : "selected: press ctrl+c to copy";
          setTimeout(function () { label.textContent = text; }, 2000);
        }
        function fallback() {
          var range = document.createRange();
          range.selectNodeContents(src);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          var ok = false;
          try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
          done(ok);
        }
        if (navigator.clipboard && window.isSecureContext) {
          // A permission prompt can leave the promise pending; after a moment, select the text instead.
          var settled = false;
          var finish = function (fn) { return function () { if (!settled) { settled = true; clearTimeout(timer); fn(); } }; };
          var timer = setTimeout(finish(fallback), 1500);
          navigator.clipboard.writeText(src.textContent).then(finish(function () { done(true); }), finish(fallback));
        } else {
          fallback();
        }
      });
    });
  }

  pivots();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(pivots); // widths change once Selawik loads
  transitions();
  swipe();
  facets();
  copy();
})();
