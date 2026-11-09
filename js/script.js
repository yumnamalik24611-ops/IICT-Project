/* GATHERLY - shared JavaScript for all six pages */

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  try { localStorage.setItem("gatherlyTheme", theme); } catch (error) {}
  updateThemeButton();
}

function updateThemeButton() {
  const button = document.querySelector(".theme-toggle");
  if (button) {
    const dark = document.body.classList.contains("dark-mode");
    button.textContent = dark ? "☀" : "☾";
    button.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Restore the visitor's theme preference.
  try {
    if ((localStorage.getItem("gatherlyTheme") || localStorage.getItem("sparkEventsTheme")) === "dark") {
      document.body.classList.add("dark-mode");
    }
  } catch (error) {}
  updateThemeButton();

  // Highlight the current page in the shared navigation.
  const currentPage = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".navbar .nav-link").forEach(function (link) {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Countdown timer appears only on the Home page.
  const countdown = document.getElementById("countdown");
  if (countdown) {
    const eventTime = new Date(countdown.dataset.eventDate).getTime();
    function updateCountdown() {
      const remaining = eventTime - Date.now();
      if (Number.isNaN(eventTime)) {
        countdown.textContent = "Event date to be announced";
        return;
      }
      if (remaining <= 0) {
        countdown.textContent = "The event has started!";
        clearInterval(timer);
        return;
      }
      const units = [
        ["Days", Math.floor(remaining / 86400000)],
        ["Hours", Math.floor((remaining % 86400000) / 3600000)],
        ["Minutes", Math.floor((remaining % 3600000) / 60000)],
        ["Seconds", Math.floor((remaining % 60000) / 1000)]
      ];
      countdown.innerHTML = units.map(function (unit) {
        return "<span>" + unit[1] + "<small>" + unit[0] + "</small></span>";
      }).join("");
    }
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
  }

  // Upcoming Events category filters.
  const filterButtons = document.querySelectorAll("[data-filter]");
  const eventItems = document.querySelectorAll(".event-item");
  const noEvents = document.getElementById("noEvents");
  if (filterButtons.length && eventItems.length) {
    filterButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const selected = button.dataset.filter;
        let visibleCount = 0;
        filterButtons.forEach(function (item) { item.classList.toggle("active", item === button); });
        eventItems.forEach(function (item) {
          const show = selected === "all" || item.dataset.category === selected;
          item.classList.toggle("d-none", !show);
          if (show) visibleCount++;
        });
        if (noEvents) noEvents.classList.toggle("d-none", visibleCount !== 0);
      });
    });
  }

  // Fill one reusable Bootstrap modal with the selected event details.
  const eventModalElement = document.getElementById("eventModal");
  if (eventModalElement && window.bootstrap) {
    document.querySelectorAll(".event-details").forEach(function (button) {
      button.addEventListener("click", function () {
        document.getElementById("eventModalTitle").textContent = button.dataset.title || "Event details";
        document.getElementById("modalDate").textContent = button.dataset.date || "To be announced";
        document.getElementById("modalTime").textContent = button.dataset.time || "To be announced";
        document.getElementById("modalVenue").textContent = button.dataset.venue || "To be announced";
        document.getElementById("modalDescription").textContent = button.dataset.description || "";
        bootstrap.Modal.getOrCreateInstance(eventModalElement).show();
      });
    });
  }

  // Proposal form validation. This is a front-end demo and does not send data.
  const proposalForm = document.getElementById("proposalForm");
  if (proposalForm) {
    const dateInput = document.getElementById("eventDate");
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().split("T")[0];
    if (dateInput) dateInput.min = localToday;

    proposalForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const message = document.getElementById("successMessage");
      const email = document.getElementById("email").value.trim();
      const chosenDate = dateInput ? dateInput.value : "";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!proposalForm.checkValidity()) {
        proposalForm.classList.add("was-validated");
        message.className = "form-message mt-3 text-danger";
        message.textContent = "Please complete all required fields correctly.";
        proposalForm.reportValidity();
        return;
      }
      if (!emailPattern.test(email)) {
        message.className = "form-message mt-3 text-danger";
        message.textContent = "Please enter a valid email address.";
        return;
      }
      if (!chosenDate || chosenDate <= localToday) {
        message.className = "form-message mt-3 text-danger";
        message.textContent = "Please select a future event date.";
        return;
      }

      message.className = "form-message mt-3 text-success";
      message.textContent = "Thank you! Your proposal has passed the form validation.";
      proposalForm.reset();
      proposalForm.classList.remove("was-validated");
      if (dateInput) dateInput.min = localToday;
    });
  }
});

