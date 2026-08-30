import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as renderHead, e as renderComponent, f as renderSlot, g as createAstro, s as spreadAttributes, u as unescapeHTML } from '../chunks/astro/server_CMIL8SNg.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze$4 = Object.freeze;
var __defProp$4 = Object.defineProperty;
var __template$4 = (cooked, raw) => __freeze$4(__defProp$4(cooked, "raw", { value: __freeze$4(cooked.slice()) }));
var _a$4;
const $$ScrollBackground = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$4 || (_a$4 = __template$4(["", `<div class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#030305]" aria-hidden="true"> <!-- Canvas for orbital curved streaks --> <canvas id="space-star-canvas" class="w-full h-full object-cover pointer-events-none"></canvas> <!-- Dual-layer subtle vignette and frosted diffusion to keep UI legible --> <div class="absolute inset-0 pointer-events-none backdrop-blur-[1px]" style="background: radial-gradient(circle at 75% 25%, rgba(3,3,5,0.2) 0%, rgba(0,0,0,0.88) 85%);"></div> </div> <script>
  (function () {
    var canvas = document.getElementById('space-star-canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var width = (canvas.width = window.innerWidth);
    var height = (canvas.height = window.innerHeight);

    // Focal point for gyroscopic rotation (positioned slightly off-screen top-right)
    var originX = width * 0.85;
    var originY = -height * 0.15;

    window.addEventListener('resize', function () {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      originX = width * 0.80;
      originY = -height * 0.15;
      initStars();
    });

    var STAR_COUNT = Math.min(Math.floor((width * height) / 3600), 650);
    var stars = [];
    var starPalette = ['#ffffff', '#f2f0ea', '#dbeafe', '#fef08a', '#ff3d00'];

    function initStars() {
      stars = [];
      var maxRadius = Math.hypot(Math.max(originX, width - originX), Math.max(originY, height - originY)) * 1;

      for (var i = 0; i < STAR_COUNT; i++) {
        var isAccent = Math.random() > 0.90;

        // Dynamic exponential size distribution
        var sizeTier = Math.random();
        var baseSize;
        if (sizeTier > 0.95) {
          baseSize = Math.random() * 1.4 + 2; // Rare large stars
        } else if (sizeTier > 0.70) {
          baseSize = Math.random() * 0.8 + 2; // Medium stars
        } else {
          baseSize = Math.random() * 0.5 + 1; // Distant micro-dust
        }

        stars.push({
          radius: Math.pow(Math.random(), 0.85) * maxRadius + 30,
          angle: Math.random() * Math.PI * 2,
          baseSize: baseSize,
          color: isAccent ? '#ff3d00' : starPalette[Math.floor(Math.random() * (starPalette.length - 1))],
          baseAlpha: Math.random() * 0.45 + 0.25,
          speedMult: Math.random() * 0.6 + 0.7,
          
          // Twinkle state: inactive by default
          isTwinkling: false,
          twinkleProgress: 0,
          twinkleDuration: 1200,
        });
      }
    }

    initStars();

    // Twinkle Controller: maintains 2 to 10 actively twinkling stars at any given time
    var TARGET_ACTIVE_TWINKLES = Math.floor(Math.random() * 9) + 2; // 2 to 10
    var nextCountCheck = 0;

    function updateTwinkleQueue(timestamp) {
      if (timestamp > nextCountCheck) {
        TARGET_ACTIVE_TWINKLES = Math.floor(Math.random() * 9) + 2;
        nextCountCheck = timestamp + Math.random() * 2000 + 1500;
      }

      var currentActive = 0;
      for (var i = 0; i < stars.length; i++) {
        if (stars[i].isTwinkling) currentActive++;
      }

      // If we have fewer active twinkles than our target, ignite a random star
      if (currentActive < TARGET_ACTIVE_TWINKLES && stars.length > 0) {
        var candidate = stars[Math.floor(Math.random() * stars.length)];
        if (!candidate.isTwinkling) {
          candidate.isTwinkling = true;
          candidate.twinkleProgress = 0;
          candidate.twinkleDuration = Math.random() * 1200 + 800; // 0.8s to 2s flash
        }
      }
    }

    // Scroll tracking & angular inertia
    var root = document.documentElement;
    var lastScrollY = window.scrollY || root.scrollTop;
    var angularVelocity = 0;
    var targetAngularVelocity = 0;
    var ticking = false;

    function onScroll() {
      var currentY = window.scrollY || root.scrollTop;
      var delta = currentY - lastScrollY;
      lastScrollY = currentY;

      targetAngularVelocity = delta * 0.0035;

      if (!ticking) {
        requestAnimationFrame(function () {
          var docHeight = root.scrollHeight - window.innerHeight;
          var progress = docHeight > 0 ? currentY / docHeight : 0;
          root.style.setProperty('--scroll-y', currentY.toFixed(1));
          root.style.setProperty('--scroll-progress', progress.toFixed(4));
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    var lastTimestamp = 0;

    function render(timestamp) {
      if (!lastTimestamp) lastTimestamp = timestamp;
      var dt = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      angularVelocity += (targetAngularVelocity - angularVelocity) * 0.085;
      targetAngularVelocity *= 0.88;

      ctx.clearRect(0, 0, width, height);

      var sweepAngle = Math.max(-0.24, Math.min(0.24, angularVelocity * 2.2));
      var isMoving = Math.abs(sweepAngle) > 0.002 && !reduceMotion;

      if (!isMoving) {
        updateTwinkleQueue(timestamp);
      }

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];

        var currentAlpha = s.baseAlpha;
        var currentSize = s.baseSize;

        // Progress the active twinkle for this star
        if (s.isTwinkling && !isMoving) {
          s.twinkleProgress += dt / s.twinkleDuration;
          if (s.twinkleProgress >= 1) {
            s.isTwinkling = false;
            s.twinkleProgress = 0;
          } else {
            // Smooth bell-curve flash (0 -> 1 -> 0)
            var flare = Math.sin(s.twinkleProgress * Math.PI);
            currentAlpha = Math.min(1.0, s.baseAlpha + flare * 0.65);
            currentSize = s.baseSize * (1 + flare * 1.8);
          }
        }

        ctx.save();
        ctx.strokeStyle = s.color;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = isMoving ? s.baseAlpha : currentAlpha;
        ctx.lineWidth = currentSize;
        ctx.lineCap = 'round';

        // Bloom only pops on the active twinkling stars
        ctx.shadowBlur = isMoving ? 7 : (s.isTwinkling ? 8 : 1.5);
        ctx.shadowColor = s.color;

        if (isMoving) {
          var arcLength = sweepAngle * s.speedMult;

          ctx.beginPath();
          ctx.arc(
            originX,
            originY,
            s.radius,
            s.angle,
            s.angle + arcLength,
            arcLength < 0
          );
          ctx.stroke();

          s.angle += arcLength * 0.04;
        } else {
          var x = originX + Math.cos(s.angle) * s.radius;
          var y = originY + Math.sin(s.angle) * s.radius;

          ctx.beginPath();
          ctx.arc(x, y, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  })();
<\/script>`])), maybeRenderHead());
}, "/home/halo/brutalist-portfolio/src/components/ScrollBackground.astro", void 0);

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$Loader = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", `<div id="loader" class="loader fixed inset-0 z-[100] bg-ink text-paper flex flex-col justify-between" role="status" aria-live="polite" aria-label="Loading" data-astro-cid-4qws3apc> <div class="flex items-center justify-between px-5 md:px-8 pt-6" data-astro-cid-4qws3apc> <span class="stamp text-xs text-paper/60" data-astro-cid-4qws3apc>N&deg;&nbsp;001 / STUDIO</span> <span class="stamp text-xs text-paper/60" data-astro-cid-4qws3apc>LOADING</span> </div> <div class="px-5 md:px-8 pb-8" data-astro-cid-4qws3apc> <div class="flex items-end justify-between border-t border-paper/20 pt-4" data-astro-cid-4qws3apc> <span class="font-display uppercase leading-none text-[18vw] md:text-[9vw]" data-astro-cid-4qws3apc> <span id="loader-count" data-astro-cid-4qws3apc>00</span><span class="text-accent" data-astro-cid-4qws3apc>%</span> </span> <span class="stamp text-xs text-paper/60 mb-2 hidden sm:block" data-astro-cid-4qws3apc>
PREPARING ASSETS
</span> </div> <div class="mt-4 h-[3px] w-full bg-paper/15" data-astro-cid-4qws3apc> <div id="loader-bar" class="h-full bg-accent" style="width: 0%" data-astro-cid-4qws3apc></div> </div> </div> </div> <script>
  (function () {
    var loader = document.getElementById('loader');
    var countEl = document.getElementById('loader-count');
    var barEl = document.getElementById('loader-bar');
    if (!loader) return;

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var html = document.documentElement;
    var prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';

    function finish() {
      html.style.overflow = prevOverflow;
      loader.setAttribute('aria-hidden', 'true');
      loader.classList.add('loader--done');

      var cleanupDelay = reduceMotion ? 0 : 650;
      window.setTimeout(function () {
        loader.style.display = 'none';
        
        // Signal the rest of the application that the screen is revealed
        document.documentElement.classList.add('loader-complete');
        window.dispatchEvent(new CustomEvent('loader:finished'));
      }, cleanupDelay);
    }

    if (reduceMotion) {
      countEl.textContent = '100';
      barEl.style.width = '100%';
      if (document.readyState === 'complete') {
        finish();
      } else {
        window.addEventListener('load', finish, { once: true });
        window.setTimeout(finish, 4000);
      }
      return;
    }

    var start = performance.now();
    var minDuration = 1500;
    var maxWait = 4000;
    var loaded = false;
    var displayed = 0;

    window.addEventListener(
      'load',
      function () {
        loaded = true;
      },
      { once: true }
    );

    function tick(now) {
      var elapsed = now - start;

      var target = loaded
        ? 100
        : Math.min(92, (elapsed / minDuration) * 92);

      displayed += (target - displayed) * 0.25;
      var rounded = Math.round(displayed);

      countEl.textContent = String(Math.min(rounded, 99)).padStart(2, '0');
      barEl.style.width = Math.min(rounded, 100) + '%';

      var doneWaiting = elapsed >= minDuration && (loaded || elapsed >= maxWait);

      if (doneWaiting && rounded >= 98) {
        countEl.textContent = '100';
        barEl.style.width = '100%';
        window.setTimeout(finish, 150);
        return;
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  })();
<\/script> `])), maybeRenderHead());
}, "/home/halo/brutalist-portfolio/src/components/Loader.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$StarStreaks = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", `<div class="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-transparent"> <!-- Soft Frosted Glass & Blur layer to keep text readable --> <div class="absolute inset-0 backdrop-blur-[4px] pointer-events-none z-10"></div> <canvas id="star-streaks-canvas" class="w-full h-full object-cover pointer-events-none opacity-80"></canvas> </div> <script>
  (function () {
    const canvas = document.getElementById('star-streaks-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    });

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Star attributes
    const STAR_COUNT = Math.min(Math.floor((width * height) / 4500), 280);
    let stars = [];

    function initStars() {
      stars = [];
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.6,
          // Subtle warm ink and accent tints
          color: Math.random() > 0.85 ? '#ff3d00' : (Math.random() > 0.5 ? '#f2f0ea' : '#c9c6be'),
          alpha: Math.random() * 0.7 + 0.2,
          speedRatio: Math.random() * 0.6 + 0.4,
        });
      }
    }

    initStars();

    // Scroll Tracking & Inertia physics
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    let targetVelocity = 0;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      // Scroll speed directly influences streak stretch
      targetVelocity = delta * 1.35;
    }, { passive: true });

    function render() {
      // Ease velocity toward idle
      scrollVelocity += (targetVelocity - scrollVelocity) * 0.08;
      targetVelocity *= 0.88; // decay

      ctx.clearRect(0, 0, width, height);

      // Streaks stretch proportional to scroll velocity
      const streakLength = Math.max(-140, Math.min(140, scrollVelocity * 1.8));
      const isMoving = Math.abs(streakLength) > 0.8 && !reduceMotion;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        ctx.save();
        ctx.strokeStyle = star.color;
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.lineWidth = star.size;
        ctx.lineCap = 'round';

        // Blur stars softly in 2D context
        ctx.shadowBlur = Math.abs(streakLength) > 4 ? 8 : 4;
        ctx.shadowColor = star.color;

        if (isMoving) {
          // Render stretched streak line
          const len = streakLength * star.speedRatio;
          ctx.beginPath();
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x, star.y - len);
          ctx.stroke();

          // Drift coordinates softly
          star.y -= len * 0.03;
        } else {
          // Render idle static point
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // Wrap stars seamlessly across screen bounds
        if (star.y < 0) star.y = height + Math.random() * 20;
        if (star.y > height) star.y = -Math.random() * 20;
      }

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  })();
<\/script>`])), maybeRenderHead());
}, "/home/halo/brutalist-portfolio/src/components/StarStreaks.astro", void 0);

const $$Astro$1 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const {
    title = "STUDIO \u2014 [LLOYD ANGARA] \xB7 Portfolio",
    description = "Design & development portfolio."
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta name="description"${addAttribute(description, "content")}><title>${title}</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">${renderHead()}</head> <body class="relative bg-paper text-ink overflow-x-hidden min-h-screen"> <!-- Preloader overlay --> ${renderComponent($$result, "Loader", $$Loader, {})} <!-- Persistent background layers --> ${renderComponent($$result, "ScrollBackground", $$ScrollBackground, {})} ${renderComponent($$result, "StarStreaks", $$StarStreaks, {})} <!-- Main page content --> <div class="relative z-10"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "/home/halo/brutalist-portfolio/src/layouts/Layout.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro = createAstro();
const $$Dock = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Dock;
  const {
    magnification = 1.8,
    distance = 150,
    color = "rgba(20, 20, 20, 0.7)",
    blur = "20px",
    enhance = false,
    position = "bottom",
    size = "md",
    class: className = "",
    ...rest
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["astro-dock-container", className], "class:list")}${addAttribute(position, "data-position")} data-astro-cid-qy3g74cw> <nav class="astro-dock" data-astro-dock${addAttribute(enhance ? "true" : "false", "data-enhance")}${addAttribute(magnification, "data-magnification")}${addAttribute(distance, "data-distance")}${addAttribute(position, "data-position")}${addAttribute(size, "data-size")}${addAttribute(`--dock-color: ${color}; --dock-blur: ${blur};`, "style")} role="toolbar" aria-label="Application dock"${spreadAttributes(rest)} data-astro-cid-qy3g74cw> ${renderSlot($$result, $$slots["default"])} </nav> </div> ${enhance && renderTemplate(_a$1 || (_a$1 = __template$1([`<script>
    (function() {
      if (typeof window === "undefined") return;

      function canEnhance() {
        if (typeof window === "undefined") return false;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return false;
        }
        return true;
      }

      var initialized = new WeakMap();

      function enhanceDock(root) {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (!canEnhance()) return;
        if (initialized.has(root)) return;

        var items = Array.from(root.querySelectorAll(".dock-item"));
        var rippleTimers = new Map();

        var updateDock = function (mouseX) {
          var closestIndex = -1;
          var closestDistance = Infinity;

          items.forEach(function(item, index) {
            var rect = item.getBoundingClientRect();
            var centerX = rect.left + rect.width / 2;
            var distance = Math.abs(mouseX - centerX);

            if (distance < closestDistance) {
              closestDistance = distance;
              closestIndex = index;
            }
          });

          items.forEach(function(item) {
            item.style.setProperty("--dock-item-scale", "1");
            item.style.setProperty("--dock-label-scale", "1");
            item.style.setProperty("--dock-item-y", "0px");
            item.style.setProperty("--dock-item-margin", "4px");
            item.classList.remove("is-active");
          });

          if (closestIndex === -1) return;

          var transformations = [
            { idx: closestIndex - 2, scale: 1.05, translateY: 0, margin: 4 },
            { idx: closestIndex - 1, scale: 1.15, translateY: -4, margin: 6 },
            { idx: closestIndex, scale: 1.5, translateY: -15, margin: 8 },
            { idx: closestIndex + 1, scale: 1.15, translateY: -4, margin: 6 },
            { idx: closestIndex + 2, scale: 1.05, translateY: 0, margin: 4 },
          ];

          transformations.forEach(function (t) {
            var idx = t.idx;
            var scale = t.scale;
            var translateY = t.translateY;
            var margin = t.margin;
            if (items[idx]) {
              items[idx].style.setProperty("--dock-item-scale", String(scale));
              items[idx].style.setProperty(
                "--dock-label-scale",
                String(1 / scale),
              );
              
              var finalTranslateY = root.dataset.position === "top" ? -translateY : translateY;
              items[idx].style.setProperty("--dock-item-y", finalTranslateY + "px");
              items[idx].style.setProperty("--dock-item-margin", margin + "px");
            }
          });

          if (items[closestIndex]) {
            items[closestIndex].classList.add("is-active");
          }
        };

        var handleMouseMove = function (e) {
          updateDock(e.clientX);
        };

        var handleMouseLeave = function () {
          items.forEach(function(item) {
            item.style.setProperty("--dock-item-scale", "1");
            item.style.setProperty("--dock-label-scale", "1");
            item.style.setProperty("--dock-item-y", "0px");
            item.style.setProperty("--dock-item-margin", "4px");
            item.classList.remove("is-active");
          });
        };

        var handleClick = function (e) {
          var target = e.currentTarget;
          var ripple = document.createElement("span");
          ripple.className = "dock-ripple";

          var rect = target.getBoundingClientRect();
          var size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + "px";
          ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
          ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

          target.appendChild(ripple);

          var existing = rippleTimers.get(target);
          if (existing) clearTimeout(existing);

          var t = setTimeout(function() {
            ripple.remove();
            rippleTimers.delete(target);
          }, 500);
          rippleTimers.set(target, t);
        };

        items.forEach(function(item) {
          item.addEventListener("click", handleClick);
        });

        root.addEventListener("mousemove", handleMouseMove, { passive: true });
        root.addEventListener("mouseleave", handleMouseLeave);

        initialized.set(root, true);

        var observer = new MutationObserver(function() {
          if (!document.contains(root)) {
            root.removeEventListener("mousemove", handleMouseMove);
            root.removeEventListener("mouseleave", handleMouseLeave);
            items.forEach(function(item) {
              item.removeEventListener("click", handleClick);
            });
            rippleTimers.forEach(function(t) { clearTimeout(t); });
            rippleTimers.clear();
            observer.disconnect();
            initialized.delete(root);
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });
      }

      var init = function() {
        document.querySelectorAll('[data-astro-dock][data-enhance="true"]:not([data-ready])')
          .forEach(function(el) {
            if (el instanceof HTMLElement) {
              el.dataset.ready = "true";
              enhanceDock(el);
            }
          });
      };

      if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
      } else {
        init();
      }
    })();
  <\/script>`])))}`;
}, "/home/halo/brutalist-portfolio/node_modules/@astroanimate/core/dist/components/Dock/Dock.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const GITHUB_USERNAME = "flickr360";
  const CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear();
  let gitContributions = [];
  let totalContributions = 0;
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${CURRENT_YEAR}`);
    if (res.ok) {
      const data = await res.json();
      totalContributions = data.total?.[CURRENT_YEAR] || data.total?.lastYear || 0;
      gitContributions = data.contributions || [];
    }
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error);
  }
  if (gitContributions.length === 0) {
    gitContributions = Array.from({ length: 364 }, () => ({ level: 0, count: 0, date: "" }));
  }
  const fullYearDays = gitContributions.slice(-364);
  let rawRepos = [];
  try {
    const repoRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: {
          "User-Agent": "astro-portfolio-build",
          "Accept": "application/vnd.github.v3+json"
        }
      }
    );
    if (repoRes.ok) {
      rawRepos = await repoRes.json();
    }
  } catch (error) {
    console.error("Failed to fetch GitHub repos:", error);
  }
  const activeRepos = rawRepos.filter(
    (repo) => !repo.fork && !repo.archived
  );
  const unfinishedCount = activeRepos.length || 0;
  const latestUnfinishedProjects = activeRepos.slice(0, 3).map((repo) => ({
    name: repo.name.replace(/[-_]/g, " ").toUpperCase(),
    url: repo.html_url,
    status: repo.language ? repo.language.toUpperCase() : "DEV"
  }));
  const projects = [
    {
      num: "01",
      title: "FLOOD SKIP",
      year: "2026",
      tags: ["WEBAPP", "INTERACTION"],
      blurb: "A flood-aware navigation application built with Flutter, OpenStreetMap, OSRM, and a dedicated hazard backend."
    },
    {
      num: "02",
      title: "BARANGAYEGOVAPP",
      year: "2024",
      tags: ["WEBAPP", "DESIGN SYSTEM"],
      blurb: "A web application for barangay-level governance, simplifying the process of local government service delivery and citizen engagement."
    },
    {
      num: "03",
      title: "PERSIA OCR",
      year: "2024",
      tags: ["ART DIRECTION"],
      blurb: "An AI-driven application that identifies a persian character by computer vision."
    },
    {
      num: "04",
      title: "SHOPHEAR",
      year: "2023",
      tags: ["WEB", "INTERACTION"],
      blurb: "A web application that allows users to shop for products using voice commands, enhancing accessibility and convenience."
    }
  ];
  const capabilities = [
    "MYSQL",
    "PHP",
    "EXCEL",
    "DASHBOARD DESIGN",
    "FLUTTER",
    "GIT",
    "LARAVEL",
    "UI/UX",
    "WEB PERFORMANCE",
    "POWERBI"
  ];
  const glassCards = [
    {
      id: "coffee",
      title: "COFFEE CONSUMED",
      count: 1461,
      unit: "CUPS",
      subtitle: "Core Foundation",
      description: "A daily ritual of caffeine and code, fueling the creation of legible interfaces.",
      bg: "rgba(20, 24, 33, 0.90)",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-coffee"><path d="M10 2v2"/><path d="M14 2v2"/><path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"/><path d="M6 2v2"/></svg>'
    },
    {
      id: "design",
      title: "GIT COMMITS",
      subtitle: "Live Stream",
      bg: "rgba(20, 24, 33, 0.90)",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>'
    },
    {
      id: "wip",
      title: "ACTIVE REPOS",
      subtitle: "GitHub Synced",
      count: unfinishedCount,
      unit: "BUILDS",
      items: latestUnfinishedProjects,
      bg: "rgba(20, 24, 33, 0.90)",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 18l6-6-6-6"/><path d="M8 6l-6 6 6 6"/></svg>'
    },
    {
      id: "clicks",
      title: "GLOBAL CLICKS",
      subtitle: "Interactive",
      unit: "TAPS",
      description: "Persistent telemetry powered by edge serverless storage.",
      bg: "rgba(20, 24, 33, 0.90)",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 11-6 6v3h9l3-3"/><path d="m22 2-2.5 2.5a2.12 2.12 0 0 1-3 0l-.5-.5L14 6l2 2-2 2-2-2-1.5 1.5a2.12 2.12 0 0 1 0 3L13 15"/></svg>'
    }
  ];
  return renderTemplate(_a || (_a = __template(["", "  <script>\n  // Specular flashlight sweep on mousemove for glass cards\n  document.querySelectorAll('[data-glass-card]').forEach((card) => {\n    card.addEventListener('mousemove', (e) => {\n      const rect = card.getBoundingClientRect();\n      card.style.setProperty('--glass-card-mouse-x', `${e.clientX - rect.left}px`);\n      card.style.setProperty('--glass-card-mouse-y', `${e.clientY - rect.top}px`);\n    });\n  });\n\n  // Unified Stat Counter Animation (Coffee + Active Repos)\n  function triggerStatCounters() {\n    var counters = document.querySelectorAll('.stat-counter');\n    counters.forEach(function (counter) {\n      if (counter.getAttribute('data-started') === 'true') return;\n      counter.setAttribute('data-started', 'true');\n\n      var target = parseInt(counter.getAttribute('data-target'), 10) || 0;\n      var duration = 2000;\n      var startTime = performance.now();\n\n      function update(now) {\n        var elapsed = now - startTime;\n        var progress = Math.min(elapsed / duration, 1);\n        var easeOut = 1 - Math.pow(1 - progress, 3);\n        var currentVal = Math.floor(easeOut * target);\n\n        counter.textContent = currentVal.toLocaleString();\n\n        if (progress < 1) {\n          requestAnimationFrame(update);\n        } else {\n          counter.textContent = target.toLocaleString();\n        }\n      }\n\n      requestAnimationFrame(update);\n    });\n  }\n\n  // 1. Listen for preloader finish event\n  window.addEventListener('loader:finished', function () {\n    setTimeout(triggerStatCounters, 320);\n  });\n\n  // 2. MutationObserver fallback\n  var observer = new MutationObserver(function () {\n    if (document.documentElement.classList.contains('loader-complete')) {\n      setTimeout(triggerStatCounters, 320);\n      observer.disconnect();\n    }\n  });\n  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });\n\n  // 3. Immediate execution if page is already loaded\n  if (document.documentElement.classList.contains('loader-complete') || document.readyState === 'complete') {\n    setTimeout(triggerStatCounters, 320);\n  }\n\n  // Video fallback for reduced motion\n  (function () {\n    var video = document.getElementById('bg-video');\n    if (!video) return;\n    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\n      video.pause();\n      video.removeAttribute('autoplay');\n    }\n  })();\n\n  // Live Click Counter Handler\n  (function initClickCounter() {\n    var display = document.getElementById('global-click-display');\n    var button = document.getElementById('click-counter-btn');\n    if (!display || !button) return;\n\n    var currentCount = 0;\n\n    // Fetch initial count\n    fetch('/api/clicks')\n      .then(function (res) { return res.json(); })\n      .then(function (data) {\n        if (typeof data.count === 'number') {\n          currentCount = data.count;\n          display.textContent = currentCount.toLocaleString();\n        }\n      })\n      .catch(function () {\n        display.textContent = '0';\n      });\n\n    // Handle button taps with optimistic UI updates\n    button.addEventListener('click', function () {\n      currentCount++;\n      display.textContent = currentCount.toLocaleString();\n\n      fetch('/api/clicks', { method: 'POST' })\n        .then(function (res) { return res.json(); })\n        .then(function (data) {\n          if (typeof data.count === 'number') {\n            currentCount = data.count;\n            display.textContent = currentCount.toLocaleString();\n          }\n        })\n        .catch(function (err) {\n          console.error('Increment failed:', err);\n        });\n    });\n  })();\n<\/script>"], ["", "  <script>\n  // Specular flashlight sweep on mousemove for glass cards\n  document.querySelectorAll('[data-glass-card]').forEach((card) => {\n    card.addEventListener('mousemove', (e) => {\n      const rect = card.getBoundingClientRect();\n      card.style.setProperty('--glass-card-mouse-x', \\`\\${e.clientX - rect.left}px\\`);\n      card.style.setProperty('--glass-card-mouse-y', \\`\\${e.clientY - rect.top}px\\`);\n    });\n  });\n\n  // Unified Stat Counter Animation (Coffee + Active Repos)\n  function triggerStatCounters() {\n    var counters = document.querySelectorAll('.stat-counter');\n    counters.forEach(function (counter) {\n      if (counter.getAttribute('data-started') === 'true') return;\n      counter.setAttribute('data-started', 'true');\n\n      var target = parseInt(counter.getAttribute('data-target'), 10) || 0;\n      var duration = 2000;\n      var startTime = performance.now();\n\n      function update(now) {\n        var elapsed = now - startTime;\n        var progress = Math.min(elapsed / duration, 1);\n        var easeOut = 1 - Math.pow(1 - progress, 3);\n        var currentVal = Math.floor(easeOut * target);\n\n        counter.textContent = currentVal.toLocaleString();\n\n        if (progress < 1) {\n          requestAnimationFrame(update);\n        } else {\n          counter.textContent = target.toLocaleString();\n        }\n      }\n\n      requestAnimationFrame(update);\n    });\n  }\n\n  // 1. Listen for preloader finish event\n  window.addEventListener('loader:finished', function () {\n    setTimeout(triggerStatCounters, 320);\n  });\n\n  // 2. MutationObserver fallback\n  var observer = new MutationObserver(function () {\n    if (document.documentElement.classList.contains('loader-complete')) {\n      setTimeout(triggerStatCounters, 320);\n      observer.disconnect();\n    }\n  });\n  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });\n\n  // 3. Immediate execution if page is already loaded\n  if (document.documentElement.classList.contains('loader-complete') || document.readyState === 'complete') {\n    setTimeout(triggerStatCounters, 320);\n  }\n\n  // Video fallback for reduced motion\n  (function () {\n    var video = document.getElementById('bg-video');\n    if (!video) return;\n    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {\n      video.pause();\n      video.removeAttribute('autoplay');\n    }\n  })();\n\n  // Live Click Counter Handler\n  (function initClickCounter() {\n    var display = document.getElementById('global-click-display');\n    var button = document.getElementById('click-counter-btn');\n    if (!display || !button) return;\n\n    var currentCount = 0;\n\n    // Fetch initial count\n    fetch('/api/clicks')\n      .then(function (res) { return res.json(); })\n      .then(function (data) {\n        if (typeof data.count === 'number') {\n          currentCount = data.count;\n          display.textContent = currentCount.toLocaleString();\n        }\n      })\n      .catch(function () {\n        display.textContent = '0';\n      });\n\n    // Handle button taps with optimistic UI updates\n    button.addEventListener('click', function () {\n      currentCount++;\n      display.textContent = currentCount.toLocaleString();\n\n      fetch('/api/clicks', { method: 'POST' })\n        .then(function (res) { return res.json(); })\n        .then(function (data) {\n          if (typeof data.count === 'number') {\n            currentCount = data.count;\n            display.textContent = currentCount.toLocaleString();\n          }\n        })\n        .catch(function (err) {\n          console.error('Increment failed:', err);\n        });\n    });\n  })();\n<\/script>"])), renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Dock", $$Dock, { "client:load": true, "client:component-hydration": "load", "client:component-path": "@astroanimate/core/Dock", "client:component-export": "default", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` <a href="#index" class="dock-item flex flex-col items-center justify-center p-2 group" aria-label="Index" data-astro-cid-j7pv25f6> <span class="dock-label" data-astro-cid-j7pv25f6>Index</span> <div class="w-10 h-10 rounded-[8px] text-[#ff3d00] border border-[#ff3d00] flex items-center justify-center font-display text-sm group-hover:bg-[#ff3d00] group-hover:text-paper transition-all" data-astro-cid-j7pv25f6>
