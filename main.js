/* 장은실 · Eunsil Chang — interactions (progressive enhancement) */
(function () {
  "use strict";

  /* ---- Header scroll state ---- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Mobile nav toggle ---- */
  var toggle = document.getElementById("navToggle");
  var mobileNav = document.getElementById("mobileNav");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      mobileNav.hidden = !open;
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        header.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.hidden = true;
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Active nav link on scroll ---- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav a"));
  var sections = navLinks
    .map(function (a) { return document.querySelector(a.getAttribute("href")); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          navLinks.forEach(function (a) {
            a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id);
          });
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Contact form (graceful AJAX → mailto fallback) ---- */
  var form = document.querySelector(".contact-form");
  var statusEl = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", function (e) {
      var action = form.getAttribute("action") || "";
      var configured = action.indexOf("your-id") === -1 && action.indexOf("formspree.io") !== -1;

      if (!configured) {
        // Formspree 미설정 → 메일 클라이언트로 폴백
        e.preventDefault();
        var name = encodeURIComponent(form.name.value || "");
        var org = encodeURIComponent(form.organization.value || "");
        var msg = encodeURIComponent(form.message.value || "");
        var body = "이름: " + name + "%0D%0A소속: " + org + "%0D%0A%0D%0A" + msg;
        window.location.href = "mailto:jdiana@naver.com?subject=" +
          encodeURIComponent("[홈페이지 문의] " + (form.name.value || "")) + "&body=" + body;
        setStatus("메일 앱으로 연결합니다. 열리지 않으면 jdiana@naver.com 으로 연락 주세요.", "ok");
        return;
      }

      // Formspree AJAX 전송
      e.preventDefault();
      var btn = form.querySelector("button[type=submit]");
      btn.disabled = true; btn.textContent = "보내는 중…";
      setStatus("", "");

      fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          setStatus("메시지가 전달되었습니다. 빠르게 회신드리겠습니다.", "ok");
        } else {
          setStatus("전송에 실패했습니다. 잠시 후 다시 시도하거나 LinkedIn으로 연락 주세요.", "err");
        }
      }).catch(function () {
        setStatus("네트워크 오류로 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.", "err");
      }).finally(function () {
        btn.disabled = false; btn.textContent = "메시지 보내기";
      });
    });
  }

  function setStatus(text, kind) {
    if (!statusEl) return;
    statusEl.textContent = text;
    statusEl.className = "form-status" + (kind ? " " + kind : "");
  }
})();