/* =====================================================================
   GATHERLY - shayari, chai, truck-art studio, rickshaw horn
   ===================================================================== */
(function () {
  "use strict";

  // Original couplets written for Gatherly.
  var SHAYARI = [
    { ur: ["چائے کی بھاپ میں گھل جاتی ہیں سب دوریاں", "محفلیں آباد ہوں تو مٹتی ہیں مجبوریاں"],
      ro: ["Chai ki bhaap mein ghul jaati hain sab dooriyaan", "Mehfilein aabaad hon to mit-ti hain majbooriyaan"],
      en: "In the steam of chai, every distance dissolves; where gatherings thrive, hardships fade." },
    { ur: ["اکیلے چلنے میں وہ لطف کہاں اے دوست", "کہ کارواں ہو تو راستے بھی مسکراتے ہیں"],
      ro: ["Akele chalne mein woh lutf kahan ae dost", "Ke kaarwaan ho to raaste bhi muskuraate hain"],
      en: "Where is the joy in walking alone, my friend? With a caravan, even the roads smile." },
    { ur: ["دل سے دل مل جائیں تو ہر شام رنگین ہوتی ہے", "یاروں کی ہو محفل تو ہر رات حسین ہوتی ہے"],
      ro: ["Dil se dil mil jaayein to har shaam rangeen hoti hai", "Yaaron ki ho mehfil to har raat haseen hoti hai"],
      en: "When hearts meet, every evening turns colourful; with friends around, every night is beautiful." },
    { ur: ["کتابیں تو بہت پڑھ لیں، اب کچھ دوست بھی پڑھ لو", "کہ ہر چہرے میں اک پوری کتاب ہوتی ہے"],
      ro: ["Kitaabein to bohat parh leen, ab kuch dost bhi parh lo", "Ke har chehre mein ik poori kitaab hoti hai"],
      en: "You have read plenty of books; now read a few friends too, for every face holds a whole book." },
    { ur: ["چائے ہو، دوست ہوں اور شام ڈھلتی جائے", "بس اتنی سی دعا ہے، یہ محفل چلتی جائے"],
      ro: ["Chai ho, dost hon aur shaam dhalti jaaye", "Bas itni si dua hai, yeh mehfil chalti jaaye"],
      en: "Some chai, some friends, and an evening slowly fading; my only prayer is that this gathering carries on." },
    { ur: ["چراغ سے چراغ جلے تو روشنی بڑھتی ہے", "اکیلی لو کو ہوا بھی بجھا کے جاتی ہے"],
      ro: ["Charaagh se charaagh jale to roshni badhti hai", "Akeli lau ko hawa bhi bujha ke jaati hai"],
      en: "Light grows when one lamp lights another; a lone flame can be snuffed out by a mere breeze." }
  ];

  // Well-known folk lines painted on trucks and rickshaws.
  var SLOGANS = [
    { ur: "ماں کی دعا جنت کی ہوا", ro: "Maa ki dua, jannat ki hawa" },
    { ur: "بُری نظر والے تیرا بھی بھلا", ro: "Buri nazar wale, tera bhi bhala" },
    { ur: "پپو یار تنگ نہ کر", ro: "Pappu yaar tang na kar" },
    { ur: "چلتی کا نام گاڑی", ro: "Chalti ka naam gaari" },
    { ur: "محفل سجاؤ، چائے پلاؤ", ro: "Mehfil sajao, chai pilao" }
  ];

  var CHAI = {
    doodh:    { name: "Doodh Patti", color: "#b87333", desc: "Thick, creamy, boiled-with-love milk tea. The default setting of every good conversation.", pair: "Technology Week all-nighters" },
    kashmiri: { name: "Kashmiri Chai (Noon Chai)", color: "#e8a0b4", desc: "Pink, gently salty and finished with crushed pistachios. It looks like a festival in a cup.", pair: "the Cultural Festival" },
    kahwa:    { name: "Kahwa", color: "#e3b94d", desc: "Green tea with saffron, cardamom and almonds. Light, golden and made for slow evenings.", pair: "Mushaira & Chai Night" },
    karak:    { name: "Karak Chai", color: "#7a3f1d", desc: "Strong, spiced and unapologetic. Built for deadlines and sports-day comebacks.", pair: "the Sports Championship and Career Fair prep" }
  };

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function $(id) { return document.getElementById(id); }
  function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
  function store(key, val) { try { if (val === undefined) return localStorage.getItem(key); localStorage.setItem(key, val); } catch (e) {} return null; }

  /* ---- horn (Web Audio, no files needed) ---- */
  var audioCtx = null;
  function honk() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      audioCtx = audioCtx || new AC();
      if (audioCtx.state === "suspended") audioCtx.resume();
      [[392, 0], [330, 0.24]].forEach(function (n) {
        var t0 = audioCtx.currentTime + n[1];
        var osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
        osc.type = "square"; osc.frequency.value = n[0];
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.1, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.21);
        osc.connect(gain); gain.connect(audioCtx.destination);
        osc.start(t0); osc.stop(t0 + 0.23);
      });
    } catch (e) {}
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.documentElement.classList.add("js");

    /* ---- scroll reveal ---- */
    var revealEls = document.querySelectorAll(".feature-card,.event-card,.society-card,.section-heading,.truck-figure,.plaque,.chai-info,.shayari-card,.proposal-form,.resource-panel,.contact-detail");
    if ("IntersectionObserver" in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      revealEls.forEach(function (el) { el.classList.add("reveal"); io.observe(el); });
    }

    /* ---- slogan ticker ---- */
    var track = $("tickerTrack");
    if (track) {
      var html = "";
      for (var rep = 0; rep < 2; rep++) {
        SLOGANS.concat([{ ur: "آؤ مل بیٹھیں", ro: "Aao mil baithein" }]).forEach(function (s) {
          var span = document.createElement("span");
          var b = document.createElement("b"); b.lang = "ur"; b.dir = "rtl"; b.textContent = s.ur;
          var t = document.createTextNode(s.ro);
          var i = document.createElement("i"); i.textContent = "✿"; i.setAttribute("aria-hidden", "true");
          span.appendChild(b); span.appendChild(t); span.appendChild(i);
          if (rep === 1) span.setAttribute("aria-hidden", "true");
          track.appendChild(span);
        });
      }
    }

    /* ---- rickshaw horn ---- */
    var rick = $("rickshaw"), bubble = $("rickshawBubble"), bubbleTimer;
    if (rick && bubble) {
      rick.addEventListener("click", function () {
        honk();
        var s = pick(SLOGANS);
        bubble.textContent = "";
        bubble.appendChild(document.createTextNode(s.ur));
        var small = document.createElement("small"); small.textContent = s.ro; bubble.appendChild(small);
        bubble.classList.add("show");
        rick.classList.remove("honk"); void rick.offsetWidth; rick.classList.add("honk");
        clearTimeout(bubbleTimer);
        bubbleTimer = setTimeout(function () { bubble.classList.remove("show"); }, 2600);
      });
    }

    /* ---- shayari carousel ---- */
    var card = $("shayariCard");
    if (card) {
      var idx = 0, auto = null, hovering = false;
      var elUr = $("shUrdu"), elRo = $("shRoman"), elEn = $("shEnglish"), elBody = $("shBody"), elCount = $("shCount"), dotsBox = $("shDots");
      var btnMeaning = $("shMeaning");
      SHAYARI.forEach(function () { dotsBox.appendChild(document.createElement("span")); });

      function fill(el, lines) {
        el.textContent = "";
        lines.forEach(function (ln, i) { if (i) el.appendChild(document.createElement("br")); el.appendChild(document.createTextNode(ln)); });
      }
      function render(i, animate) {
        idx = (i + SHAYARI.length) % SHAYARI.length;
        function apply() {
          var s = SHAYARI[idx];
          fill(elUr, s.ur); fill(elRo, s.ro); elEn.textContent = s.en;
          elCount.textContent = (idx + 1) + " / " + SHAYARI.length;
          Array.prototype.forEach.call(dotsBox.children, function (d, k) { d.classList.toggle("on", k === idx); });
          elBody.classList.remove("swap");
        }
        if (animate && !reduceMotion) { elBody.classList.add("swap"); setTimeout(apply, 260); } else { apply(); }
      }
      function restart() {
        clearInterval(auto);
        if (!reduceMotion) auto = setInterval(function () { if (!hovering) render(idx + 1, true); }, 11000);
      }
      $("shNext").addEventListener("click", function () { render(idx + 1, true); restart(); });
      $("shPrev").addEventListener("click", function () { render(idx - 1, true); restart(); });
      $("shShuffle").addEventListener("click", function () {
        var n; do { n = Math.floor(Math.random() * SHAYARI.length); } while (n === idx && SHAYARI.length > 1);
        render(n, true); restart();
      });
      btnMeaning.addEventListener("click", function () {
        var open = elEn.hidden;
        elEn.hidden = !open;
        btnMeaning.textContent = open ? "Hide meaning" : "Show meaning";
        btnMeaning.setAttribute("aria-expanded", String(open));
      });
      $("shCopy").addEventListener("click", function () {
        var s = SHAYARI[idx], btn = $("shCopy");
        var text = s.ur.join("\n") + "\n\n" + s.ro.join("\n") + "\n\n- Gatherly";
        function done(ok) { btn.textContent = ok ? "Copied ✓" : "Copy not available"; setTimeout(function () { btn.textContent = "Copy couplet"; }, 1800); }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        else done(false);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") { render(idx + 1, true); restart(); }
        if (e.key === "ArrowLeft") { render(idx - 1, true); restart(); }
      });
      card.addEventListener("mouseenter", function () { hovering = true; });
      card.addEventListener("mouseleave", function () { hovering = false; });
      card.addEventListener("focusin", function () { hovering = true; });
      card.addEventListener("focusout", function () { hovering = false; });
      render(0, false); restart();
    }

    /* ---- truck-art plaque studio ---- */
    var plaque = $("plaque");
    if (plaque) {
      var nameIn = $("plaqueName"), sloganSel = $("plaqueSlogan"), nameOut = $("plaqueText"), topOut = $("plaqueTop");
      SLOGANS.forEach(function (s, i) {
        var o = document.createElement("option"); o.value = i; o.textContent = s.ro; sloganSel.appendChild(o);
      });
      sloganSel.value = String(SLOGANS.length - 1);
      function paint() {
        var n = nameIn.value.trim();
        nameOut.textContent = n ? n : "GATHERLY";
        topOut.textContent = SLOGANS[+sloganSel.value].ur;
        plaque.classList.remove("pop"); void plaque.offsetWidth; plaque.classList.add("pop");
      }
      nameIn.addEventListener("input", paint);
      sloganSel.addEventListener("change", paint);
      document.querySelectorAll(".swatch").forEach(function (sw) {
        sw.addEventListener("click", function () {
          document.querySelectorAll(".swatch").forEach(function (o) { o.classList.toggle("active", o === sw); o.setAttribute("aria-pressed", String(o === sw)); });
          plaque.className = "plaque theme-" + sw.dataset.theme;
          void plaque.offsetWidth; plaque.classList.add("pop");
        });
      });
      $("plaqueHonk").addEventListener("click", function () { honk(); plaque.classList.remove("pop"); void plaque.offsetWidth; plaque.classList.add("pop"); });
    }

    /* ---- chai break ---- */
    var cup = $("chaiCup");
    if (cup) {
      var type = "doodh", fillLvl = 1, count = parseInt(store("gatherlyChai") || "0", 10) || 0;
      var msg = $("chaiMsg"), sipBtn = $("chaiSip");
      $("chaiCount").textContent = count;
      function setFill(v) {
        fillLvl = Math.max(0, Math.min(1, v));
        cup.style.setProperty("--fill", fillLvl);
        sipBtn.disabled = fillLvl === 0;
      }
      function setType(t) {
        type = t; var c = CHAI[t];
        cup.dataset.type = t; cup.style.setProperty("--chai", c.color);
        $("chaiName").textContent = c.name; $("chaiDesc").textContent = c.desc; $("chaiPair").textContent = c.pair;
        document.querySelectorAll(".chai-chip").forEach(function (b) { var on = b.dataset.chai === t; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
      }
      document.querySelectorAll(".chai-chip").forEach(function (b) {
        b.addEventListener("click", function () {
          setType(b.dataset.chai); msg.textContent = "";
          setFill(0); setTimeout(function () { setFill(1); }, 60);
        });
      });
      $("chaiPour").addEventListener("click", function () {
        if (fillLvl > 0.99) { msg.textContent = "Cup already full. Sip first!"; return; }
        count++; $("chaiCount").textContent = count; store("gatherlyChai", String(count));
        setFill(1); msg.textContent = "Wah! Garam garam chai.";
      });
      sipBtn.addEventListener("click", function () {
        setFill(fillLvl - 0.34);
        cup.classList.remove("sipping"); void cup.getBoundingClientRect(); cup.classList.add("sipping");
        msg.textContent = fillLvl === 0 ? "Khatam! Pour another cup?" : pick(["Slurrp. Perfect.", "Mazaa aa gaya!", "Ek aur ghoont…"]);
      });
      setType("doodh"); setFill(1);
    }

    /* ---- floating chai button: a couplet on any page ---- */
    var fab = document.createElement("button");
    fab.type = "button"; fab.className = "chai-fab"; fab.setAttribute("aria-label", "Show a random shayari");
    fab.innerHTML = '<svg viewBox="0 0 40 40" aria-hidden="true"><path d="M7 15h22q0 14-11 16Q7 29 7 15z" fill="#fff4dc" stroke="#641c35" stroke-width="2"/><path d="M29 18q8-1 6 6t-9 5" fill="none" stroke="#641c35" stroke-width="2.4"/><path d="M7 15h22q0 3-1 6H8q-1-3-1-6z" fill="#d7263d"/><path d="M14 11q-3-3 0-6M21 11q-3-3 0-6" fill="none" stroke="#641c35" stroke-width="2" stroke-linecap="round"/></svg>';
    var toast = document.createElement("div");
    toast.className = "shayari-toast"; toast.setAttribute("role", "status");
    var tUr = document.createElement("p"); tUr.className = "t-ur"; tUr.lang = "ur"; tUr.dir = "rtl";
    var tEn = document.createElement("p"); tEn.className = "t-en";
    var tClose = document.createElement("button"); tClose.type = "button"; tClose.setAttribute("aria-label", "Close"); tClose.textContent = "×";
    toast.appendChild(tClose); toast.appendChild(tUr); toast.appendChild(tEn);
    document.body.appendChild(toast); document.body.appendChild(fab);
    var toastTimer;
    function hideToast() { toast.classList.remove("show"); }
    fab.addEventListener("click", function () {
      var s = pick(SHAYARI);
      tUr.textContent = ""; s.ur.forEach(function (ln, i) { if (i) tUr.appendChild(document.createElement("br")); tUr.appendChild(document.createTextNode(ln)); });
      tEn.textContent = s.en;
      toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(hideToast, 12000);
    });
    tClose.addEventListener("click", hideToast);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") hideToast(); });
  });
})();
