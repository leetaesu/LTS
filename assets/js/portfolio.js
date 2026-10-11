// 필터 칩 · 이미지 확대(라이트박스). 외부 라이브러리 없음.
(function () {
  var themeBtn = document.getElementById("theme");
  if (themeBtn) themeBtn.addEventListener("click", function () {
    var next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // [data-filter-group] 안의 .chip[data-f]를 누르면, 같은 [data-scope] 안의 [data-t] 항목을 걸러 보여준다.
  document.querySelectorAll("[data-filter-group]").forEach(function (group) {
    group.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c.classList.contains("on")); });
    var scope = document.querySelector(group.getAttribute("data-filter-group")) || document;
    group.addEventListener("click", function (e) {
      var chip = e.target.closest(".chip");
      if (!chip) return;
      group.querySelectorAll(".chip").forEach(function (c) { c.classList.toggle("on", c === chip); c.setAttribute("aria-pressed", c === chip); });
      var f = chip.getAttribute("data-f");
      scope.querySelectorAll("[data-t]").forEach(function (el) {
        el.classList.toggle("hide", f !== "all" && el.getAttribute("data-t").split(" ").indexOf(f) === -1);
      });
    });
  });

  var lb = document.createElement("div");
  lb.className = "lb";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "이미지 확대 보기");
  var lastFocus = null;
  lb.innerHTML = '<button type="button">닫기 ✕</button><img alt="">';
  document.body.appendChild(lb);
  var img = lb.querySelector("img");
  function close() { lb.classList.remove("on"); img.removeAttribute("src"); if (lastFocus) lastFocus.focus(); }
  lb.addEventListener("click", close);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-lb]");
    if (!a) return;
    e.preventDefault();
    lastFocus = a;
    img.src = a.getAttribute("href") || a.getAttribute("data-lb");
    lb.classList.add("on");
    lb.querySelector("button").focus();
  });
})();
