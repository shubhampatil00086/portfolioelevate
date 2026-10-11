/* =====================================================
   ELEVATE MEDIA | script.js
   ===================================================== */

// ===============================
// EASY PORTFOLIO EDITING
// ===============================
/*
  You only ever need to edit THIS top part of the file (down to the
  line that says "WEBSITE LOGIC"). You never need to touch the HTML.

  HOW TO ADD A NEW PROJECT
  ------------------------
  1. Save your image inside the  portfolio/  folder
     (WebP is best, e.g.  portfolio/poster-31.webp).
  2. Scroll to "PORTFOLIO PROJECTS" below.
  3. Copy one project block { ... }, paste it into the list and change it:

       {
           id: 31,
           title: "New Poster",
           category: "Posters",
           image: "portfolio/poster-31.webp",
           description: "Description of the project."
       },

     Keep the comma after the closing brace.
     TIP: put new projects at the TOP of the list to show them first.

  HOW TO CHANGE A PROJECT
  -----------------------
  - Title        -> edit  title: "..."
  - Category     -> edit  category: "..."  (use one of the CATEGORIES below)
  - Description  -> edit  description: "..."
  - Image        -> edit  image: "portfolio/your-file.webp"

  HOW TO REMOVE A PROJECT
  -----------------------
  Delete its whole { ... }, block (or put // in front of each line).

  SHOW A PROJECT ON THE HOME PAGE
  -------------------------------
  Add  featured: true,  inside the project. The home page shows
  SITE.featuredCount projects. Featured ones come first; if there are
  fewer than 6, the rest are filled from the top of the list.

  OTHER THINGS YOU CAN CHANGE
  ---------------------------
  WhatsApp number, Instagram username, brand name, tagline and
  location are all in the SITE settings just below.
  (The page <title> and meta description live in the HTML <head>.)
*/

// ===============================
// SITE SETTINGS
// ===============================
const SITE = {
  brandName: "ELEVATE MEDIA",
  tagline: "BUILD YOUR BRAND",
  location: "Pune, Maharashtra, India",

  // WhatsApp number: country code + number, digits only (no + or spaces)
  whatsappNumber: "918669241982",
  // How the number is displayed on the page
  whatsappDisplay: "+91 86692 41982",

  // Instagram username, without the @
  instagramUser: "elevatemediadesign",

  // How many projects appear in "Featured Work" on the home page
  featuredCount: 6
};

// ===============================
// PORTFOLIO CATEGORIES
// ===============================
// These become the filter buttons on portfolio.html (in this order).
// A project's  category  must match one of these exactly.
// A category not listed here is added automatically as an extra filter.
const CATEGORIES = [
  "Posters",
  "Sports / Events",
  "Branding",
  "Social Media",
  "Sponsorship",
  "Logos",
  "Video",
  "Other"
];

