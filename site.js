(function () {
  var CA = "0xed7bc12c9c6e6484e17f7204c16a57a4e2792668";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (!toggle) return;
    var toLight = theme === "dark";
    var label = toLight ? "Switch to light theme" : "Switch to dark theme";
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
  }

  applyTheme(root.getAttribute("data-theme") || "dark");

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem("qubit-theme", next); } catch (e) {}
    });
  }

  document.querySelectorAll("[data-copy]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var ca = btn.querySelector("[data-ca]");
      var original = ca ? ca.textContent : CA;
      function done() {
        if (!ca) return;
        ca.textContent = "Copied";
        window.setTimeout(function () { ca.textContent = original; }, 1200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CA).then(done).catch(function () {});
      }
    });
  });

  var box = document.getElementById("lightbox");
  var shot = document.getElementById("lightbox-img");
  var cap = document.getElementById("lightbox-cap");

  function closeBox() {
    if (!box) return;
    box.hidden = true;
    if (shot) shot.removeAttribute("src");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-meme]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!box || !shot) return;
      shot.src = btn.getAttribute("data-meme");
      shot.alt = btn.getAttribute("data-alt") || "";
      if (cap) cap.textContent = btn.getAttribute("data-alt") || "";
      box.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  if (box) {
    box.addEventListener("click", function (event) {
      if (event.target === box || event.target.closest("[data-close]")) closeBox();
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeBox();
  });
})();
