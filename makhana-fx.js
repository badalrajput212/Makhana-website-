/**
 * MAKHANA POP — Premium Click Interaction (v2)
 * ──────────────────────────────────────────
 * • 6 different makhana burst styles (burst, fountain, spiral, ring, bounce, wobble)
 *   – shuffled so the same style never repeats back-to-back
 * • Double golden ripple at click origin
 * • Soft makhana crumb trail behind the cursor (desktop only)
 * • Smooth cream/gold cursor glow follower (desktop only)
 * • Fully standalone — zero dependencies
 * • Respects prefers-reduced-motion
 * • Auto-cleans every DOM element after animation
 */
(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════
     0. GUARD CLAUSES
  ═══════════════════════════════════════════════════════ */
  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Touch / mobile detection
  var IS_MOBILE = (
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  );

  /* ═══════════════════════════════════════════════════════
     1. CONFIG
  ═══════════════════════════════════════════════════════ */
  var CFG = {
    // Particle count range [min, max]
    particleCount:    IS_MOBILE ? [4, 6]  : [7, 10],
    // Travel distance px [min, max]
    particleDist:     IS_MOBILE ? [22, 48] : [32, 72],
    // Particle size px [min, max]
    particleSize:     IS_MOBILE ? [5, 10] : [6, 13],
    // Full anim duration ms [min, max]
    particleDuration: [750, 1050],
    // Ripple
    rippleMaxSize:    46,        // px diameter at peak
    rippleDuration:   620,       // ms
    // Cursor follower
    cursorSmooth:     0.11,      // lerp factor (lower = more lag/smoothness)
    cursorSize:       30,        // px diameter base
    cursorSizeHover:  44,        // px on interactive hover
    // Trail (desktop only)
    trail:            true,      // set false to disable crumb trail
    trailEveryPx:     26,        // min mouse travel between crumbs
    trailEveryMs:     50,        // min time between crumbs
    trailSize:        [3, 6],
    trailDuration:    [520, 780],
    // Safety cap on simultaneous animated elements
    maxActive:        70,
  };

  /* ═══════════════════════════════════════════════════════
     2. MAKHANA VISUAL PALETTES
  ═══════════════════════════════════════════════════════ */

  var PARTICLE_BG = [
    'radial-gradient(circle at 34% 30%, #FFFEF9 0%, #F7F1E5 38%, #EDE3CC 72%, #D9CEB5 100%)',
    'radial-gradient(circle at 38% 33%, #FFFFFB 0%, #F9F4EA 42%, #EAE0CB 70%, #D6CBAE 100%)',
    'radial-gradient(circle at 30% 28%, #FFFDF7 0%, #F5EFE0 40%, #E6D8BE 72%, #D1C49C 100%)',
    'radial-gradient(circle at 40% 35%, #FFFEFC 0%, #F7F2E6 44%, #EBE1CE 75%, #DBCFB3 100%)',
    // Subtle gold-kiss variant
    'radial-gradient(circle at 36% 30%, #FFFFF8 0%, #F4EDD8 40%, #E2D4AD 70%, #C9A45C44 100%)',
    // Slightly darker roasted tone
    'radial-gradient(circle at 32% 32%, #FAF4E8 0%, #EDE2CC 45%, #D8CAAA 72%, #C4B38A 100%)',
  ];

  // Organic blob border-radii — not perfect circles, like real fox nuts
  var PARTICLE_RADIUS = [
    '42% 58% 54% 46% / 52% 44% 56% 48%',
    '52% 48% 44% 56% / 46% 56% 44% 54%',
    '58% 42% 48% 52% / 54% 46% 58% 42%',
    '44% 56% 60% 40% / 60% 40% 46% 54%',
    '50% 50% 46% 54% / 42% 58% 52% 48%',
    '62% 38% 50% 50% / 50% 50% 40% 60%',
    '46% 54% 52% 48% / 56% 44% 50% 50%',
  ];

  /* ═══════════════════════════════════════════════════════
     3. INJECT STYLES
  ═══════════════════════════════════════════════════════ */
  var styleEl = document.createElement('style');
  styleEl.id = 'makhana-fx-styles';
  styleEl.textContent = [

    /* ── Cursor Follower ── */
    '.mpfx-cursor {',
    '  position: fixed;',
    '  top: 0; left: 0;',
    '  pointer-events: none;',
    '  z-index: 2147483640;',
    '  border-radius: 50%;',
    '  width: ' + CFG.cursorSize + 'px;',
    '  height: ' + CFG.cursorSize + 'px;',
    '  background: radial-gradient(',
    '    circle,',
    '    rgba(201,164,92,0.22) 0%,',
    '    rgba(247,241,229,0.13) 45%,',
    '    transparent 70%',
    '  );',
    '  transform: translate(-50%,-50%) scale(1);',
    '  transition:',
    '    width 0.25s ease,',
    '    height 0.25s ease,',
    '    opacity 0.3s ease,',
    '    transform 0.18s cubic-bezier(0.34,1.6,0.64,1);',
    '  mix-blend-mode: screen;',
    '  will-change: left, top, transform;',
    '  opacity: 0;',
    '}',

    '.mpfx-cursor.mpfx-cursor--active {',
    '  opacity: 1;',
    '}',

    '.mpfx-cursor.mpfx-cursor--hover {',
    '  width: ' + CFG.cursorSizeHover + 'px;',
    '  height: ' + CFG.cursorSizeHover + 'px;',
    '  background: radial-gradient(',
    '    circle,',
    '    rgba(201,164,92,0.30) 0%,',
    '    rgba(247,241,229,0.18) 45%,',
    '    transparent 70%',
    '  );',
    '}',

    '.mpfx-cursor.mpfx-cursor--click {',
    '  transform: translate(-50%,-50%) scale(0.62);',
    '}',

    /* ── Makhana Particle ── */
    '.mpfx-p {',
    '  position: fixed;',
    '  top: 0; left: 0;',
    '  pointer-events: none;',
    '  z-index: 2147483638;',
    '  opacity: 1;',
    '  will-change: transform, opacity;',
    '  box-shadow:',
    '    inset -1.5px -1.5px 2px rgba(0,0,0,0.09),',
    '    inset 1px 1.5px 2.5px rgba(255,255,255,0.70),',
    '    0 1.5px 5px rgba(14,38,30,0.16),',
    '    0 0 0 0.5px rgba(14,38,30,0.04);',
    '}',

    /* ── Golden Ripple ── */
    '.mpfx-ripple {',
    '  position: fixed;',
    '  top: 0; left: 0;',
    '  pointer-events: none;',
    '  z-index: 2147483636;',
    '  border-radius: 50%;',
    '  border: 1.5px solid rgba(201,164,92,0.52);',
    '  background: radial-gradient(',
    '    circle,',
    '    rgba(201,164,92,0.10) 0%,',
    '    rgba(247,241,229,0.04) 50%,',
    '    transparent 70%',
    '  );',
    '  filter: blur(0.4px);',
    '  will-change: transform, opacity;',
    '}',

  ].join('\n');

  document.head.appendChild(styleEl);

  /* ═══════════════════════════════════════════════════════
     4. UTILITY HELPERS
  ═══════════════════════════════════════════════════════ */
  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
  function randInt(min, max) {
    return Math.floor(rand(min, max + 1));
  }
  function pick(arr) {
    return arr[randInt(0, arr.length - 1)];
  }
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }
  function easeInOutBack(t) {
    var c1 = 1.70158;
    var c2 = c1 * 1.525;
    return t < 0.5
      ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
      : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
  }
  // Pop scale: 0 → 1.25 → 1 (same feel as before, reusable)
  function popScale(p) {
    if (p < 0.18) return (p / 0.18) * 1.25;
    if (p < 0.32) return 1.25 - 0.25 * ((p - 0.18) / 0.14);
    return 1;
  }
  // Fade: full until `from`, then linear to 0
  function fadeOut(p, from) {
    return p < from ? 1 : 1 - ((p - from) / (1 - from));
  }

  /* ═══════════════════════════════════════════════════════
     5. CURSOR FOLLOWER  (desktop only)
  ═══════════════════════════════════════════════════════ */
  var cursorEl = null;
  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var followerX = mouseX;
  var followerY = mouseY;
  var cursorRAF = null;
  var cursorVisible = false;

  // trail state
  var lastTrailX = mouseX;
  var lastTrailY = mouseY;
  var lastTrailT = 0;

  if (!IS_MOBILE && !REDUCED_MOTION) {
    cursorEl = document.createElement('div');
    cursorEl.className = 'mpfx-cursor';
    cursorEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cursorEl);

    // Smooth follow loop
    function tickCursor() {
      followerX += (mouseX - followerX) * CFG.cursorSmooth;
      followerY += (mouseY - followerY) * CFG.cursorSmooth;

      cursorEl.style.left = followerX + 'px';
      cursorEl.style.top  = followerY + 'px';

      cursorRAF = requestAnimationFrame(tickCursor);
    }
    cursorRAF = requestAnimationFrame(tickCursor);

    // Track mouse
    document.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!cursorVisible) {
        cursorVisible = true;
        cursorEl.classList.add('mpfx-cursor--active');
      }

      // Hover detection on interactive elements
      var tgt = e.target;
      var isInteractive = !!(
        tgt.closest('a, button, [role="button"], input, select, textarea, label') ||
        tgt.closest('.product-card, .recipe-card, .benefit-card, .showcase-card, .b2b-btn, .nav-link, .filter-pill, .compare-btn, .tag-pill, .slider-btn')
      );

      if (isInteractive) {
        cursorEl.classList.add('mpfx-cursor--hover');
      } else {
        cursorEl.classList.remove('mpfx-cursor--hover');
      }

      // Crumb trail
      if (CFG.trail) maybeSpawnTrail(e.clientX, e.clientY);
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      cursorEl.classList.remove('mpfx-cursor--active');
      cursorVisible = false;
    });

    document.addEventListener('mouseenter', function () {
      if (mouseX > 0) {
        cursorEl.classList.add('mpfx-cursor--active');
        cursorVisible = true;
      }
    });
  }

  /* ═══════════════════════════════════════════════════════
     6. CORE PARTICLE ENGINE
        One generic element factory + animator, used by every
        pattern, ripple-free so patterns stay tiny & readable.
  ═══════════════════════════════════════════════════════ */
  var activeCount = 0;

  function makeMakhana(x, y, size) {
    var el = document.createElement('div');
    el.className = 'mpfx-p';
    el.setAttribute('aria-hidden', 'true');
    el.style.cssText =
      'left:' + x + 'px;' +
      'top:' + y + 'px;' +
      'width:' + size + 'px;' +
      'height:' + size + 'px;' +
      'background:' + pick(PARTICLE_BG) + ';' +
      'border-radius:' + pick(PARTICLE_RADIUS) + ';' +
      'transform:translate(-50%,-50%) scale(0);' +
      'opacity:1;';
    document.body.appendChild(el);
    return el;
  }

  /**
   * calc(p) → { x, y, r, s, o }   (p = 0..1 progress)
   */
  function animate(el, dur, calc) {
    activeCount++;
    var t0 = performance.now();

    function step(now) {
      var p = Math.min((now - t0) / dur, 1);
      var c = calc(p);

      el.style.transform =
        'translate(-50%,-50%) translate(' + c.x + 'px,' + c.y + 'px) ' +
        'rotate(' + c.r + 'deg) scale(' + c.s + ')';
      el.style.opacity = c.o;

      if (p < 1) {
        requestAnimationFrame(step);
      } else {
        el.remove();
        activeCount--;
      }
    }
    requestAnimationFrame(step);
  }

  /* ═══════════════════════════════════════════════════════
     7. BURST PATTERNS
        Each returns a calc(p) function for one particle.
        a = { idx, count, slice, base, dist }
  ═══════════════════════════════════════════════════════ */
  var PATTERNS = {

    // 1. Classic radial burst + gravity (original feel, refined)
    burst: function (a) {
      var angle = a.base + a.slice * a.idx + rand(-0.5, 0.5);
      var tx = Math.cos(angle) * a.dist;
      var ty = Math.sin(angle) * a.dist;
      var g = rand(8, 20), rot = rand(-220, 220);
      return function (p) {
        var e = easeOutQuart(p);
        return { x: tx * e, y: ty * e + g * p * p, r: rot * e, s: popScale(p), o: fadeOut(p, 0.55) };
      };
    },

    // 2. Fountain — makhanas shoot UP in a cone and fall back with gravity
    fountain: function (a) {
      var angle = -Math.PI / 2 + rand(-0.75, 0.75);
      var power = a.dist * rand(1.3, 2.0);
      var vx = Math.cos(angle) * power * 0.9;
      var vy = Math.sin(angle) * power;
      var g = a.dist * rand(2.4, 3.2);
      var rot = rand(-360, 360);
      return function (p) {
        return { x: vx * p, y: vy * p + g * p * p, r: rot * p, s: popScale(p), o: fadeOut(p, 0.6) };
      };
    },

    // 3. Spiral — makhanas swirl outward like a tiny whirlwind
    spiral: function (a) {
      var start = a.base + a.slice * a.idx;
      var spin = (Math.random() < 0.5 ? -1 : 1) * rand(1.6, 2.6);
      var maxR = a.dist * rand(0.95, 1.3);
      return function (p) {
        var ang = start + spin * easeOutCubic(p);
        var rad = maxR * easeOutCubic(p);
        return {
          x: Math.cos(ang) * rad,
          y: Math.sin(ang) * rad + 6 * p * p,
          r: spin * 180 * p,
          s: popScale(p) * (1 - 0.35 * p),
          o: fadeOut(p, 0.5)
        };
      };
    },

    // 4. Ring — perfectly even shockwave ring, makhanas shrink as they travel
    ring: function (a) {
      var angle = a.base + a.slice * a.idx;
      var R = a.dist * 1.05;
      return function (p) {
        var e = easeOutQuart(p);
        return {
          x: Math.cos(angle) * R * e,
          y: Math.sin(angle) * R * e,
          r: (a.idx % 2 ? 1 : -1) * 120 * e,
          s: popScale(p) * (1 - 0.45 * p),
          o: fadeOut(p, 0.45)
        };
      };
    },

    // 5. Bounce — makhanas hop out and bounce once like real puffed seeds
    bounce: function (a) {
      var dir = (a.idx % 2 ? 1 : -1);
      var tx = dir * rand(0.35, 1) * a.dist * 1.1;
      var hop = rand(0.5, 0.9) * a.dist;
      var floor = a.dist * 0.55;
      var rot = dir * rand(160, 380);
      return function (p) {
        var y;
        if (p < 0.5) {            // first arc up & down
          var q = p / 0.5;
          y = -hop * 4 * q * (1 - q);
        } else {                  // smaller second hop
          var q2 = (p - 0.5) / 0.5;
          y = -hop * 0.35 * 4 * q2 * (1 - q2);
        }
        return {
          x: tx * easeOutCubic(p),
          y: y + floor * easeOutQuart(Math.min(p * 1.4, 1)) * 0.4,
          r: rot * p,
          s: popScale(p),
          o: fadeOut(p, 0.65)
        };
      };
    },

    // 6. Wobble — lazy, floaty drift with a sine sway (soft & premium)
    wobble: function (a) {
      var angle = a.base + a.slice * a.idx + rand(-0.4, 0.4);
      var tx = Math.cos(angle) * a.dist * 0.9;
      var ty = Math.sin(angle) * a.dist * 0.9;
      var amp = rand(5, 11), freq = rand(2.0, 3.4), ph = rand(0, 6.28);
      return function (p) {
        var e = easeOutCubic(p);
        var sway = Math.sin(p * Math.PI * freq + ph) * amp * (1 - p);
        // perpendicular sway
        return {
          x: tx * e + Math.cos(angle + Math.PI / 2) * sway,
          y: ty * e + Math.sin(angle + Math.PI / 2) * sway - 10 * p + 16 * p * p,
          r: Math.sin(p * Math.PI * 2 + ph) * 40,
          s: popScale(p),
          o: fadeOut(p, 0.5)
        };
      };
    },
  };

  // Shuffle-bag: every style plays once before any repeats,
  // and never the same style twice in a row.
  var PATTERN_KEYS = Object.keys(PATTERNS);
  var bag = [];
  var lastPattern = '';
  function nextPattern() {
    if (!bag.length) {
      bag = PATTERN_KEYS.slice();
      for (var i = bag.length - 1; i > 0; i--) {
        var j = randInt(0, i);
        var t = bag[i]; bag[i] = bag[j]; bag[j] = t;
      }
      if (bag[bag.length - 1] === lastPattern) { // avoid back-to-back repeat
        bag.unshift(bag.pop());
      }
    }
    lastPattern = bag.pop();
    return lastPattern;
  }

  /* ═══════════════════════════════════════════════════════
     8. RIPPLE EFFECT  (now a soft double ring)
  ═══════════════════════════════════════════════════════ */
  function spawnRipple(x, y, delay, scaleMul) {
    setTimeout(function () {
      var el = document.createElement('div');
      el.className = 'mpfx-ripple';
      var startPx = 8;
      el.style.cssText =
        'left:' + x + 'px;top:' + y + 'px;' +
        'width:' + startPx + 'px;height:' + startPx + 'px;' +
        'transform:translate(-50%,-50%);opacity:1;';
      document.body.appendChild(el);

      var dur = CFG.rippleDuration;
      var maxD = CFG.rippleMaxSize * scaleMul;
      var t0 = performance.now();

      function step(now) {
        var p = Math.min((now - t0) / dur, 1);
        var e = easeOutCubic(p);
        var d = startPx + (maxD - startPx) * e;

        el.style.width   = d + 'px';
        el.style.height  = d + 'px';
        el.style.opacity = (1 - p) * (scaleMul < 1.2 ? 1 : 0.6);

        if (p < 1) {
          requestAnimationFrame(step);
        } else {
          el.remove();
        }
      }
      requestAnimationFrame(step);
    }, delay);
  }

  /* ═══════════════════════════════════════════════════════
     9. MAKHANA PARTICLE BURST
  ═══════════════════════════════════════════════════════ */
  function spawnParticles(x, y) {
    if (activeCount > CFG.maxActive) return;

    var name  = nextPattern();
    var build = PATTERNS[name];

    // Ring & spiral look best with a few extra makhanas
    var extra = (name === 'ring' || name === 'spiral') ? 2 : 0;
    var count = randInt(CFG.particleCount[0], CFG.particleCount[1]) + extra;
    var base  = rand(0, Math.PI * 2);
    var slice = (Math.PI * 2) / count;

    for (var i = 0; i < count; i++) {
      (function (idx) {
        // Ring fires all at once (clean shockwave); others stagger slightly
        var delay = name === 'ring' ? 0 : idx * 18;

        setTimeout(function () {
          var sz   = rand(CFG.particleSize[0], CFG.particleSize[1]);
          var dur  = rand(CFG.particleDuration[0], CFG.particleDuration[1]);
          var dist = rand(CFG.particleDist[0], CFG.particleDist[1]);

          var el   = makeMakhana(x, y, sz);
          var calc = build({ idx: idx, count: count, slice: slice, base: base, dist: dist });
          animate(el, dur, calc);
        }, delay);
      })(i);
    }
  }

  /* ═══════════════════════════════════════════════════════
     10. CURSOR CRUMB TRAIL  (desktop only)
         Tiny makhana crumbs that drop behind a moving cursor
  ═══════════════════════════════════════════════════════ */
  function maybeSpawnTrail(x, y) {
    var now = performance.now();
    var dx = x - lastTrailX, dy = y - lastTrailY;
    if (now - lastTrailT < CFG.trailEveryMs) return;
    if (dx * dx + dy * dy < CFG.trailEveryPx * CFG.trailEveryPx) return;
    if (activeCount > CFG.maxActive) return;

    lastTrailX = x; lastTrailY = y; lastTrailT = now;

    var sz  = rand(CFG.trailSize[0], CFG.trailSize[1]);
    var dur = rand(CFG.trailDuration[0], CFG.trailDuration[1]);
    var el  = makeMakhana(x + rand(-4, 4), y + rand(-4, 4), sz);
    var drift = rand(-8, 8), fall = rand(10, 22), rot = rand(-120, 120);

    animate(el, dur, function (p) {
      var s = p < 0.2 ? p / 0.2 : 1 - 0.55 * ((p - 0.2) / 0.8);
      return {
        x: drift * p,
        y: fall * p * p,
        r: rot * p,
        s: s,
        o: (p < 0.2 ? p / 0.2 : 1 - (p - 0.2) / 0.8) * 0.85
      };
    });
  }

  /* ═══════════════════════════════════════════════════════
     11. CLICK HANDLER  (mouse + touch)
  ═══════════════════════════════════════════════════════ */
  var lastFire = 0;

  function handleClick(x, y) {
    if (REDUCED_MOTION) return;

    // Prevent double fire on mobile (touchend + synthetic click)
    var now = performance.now();
    if (now - lastFire < 350) return;
    lastFire = now;

    // Cursor click pulse (desktop)
    if (cursorEl) {
      cursorEl.classList.add('mpfx-cursor--click');
      setTimeout(function () {
        cursorEl.classList.remove('mpfx-cursor--click');
      }, 190);
    }

    spawnRipple(x, y, 0, 1);
    spawnRipple(x, y, 90, 1.55);   // soft second ring
    spawnParticles(x, y);
  }

  // Mouse click
  document.addEventListener('click', function (e) {
    handleClick(e.clientX, e.clientY);
  }, { passive: true });

  // Touch tap (mobile)
  if (IS_MOBILE) {
    document.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches.length) {
        var t = e.changedTouches[0];
        handleClick(t.clientX, t.clientY);
      }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════
     12. REDUCED MOTION FALLBACK
         If user prefers reduced motion: skip everything,
         but still show a minimal, instant ripple flash
  ═══════════════════════════════════════════════════════ */
  if (REDUCED_MOTION) {
    if (styleEl)  styleEl.remove();
    if (cursorEl) cursorEl.remove();

    document.addEventListener('click', function (e) {
      var el = document.createElement('div');
      el.style.cssText =
        'position:fixed;pointer-events:none;z-index:9999999;border-radius:50%;' +
        'border:1px solid rgba(201,164,92,0.4);width:6px;height:6px;' +
        'left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
        'transform:translate(-50%,-50%);transition:all 0.4s ease;opacity:1;';
      document.body.appendChild(el);
      setTimeout(function () {
        el.style.width   = '36px';
        el.style.height  = '36px';
        el.style.opacity = '0';
        setTimeout(function () { el.remove(); }, 420);
      }, 10);
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════════
     13. RESPONSIVE UPDATE on resize
  ═══════════════════════════════════════════════════════ */
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      var nowMobile = window.innerWidth < 768;
      if (nowMobile !== IS_MOBILE) {
        CFG.particleCount = nowMobile ? [4, 6]  : [7, 10];
        CFG.particleDist  = nowMobile ? [22, 48] : [32, 72];
        CFG.particleSize  = nowMobile ? [5, 10]  : [6, 13];
      }
    }, 300);
  }, { passive: true });

})();