// ===============================
// PORTFOLIO PROJECTS
// ===============================
// The 12 entries below are SAMPLES. Replace them with your own work.
// Images that do not exist yet show a neutral placeholder instead of breaking the page.
const projects = [

  {
    id: 1,
    title: "Event Announcement Poster",
    category: "Posters",
    image: "portfolio/poster-01.webp",
    description: "Event announcement poster with clear hierarchy and bold typography.",
    featured: true
  },
  {
    id: 2,
    title: "Brand Promotion Poster",
    category: "Posters",
    image: "portfolio/poster-02.webp",
    description: "Promotional poster designed to communicate a brand message at a glance."
  },
  {
    id: 3,
    title: "Festival Greeting Poster",
    category: "Posters",
    image: "portfolio/poster-03.webp",
    description: "Festive greeting creative for social media and print."
  },
  {
    id: 4,
    title: "Campaign Poster Concept",
    category: "Posters",
    image: "portfolio/poster-04.webp",
    description: "Concept poster created for a promotional campaign."
  },
  {
    id: 5,
    title: "Sports Tournament Poster",
    category: "Sports / Events",
    image: "portfolio/poster-05.webp",
    description: "Tournament promotional poster design.",
    featured: true
  },
  {
    id: 6,
    title: "Match Day Creative",
    category: "Sports / Events",
    image: "portfolio/poster-06.webp",
    description: "Match day announcement creative for digital and print use."
  },
  {
    id: 7,
    title: "Brand Identity Concept",
    category: "Branding",
    image: "portfolio/poster-07.webp",
    description: "Visual identity concept covering logo, colour and typography.",
    featured: true
  },
  {
    id: 8,
    title: "Social Media Post Series",
    category: "Social Media",
    image: "portfolio/poster-08.webp",
    description: "A consistent series of social media creatives.",
    featured: true
  },
  {
    id: 9,
    title: "Sponsor Thank-You Creative",
    category: "Sponsorship",
    image: "portfolio/poster-09.webp",
    description: "Sponsorship creative recognising event partners.",
    featured: true
  },
  {
    id: 10,
    title: "Logo Design Concept",
    category: "Logos",
    image: "portfolio/poster-10.webp",
    description: "Simple, memorable logo concept for a new brand.",
    featured: true
  },
  {
    id: 11,
    title: "Promo Video Thumbnail",
    category: "Video",
    image: "portfolio/poster-11.webp",
    description: "Thumbnail and cover design for a promotional video edit."
  },
  {
    id: 12,
    title: "Custom Graphic Design",
    category: "Other",
    image: "portfolio/poster-12.webp",
    description: "Custom graphic design created to a specific brief."
  }

  // ADD NEW PROJECTS ABOVE THIS LINE (remember the comma after the previous one)

];