IX
</div> </a> <a href="#about" class="dock-item flex flex-col items-center justify-center p-2 group" aria-label="About" data-astro-cid-j7pv25f6> <span class="dock-label" data-astro-cid-j7pv25f6>About</span> <div class="w-10 h-10 rounded-[8px] text-[#ff3d00] border border-[#ff3d00] flex items-center justify-center font-display text-sm group-hover:bg-[#ff3d00] group-hover:text-paper transition-all" data-astro-cid-j7pv25f6>
01
</div> </a> <a href="#work" class="dock-item flex flex-col items-center justify-center p-2 group" aria-label="Work" data-astro-cid-j7pv25f6> <span class="dock-label" data-astro-cid-j7pv25f6>Work</span> <div class="w-10 h-10 rounded-[8px] text-[#ff3d00] border border-[#ff3d00] flex items-center justify-center font-display text-sm group-hover:bg-[#ff3d00] group-hover:text-paper transition-all" data-astro-cid-j7pv25f6>
02
</div> </a> <a href="#contact" class="dock-item flex flex-col items-center justify-center p-2 group" aria-label="Contact" data-astro-cid-j7pv25f6> <span class="dock-label" data-astro-cid-j7pv25f6>Contact</span> <div class="w-10 h-10 rounded-[8px] text-[#ff3d00] border border-[#ff3d00] flex items-center justify-center font-display text-sm group-hover:bg-[#ff3d00] group-hover:text-paper transition-all" data-astro-cid-j7pv25f6>
04
</div> </a> ` })} </div> <main class="relative" data-astro-cid-j7pv25f6> <section id="index" class="section-frame min-h-screen flex items-end px-5 md:px-8 pb-16 pt-28 scroll-mt-6 relative overflow-hidden" data-astro-cid-j7pv25f6> <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden" data-astro-cid-j7pv25f6> <img src="/warp.gif" alt="" aria-hidden="true" class="w-full h-full object-cover object-center opacity-100 blur-[15px] scale-105" data-astro-cid-j7pv25f6> <div class="absolute inset-0 backdrop-blur-[1px]" style="background: radial-gradient(circle at 50% 50%, transparent 10%, black 95%);" data-astro-cid-j7pv25f6></div> </div> <div class="w-full relative z-10" data-astro-cid-j7pv25f6> <p class="stamp hero-fade hero-fade-1 text-xs md:text-sm mb-6 text-[rgb(245,245,247)]" data-astro-cid-j7pv25f6>
PORTFOLIO&nbsp;DOSSIER — EST. 2020 — MANILA / REMOTE
</p> <h1 class="hero-fade hero-fade-2 font-display uppercase leading-[0.82] tracking-tightest2 text-[16vw] md:text-[10vw]" data-astro-cid-j7pv25f6>
[LLOYD<br data-astro-cid-j7pv25f6>ANGARA]
</h1> <div class="hero-fade hero-fade-3 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full relative z-10" data-astro-cid-j7pv25f6> ${glassCards.map((card) => renderTemplate`<div data-glass-card${addAttribute(`--glass-card-bg: ${card.bg};`, "style")} class="group relative p-6 rounded-3xl flex flex-col justify-between min-h-[240px] text-white" data-astro-cid-j7pv25f6> <div class="relative z-10 w-full flex-1 flex flex-col" data-astro-cid-j7pv25f6> <div class="flex items-center justify-between mb-4" data-astro-cid-j7pv25f6> <div class="w-9 h-9 rounded-xl bg-black/[0.08] border border-white/20 flex items-center justify-center text-white" data-astro-cid-j7pv25f6>${unescapeHTML(card.icon)}</div> <span class="stamp text-[10px] tracking-wider text-white/50" data-astro-cid-j7pv25f6>${card.subtitle}</span> </div> <h3 class="font-display text-xs tracking-wider uppercase text-white/80 mb-1" data-astro-cid-j7pv25f6> ${card.title} </h3>  ${card.id === "coffee" && renderTemplate`<div class="mt-3 font-display text-8xl font-normal tracking-normal text-[#fd3d00] flex items-baseline gap-2" data-astro-cid-j7pv25f6> <span id="coffee-counter" class="stat-counter tabular-nums"${addAttribute(card.count, "data-target")} data-astro-cid-j7pv25f6>
0
</span> <span class="text-[11px] font-mono tracking-wider text-accent font-normal" data-astro-cid-j7pv25f6> ${card.unit} </span> </div>`}  ${card.id === "design" && renderTemplate`<div class="mt-3 flex-1 flex flex-col justify-between" data-astro-cid-j7pv25f6> <div class="flex items-center justify-between mb-2" data-astro-cid-j7pv25f6> <span class="font-mono text-[10px] tracking-widest text-[#fd3d00] uppercase font-bold" data-astro-cid-j7pv25f6> ${totalContributions} COMMITS
</span> <span class="font-mono text-[9px] text-white/40 tracking-wider" data-astro-cid-j7pv25f6> ${CURRENT_YEAR} </span> </div> <div class="w-full p-2.5 rounded-2xl bg-black/40 border border-white/10 flex-1 flex items-center" data-astro-cid-j7pv25f6> <div class="grid grid-flow-col grid-rows-7 gap-[1.5px] sm:gap-[2px] w-full h-full min-h-[90px] justify-between items-stretch" data-astro-cid-j7pv25f6> ${fullYearDays.map((day) => renderTemplate`<div${addAttribute(`${day.date || "No Date"}: ${day.count || 0} commits`, "title")}${addAttribute([
    "w-[2.5px] min-[400px]:w-[3px] lg:w-[2.5px] xl:w-[1px] h-full min-h-[8px] rounded-[10px] transition-all duration-150",
    day.level === 0 && "bg-white/[0.07] hover:bg-white/30",
    day.level === 1 && "bg-[#fd3d00]/40",
    day.level === 2 && "bg-[#fd3d00]/70",
    day.level === 3 && "bg-[#fd3d00]",
    day.level >= 4 && "bg-[#fd3d00] shadow-[0_0_6px_#fd3d00]"
  ], "class:list")} data-astro-cid-j7pv25f6></div>`)} </div> </div> </div>`}  ${card.id === "wip" && renderTemplate`<div class="mt-3 flex-1 flex flex-col justify-between" data-astro-cid-j7pv25f6> <div class="font-display text-7xl font-normal tracking-normal text-[#fd3d00] flex items-baseline gap-2 mb-2" data-astro-cid-j7pv25f6> <span class="stat-counter tabular-nums"${addAttribute(card.count, "data-target")} data-astro-cid-j7pv25f6>
0
</span> <span class="text-[10px] font-mono tracking-widest text-white/50 uppercase" data-astro-cid-j7pv25f6> ${card.unit} </span> </div> <!-- Live GitHub Repo List --> <div class="space-y-1.5 border-t border-white/10 pt-3" data-astro-cid-j7pv25f6> ${card.items?.length > 0 ? card.items.map((item) => renderTemplate`<a${addAttribute(item.url, "href")} target="_blank" rel="noopener noreferrer" class="flex items-center justify-between text-[11px] font-mono tracking-wider group/item hover:text-[#ff3d00] transition-colors" data-astro-cid-j7pv25f6> <span class="text-white/80 group-hover/item:text-[#ff3d00] truncate max-w-[135px] flex items-center gap-1.5" data-astro-cid-j7pv25f6> <span class="w-1.5 h-1.5 rounded-full bg-[#fd3d00] animate-pulse" data-astro-cid-j7pv25f6></span> ${item.name} </span> <span class="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/10 text-white/50 group-hover/item:border-[#ff3d00]/40 group-hover/item:text-[#ff3d00]" data-astro-cid-j7pv25f6> ${item.status} </span> </a>`) : renderTemplate`<span class="text-[10px] font-mono text-white/40" data-astro-cid-j7pv25f6>NO ACTIVE BUILDS</span>`} </div> </div>`}  ${card.id === "clicks" && renderTemplate`<div class="mt-3 flex-1 flex flex-col justify-between" data-astro-cid-j7pv25f6> <div class="font-display text-7xl font-normal tracking-normal text-[#fd3d00] flex items-baseline gap-2 mb-2" data-astro-cid-j7pv25f6> <span id="global-click-display" class="tabular-nums" data-astro-cid-j7pv25f6>
--
</span> <span class="text-[10px] font-mono tracking-widest text-white/50 uppercase" data-astro-cid-j7pv25f6> ${card.unit} </span> </div> <!-- Push Button --> <button id="click-counter-btn" type="button" class="w-full mt-2 py-2.5 px-4 rounded-xl font-mono text-[11px] tracking-wider uppercase bg-white/[0.05] border border-white/15 text-white/80 hover:border-[#ff3d00] hover:text-[#ff3d00] hover:bg-[#ff3d00]/10 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group/btn cursor-pointer" data-astro-cid-j7pv25f6> <span class="w-1.5 h-1.5 rounded-full bg-[#fd3d00] group-hover/btn:animate-ping" data-astro-cid-j7pv25f6></span> <span data-astro-cid-j7pv25f6>SEND PULSE</span> </button> </div>`} </div>  ${card.description && renderTemplate`<p class="relative z-10 text-xs text-white/70 leading-relaxed mt-4" data-astro-cid-j7pv25f6> ${card.description} </p>`} </div>`)} </div> <div class="hero-fade hero-fade-3 mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t text-[rgb(245,245,247)] pt-6" data-astro-cid-j7pv25f6> <p class="stamp text-sm md:text-base max-w-md text-[rgb(245,245,247)]" data-astro-cid-j7pv25f6>
ANALYST - DESIGNER — DEVELOPER. BUILDING RAW, LEGIBLE INTERFACES/DASHBOARDS FOR
            DIFFICULT PROBLEMS.
</p> <a href="#work" class="stamp text-sm border border-line px-5 py-3 hover:bg-ink hover:text-paper transition-colors self-start" data-astro-cid-j7pv25f6>
VIEW WORK ↓
</a> </div> </div> </section> <section id="about" class="section-frame px-5 md:px-8 py-24 md:py-32 border-t border-line bg-paper/70 scroll-mt-6" data-astro-cid-j7pv25f6> <div class="grid md:grid-cols-12 gap-8" data-astro-cid-j7pv25f6> <div class="md:col-span-3" data-astro-cid-j7pv25f6> <p class="stamp text-xs text-ink/60" data-astro-cid-j7pv25f6>§ 01 — ABOUT</p> </div> <div class="md:col-span-8 md:col-start-5" data-astro-cid-j7pv25f6> <p class="font-body text-2xl md:text-4xl leading-snug" data-astro-cid-j7pv25f6>
I work at the seam between design and code — mostly for studios,
            research groups, and small teams who need something that
<span class="text-accent" data-astro-cid-j7pv25f6>holds up under real content</span>,
            not just a mockup.
</p> <p class="stamp text-xs mt-10 text-ink/60 max-w-md" data-astro-cid-j7pv25f6>
REPLACE THIS BLOCK WITH YOUR OWN BIO. KEEP SENTENCES SHORT.
            THE DOSSIER VOICE IS THE POINT.
</p> </div> </div> </section> <!-- WORK --> <section id="work" class="section-frame px-5 md:px-8 py-24 md:py-32 border-t border-white/20 scroll-mt-6" data-astro-cid-j7pv25f6> <p class="stamp text-xs text-[#ffffff] mb-10" data-astro-cid-j7pv25f6>§ 02 — SELECTED WORK</p> <div class="border-t border-white/20" data-astro-cid-j7pv25f6> ${projects.map((p) => renderTemplate`<a href="#" class="group relative grid md:grid-cols-12 gap-4 md:gap-8 items-center border-b border-white/20 py-8 text-[#ffffff] px-4 -mx-4 rounded-xl transition-all duration-200 hover:outline hover:outline-1 hover:outline-[#ff3d00] hover:shadow-[0_0_20px_rgba(255,61,0,0.15)] hover:border-transparent" data-astro-cid-j7pv25f6> <span class="md:col-span-1 stamp text-xs text-white/50 group-hover:text-[#ff3d00] transition-colors" data-astro-cid-j7pv25f6> ${p.num} </span> <span class="md:col-span-5 font-display uppercase text-3xl md:text-5xl leading-none text-[#ffffff] group-hover:text-[#ff3d00] transition-colors" data-astro-cid-j7pv25f6> ${p.title} </span> <span class="md:col-span-4 font-body text-sm md:text-base text-white/70 group-hover:text-white transition-colors" data-astro-cid-j7pv25f6> ${p.blurb} </span> <span class="md:col-span-2 flex md:justify-end gap-2 flex-wrap" data-astro-cid-j7pv25f6> ${p.tags.map((t) => renderTemplate`<span class="stamp text-[10px] border border-white/30 text-[#ffffff] group-hover:border-[#ff3d00]/60 group-hover:text-[#ff3d00] px-2 py-1 transition-colors" data-astro-cid-j7pv25f6> ${t} </span>`)} </span> </a>`)} </div> </section> <section class="section-frame px-5 md:px-8 py-24 md:py-32 border-t border-line bg-paper/60" data-astro-cid-j7pv25f6> <p class="stamp text-xs text-ink/60 mb-10" data-astro-cid-j7pv25f6>§ 03 — CAPABILITIES</p> <div class="flex flex-wrap gap-3" data-astro-cid-j7pv25f6> ${capabilities.map((c) => renderTemplate`<span class="stamp text-xs md:text-sm border border-line px-4 py-3" data-astro-cid-j7pv25f6> ${c} </span>`)} </div> </section> <div class="relative overflow-hidden bg-black text-[#f2f0ea] border-t border-line" data-astro-cid-j7pv25f6> <div class="pointer-events-none absolute inset-x-0 top-0 h-100 z-10" style="background: radial-gradient(ellipse 80% 90% at 50% 90%, transparent 10%, rgba(0, 0, 0, 0) 70%, rgba(242, 280, 234, 0.8) 85%, var(--paper) 95%);" data-astro-cid-j7pv25f6></div> <div class="absolute inset-0 z-0 pointer-events-none opacity-90 mix-blend-screen" data-astro-cid-j7pv25f6> <video id="bg-video" autoplay loop muted playsinline class="w-full h-full object-cover object-bottom blur-[8.5px]" data-astro-cid-j7pv25f6> <source src="/blackhole.mp4" type="video/mp4" data-astro-cid-j7pv25f6> <source src="/blackhole.webm" type="video/webm" data-astro-cid-j7pv25f6> </video> <div class="absolute inset-0" data-astro-cid-j7pv25f6></div> </div> <section id="contact" class="relative z-20 section-frame px-5 md:px-8 pt-44 pb-28 md:pt-60 md:pb-40 scroll-mt-6" data-astro-cid-j7pv25f6> <p class="stamp text-xs text-[#f2f0ea]/60 mb-8" data-astro-cid-j7pv25f6>§ 04 — CONTACT</p> <a href="mailto:lloydangaraa@gmail.com" class="font-display uppercase text-[13vw] md:text-[7vw] leading-[0.85] block text-white hover:text-accent transition-colors drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]" data-astro-cid-j7pv25f6>
LET'S TALK →
</a> <div class="mt-12 flex flex-wrap gap-x-10 gap-y-4 stamp text-xs text-[#f2f0ea]/70" data-astro-cid-j7pv25f6> <span data-astro-cid-j7pv25f6>LLOYDANGARAA@GMAIL.COM</span> <span data-astro-cid-j7pv25f6>@HAL__O_</span> <span data-astro-cid-j7pv25f6>AVAILABLE FROM Q1 2026</span> </div> </section> <footer class="relative z-20 section-frame px-5 md:px-8 py-8 border-t border-[rgb(245,245,247)] flex items-center justify-between" data-astro-cid-j7pv25f6> <span class="stamp text-[10px] text-[rgb(245,245,247)]" data-astro-cid-j7pv25f6>
© 2026 [LLOYD ANGARA]. ALL RIGHTS RESERVED.
</span> <a href="#index" class="stamp text-[10px]text-[rgb(245,245,247)] hover:text-accent transition-colors" data-astro-cid-j7pv25f6>
BACK TO TOP ↑
</a> </footer> </div> </main> ` }));
}, "/home/halo/brutalist-portfolio/src/pages/index.astro", void 0);

const $$file = "/home/halo/brutalist-portfolio/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