// =====================================================
// WEBSITE LOGIC  (you do not need to edit anything below)
// =====================================================
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---------- Helpers ---------- */
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  const clean = (v) => (typeof v === "string" ? v.trim() : "");
  const norm = (v) => clean(v).toLowerCase();
  const reduceMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const SVG_NS = "http://www.w3.org/2000/svg";

  function h(tag, props, children) {
    const node = document.createElement(tag);
    Object.keys(props || {}).forEach((key) => {
      const val = props[key];
      if (val === null || val === undefined || val === false) return;
      if (key === "class") node.className = val;
      else if (key === "text") node.textContent = val;
      else node.setAttribute(key, val === true ? "" : String(val));
    });
    (children || []).forEach((c) => { if (c) node.appendChild(c); });
    return node;
  }

  function icon(id, extraClass) {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "icon" + (extraClass ? " " + extraClass : ""));
    svg.setAttribute("aria-hidden", "true");
    const use = document.createElementNS(SVG_NS, "use");
    use.setAttribute("href", "#" + id);
    svg.appendChild(use);
    return svg;
  }

  /* ---------- Project data ---------- */
  function getProjects() {
    const list = Array.isArray(projects) ? projects : [];
    return list
      .filter((p) => p && typeof p === "object" && clean(p.image))
      .map((p, i) => ({
        id: p.id !== undefined && p.id !== null ? p.id : i + 1,
        title: clean(p.title) || "Untitled project",
        category: clean(p.category) || "Other",
        image: clean(p.image),
        description: clean(p.description),
        featured: p.featured === true
      }));
  }
  const ALL_PROJECTS = getProjects();

  /* ---------- Site settings -> page ---------- */
  function applySiteSettings() {
    const waUrl = "https://wa.me/" + SITE.whatsappNumber;
    $$("[data-wa-link]").forEach((a) => a.setAttribute("href", waUrl));
    $$("[data-wa-text]").forEach((n) => { n.textContent = SITE.whatsappDisplay; });
    $$("[data-ig-link]").forEach((a) => a.setAttribute("href", "https://instagram.com/" + SITE.instagramUser));
    $$("[data-ig-text]").forEach((n) => { n.textContent = "@" + SITE.instagramUser; });
    $$("[data-brand]").forEach((n) => { n.textContent = SITE.brandName; });
    $$("[data-tagline]").forEach((n) => { n.textContent = SITE.tagline; });
    $$("[data-location]").forEach((n) => { n.textContent = SITE.location; });
  }

  /* ---------- Missing image handling ---------- */
  const reportedImages = {};
  function markBroken(img) {
    if (!img) return;
    if (img.classList.contains("brand__logo")) { img.hidden = true; return; }
    const holder = img.closest(".media");
    if (holder) holder.classList.add("is-missing");
    const src = img.getAttribute("src");
    if (src && !reportedImages[src]) {
      reportedImages[src] = true;
      console.warn("[Elevate Media] Image not found: " + src);
    }
  }
  function initImageFallbacks() {
    document.addEventListener("error", (e) => {
      if (e.target && e.target.tagName === "IMG") markBroken(e.target);
    }, true);
    $$("img").forEach((img) => {
      if (img.getAttribute("src") && img.complete && img.naturalWidth === 0) markBroken(img);
    });
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    const pre = $("#preloader");
    let finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      document.body.classList.add("is-ready");
      if (pre) {
        pre.classList.add("is-hidden");
        setTimeout(() => { pre.style.display = "none"; }, 700);
      }
    }
    function go() { setTimeout(finish, 250); }
    if (!pre) { finish(); return; }
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go);
    setTimeout(finish, 3000); // never block the page
  }

  /* ---------- Sticky header + scroll-to-top ---------- */
  function initScrollEffects() {
    const header = $("#header");
    const topBtn = $("#scrollTop");
    let ticking = false;

    function update() {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (header) header.classList.toggle("is-scrolled", y > 12);
      if (topBtn) topBtn.classList.toggle("is-visible", y > 600);
      ticking = false;
    }
    window.addEventListener("scroll", () => {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();

    if (topBtn) {
      topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
      });
    }
  }

  /* ---------- Mobile navigation ---------- */
  function initMobileNav() {
    const toggle = $("#navToggle");
    const nav = $("#primaryNav");
    if (!toggle || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("nav-open", open);
    }
    const isOpen = () => nav.classList.contains("is-open");

    toggle.addEventListener("click", () => setOpen(!isOpen()));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("click", (e) => {
      if (isOpen() && !nav.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) { setOpen(false); toggle.focus(); }
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 992 && isOpen()) setOpen(false); });
  }

  /* ---------- Active navigation ---------- */
  function initActiveNav() {
    const links = $$(".nav__link[data-nav]");
    if (!links.length) return;
    const page = document.body.getAttribute("data-page");

    function setActive(key, current) {
      links.forEach((link) => {
        const on = link.getAttribute("data-nav") === key;
        link.classList.toggle("is-active", on);
        if (on) link.setAttribute("aria-current", current);
        else link.removeAttribute("aria-current");
      });
    }

    if (page === "portfolio") { setActive("portfolio", "page"); return; }

    setActive("home", "location");
    const sections = $$("main section[id]");
    if (!("IntersectionObserver" in window) || !sections.length) return;
    const map = { work: "portfolio", why: "process" };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(map[entry.target.id] || entry.target.id, "location");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Smooth scrolling (same-page links) ---------- */
  function initSmoothScroll() {
    document.addEventListener("click", (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute("href");
      if (!hash || hash.length < 2) return;
      let target = null;
      try { target = document.querySelector(hash); } catch (err) { return; }
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (window.history && history.pushState) history.pushState(null, "", hash);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  }

  /* ---------- Scroll reveal ---------- */
  function initReveal() {
    const items = $$(".reveal");
    if (!items.length) return;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach((i) => i.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    items.forEach((i) => io.observe(i));
  }

  /* ---------- Toast ---------- */
  let toastTimer = null;
  function hideToast() {
    const toast = $("#toast");
    if (toast) toast.classList.remove("is-visible");
  }
  function showToast(message, type) {
    const toast = $("#toast");
    const text = $("#toastMessage");
    if (!toast || !text) return;
    text.textContent = message;
    toast.classList.toggle("toast--error", type === "error");
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, 7000);
  }
  function initToast() {
    const close = $("#toastClose");
    if (close) close.addEventListener("click", hideToast);
  }

  /* ---------- Portfolio cards ---------- */
  function createCard(project, index) {
    const img = h("img", {
      src: project.image,
      alt: project.title + " - " + project.category + " by " + SITE.brandName,
      loading: "lazy",
      decoding: "async",
      width: 800,
      height: 1000
    });
    const media = h("div", { class: "card__media media" }, [img]);
    const button = h("button", {
      type: "button",
      class: "card__btn",
      "data-index": index,
      "aria-label": "View project: " + project.title
    }, [h("span", { text: "View project" }), icon("i-arrow")]);
    const body = h("div", { class: "card__body" }, [
      h("p", { class: "card__cat", text: project.category }),
      h("h3", { class: "card__title", text: project.title }),
      button
    ]);
    const card = h("article", { class: "card" }, [media, body]);
    card.style.setProperty("--i", String(Math.min(index, 10)));
    return card;
  }

  function renderGrid(grid, list) {
    grid.textContent = "";
    const frag = document.createDocumentFragment();
    list.forEach((p, i) => frag.appendChild(createCard(p, i)));
    grid.appendChild(frag);
  }

  /* ---------- Featured projects (home page) ---------- */
  function initFeatured() {
    const grid = $("#featuredGrid");
    if (!grid) return;
    const empty = $("#featuredEmpty");
    const max = Math.max(1, Number(SITE.featuredCount) || 6);

    const flagged = ALL_PROJECTS.filter((p) => p.featured);
    const rest = ALL_PROJECTS.filter((p) => !p.featured);
    const list = flagged.concat(rest).slice(0, max);

    if (!list.length) { if (empty) empty.hidden = false; return; }
    renderGrid(grid, list);

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".card__btn");
      if (!btn) return;
      openLightbox(list, parseInt(btn.getAttribute("data-index"), 10) || 0, btn);
    });
  }

  /* ---------- Portfolio page: filters + grid ---------- */
  function initPortfolio() {
    const grid = $("#portfolioGrid");
    if (!grid) return;
    const bar = $("#portfolioFilters");
    const count = $("#portfolioCount");
    const empty = $("#portfolioEmpty");
    let visible = ALL_PROJECTS.slice();

    // Filter buttons: configured categories + any extra categories used by projects
    const labels = ["All"].concat(CATEGORIES);
    ALL_PROJECTS.forEach((p) => {
      if (!labels.some((l) => norm(l) === norm(p.category))) labels.push(p.category);
    });

    function setActive(label) {
      $$(".filter", bar).forEach((b) => {
        b.setAttribute("aria-pressed", String(b.getAttribute("data-filter") === label));
      });
    }

    function apply(label) {
      visible = label === "All"
        ? ALL_PROJECTS.slice()
        : ALL_PROJECTS.filter((p) => norm(p.category) === norm(label));
      renderGrid(grid, visible);
      setActive(label);
      if (empty) empty.hidden = visible.length > 0;
      if (count) {
        count.textContent = visible.length
          ? "Showing " + visible.length + (visible.length === 1 ? " project" : " projects")
          : "";
      }
    }

    if (bar) {
      labels.forEach((label) => {
        bar.appendChild(h("button", {
          type: "button",
          class: "filter",
          "data-filter": label,
          "aria-pressed": "false",
          text: label
        }));
      });
      bar.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter");
        if (btn) apply(btn.getAttribute("data-filter"));
      });
    }

    grid.addEventListener("click", (e) => {
      const btn = e.target.closest(".card__btn");
      if (!btn) return;
      openLightbox(visible, parseInt(btn.getAttribute("data-index"), 10) || 0, btn);
    });

    apply("All");
  }

  /* ---------- Lightbox / project viewer ---------- */
  const lb = { root: null, list: [], index: 0, trigger: null, timer: null, startX: 0 };

  function lightboxIsOpen() { return !!(lb.root && lb.root.classList.contains("is-open")); }

  function renderLightbox() {
    const p = lb.list[lb.index];
    if (!p) return;
    const media = $("#lbMedia");
    const img = $("#lbImage");
    if (media) media.classList.remove("is-missing");
    if (img) {
      img.alt = p.title + " - " + p.category + " by " + SITE.brandName;
      img.src = p.image;
    }
    $("#lbCategory").textContent = p.category;
    $("#lightboxTitle").textContent = p.title;
    $("#lbDescription").textContent = p.description;
    $("#lbCounter").textContent = (lb.index + 1) + " / " + lb.list.length;

    const enquire = $("#lbEnquire");
    if (enquire) {
      const text = "Hi " + SITE.brandName + ", I'm interested in a design like \"" + p.title + "\".";
      enquire.href = "https://wa.me/" + SITE.whatsappNumber + "?text=" + encodeURIComponent(text);
    }

    const single = lb.list.length < 2;
    $("#lbPrev").hidden = single;
    $("#lbNext").hidden = single;

    // Preload neighbours for instant navigation
    if (!single) {
      [1, -1].forEach((step) => {
        const n = lb.list[(lb.index + step + lb.list.length) % lb.list.length];
        if (n) { const pre = new Image(); pre.src = n.image; }
      });
    }
  }

  function stepLightbox(step) {
    if (lb.list.length < 2) return;
    lb.index = (lb.index + step + lb.list.length) % lb.list.length;
    renderLightbox();
  }

  function openLightbox(list, index, trigger) {
    if (!lb.root || !list || !list.length) return;
    clearTimeout(lb.timer);
    lb.list = list;
    lb.index = Math.min(Math.max(index, 0), list.length - 1);
    lb.trigger = trigger || null;
    renderLightbox();
    lb.root.hidden = false;
    document.body.classList.add("lb-open");
    window.requestAnimationFrame(() => {
      lb.root.classList.add("is-open");
      const close = $("#lbClose");
      if (close) close.focus({ preventScroll: true });
    });
  }

  function closeLightbox() {
    if (!lb.root || !lightboxIsOpen()) return;
    lb.root.classList.remove("is-open");
    document.body.classList.remove("lb-open");
    clearTimeout(lb.timer);
    lb.timer = setTimeout(() => { lb.root.hidden = true; }, 320);
    if (lb.trigger && document.contains(lb.trigger)) lb.trigger.focus({ preventScroll: true });
  }

  function initLightbox() {
    lb.root = $("#lightbox");
    if (!lb.root) return;

    const close = $("#lbClose");
    const prev = $("#lbPrev");
    const next = $("#lbNext");
    if (close) close.addEventListener("click", closeLightbox);
    if (prev) prev.addEventListener("click", () => stepLightbox(-1));
    if (next) next.addEventListener("click", () => stepLightbox(1));

    // Click outside the panel closes the viewer
    lb.root.addEventListener("click", (e) => { if (e.target === lb.root) closeLightbox(); });

    // Close when the "Enquire" link is used
    const enquire = $("#lbEnquire");
    if (enquire) enquire.addEventListener("click", () => setTimeout(closeLightbox, 50));

    document.addEventListener("keydown", (e) => {
      if (!lightboxIsOpen()) return;
      if (e.key === "Escape") { e.preventDefault(); closeLightbox(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); stepLightbox(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); stepLightbox(1); }
      else if (e.key === "Tab") {
        const focusable = [close, prev, next, enquire].filter((el) => el && !el.hidden);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (focusable.indexOf(document.activeElement) === -1) { e.preventDefault(); first.focus(); }
      }
    });

    // Touch swipe
    lb.root.addEventListener("touchstart", (e) => {
      if (e.changedTouches && e.changedTouches[0]) lb.startX = e.changedTouches[0].clientX;
    }, { passive: true });
    lb.root.addEventListener("touchend", (e) => {
      if (!e.changedTouches || !e.changedTouches[0]) return;
      const dx = e.changedTouches[0].clientX - lb.startX;
      if (Math.abs(dx) > 60) stepLightbox(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- Contact form -> WhatsApp ---------- */
  function initContactForm() {
    const form = $("#inquiryForm");
    if (!form) return;
    const field = (id) => form.querySelector("#" + id);

    const deadline = field("f-deadline");
    if (deadline) {
      const d = new Date();
      const pad = (n) => (n < 10 ? "0" + n : String(n));
      deadline.min = d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
    }

    const rules = {
      name: {
        input: field("f-name"), error: field("e-name"),
        check: (v) => (!v ? "Please enter your name." : v.length < 2 ? "Name must be at least 2 characters." : "")
      },
      phone: {
        input: field("f-phone"), error: field("e-phone"),
        check: (v) => {
          if (!v) return "Please enter your WhatsApp number.";
          const digits = v.replace(/\D/g, "");
          if (!/^[+\d\s\-()]+$/.test(v) || digits.length < 10 || digits.length > 15) {
            return "Enter a valid WhatsApp number (10 to 15 digits).";
          }
          return "";
        }
      },
      email: {
        input: field("f-email"), error: field("e-email"),
        check: (v) => (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "Enter a valid email address." : "")
      },
      service: {
        input: field("f-service"), error: field("e-service"),
        check: (v) => (!v ? "Please select a service." : "")
      },
      details: {
        input: field("f-details"), error: field("e-details"),
        check: (v) => (!v ? "Please describe your project." : v.length < 10 ? "Add a little more detail (at least 10 characters)." : "")
      }
    };

    function setError(rule, message) {
      if (!rule.input) return;
      if (rule.error) rule.error.textContent = message;
      rule.input.setAttribute("aria-invalid", message ? "true" : "false");
    }
    function value(id) { const el = field(id); return el ? clean(el.value) : ""; }

    Object.keys(rules).forEach((key) => {
      const rule = rules[key];
      if (!rule.input) return;
      const handler = () => {
        if (rule.input.getAttribute("aria-invalid") === "true") setError(rule, rule.check(clean(rule.input.value)));
      };
      rule.input.addEventListener("input", handler);
      rule.input.addEventListener("change", handler);
    });

    function formatDeadline(v) {
      const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
      if (!m) return v || "Not specified";
      const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
      return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
    }

    function buildMessage() {
      return [
        "📩 NEW PROJECT INQUIRY",
        "",
        "👤 Name: " + value("f-name"),
        "🏢 Business: " + (value("f-business") || "Not provided"),
        "📱 WhatsApp: " + value("f-phone"),
        "📧 Email: " + (value("f-email") || "Not provided"),
        "",
        "🎨 Service: " + value("f-service"),
        "📅 Deadline: " + formatDeadline(value("f-deadline")),
        "💰 Budget: " + (value("f-budget") || "Not decided"),
        "",
        "📝 Project Details:",
        value("f-details")
      ].join("\n");
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let firstInvalid = null;
      Object.keys(rules).forEach((key) => {
        const rule = rules[key];
        if (!rule.input) return;
        const message = rule.check(clean(rule.input.value));
        setError(rule, message);
        if (message && !firstInvalid) firstInvalid = rule.input;
      });
      if (firstInvalid) {
        firstInvalid.focus();
        showToast("Please fix the highlighted fields and try again.", "error");
        return;
      }

      const url = "https://wa.me/" + SITE.whatsappNumber + "?text=" + encodeURIComponent(buildMessage());
      const win = window.open(url, "_blank");
      if (win) { try { win.opener = null; } catch (err) { /* ignore */ } }
      else { window.location.href = url; }

      form.reset();
      Object.keys(rules).forEach((key) => setError(rules[key], ""));
      showToast("Your inquiry is ready in WhatsApp. Please press Send to submit it.", "success");
    });
  }

  /* ---------- Init ---------- */
  function init() {
    applySiteSettings();
    initImageFallbacks();
    initPreloader();
    initScrollEffects();
    initMobileNav();
    initActiveNav();
    initSmoothScroll();
    initToast();
    initLightbox();
    initFeatured();
    initPortfolio();
    initContactForm();
    initReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
