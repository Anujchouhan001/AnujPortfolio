export function initializePortfolioEffects() {
  const cleanupTasks = [];
  const observers = [];
  const intervals = [];
  const timeouts = [];
  const previousTogglePaperFold = window.togglePaperFold;

  let cursorAnimationFrame = null;
  let navbarAnimationFrame = null;
  let isUnfolding = false;
  let foldTimeout = null;

  const addListener = (target, eventName, handler, options) => {
    if (!target) return;
    target.addEventListener(eventName, handler, options);
    cleanupTasks.push(() => target.removeEventListener(eventName, handler, options));
  };

  const addObserver = (observer) => {
    observers.push(observer);
    return observer;
  };

  const addInterval = (timerId) => {
    intervals.push(timerId);
    return timerId;
  };

  const addTimeout = (timerId) => {
    timeouts.push(timerId);
    return timerId;
  };

  const initCursorGlow = () => {
    const cursorGlow = document.getElementById("cursorGlow");
    if (!cursorGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    const onMouseMove = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };

    const animateGlow = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;

      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;

      cursorAnimationFrame = window.requestAnimationFrame(animateGlow);
    };

    addListener(document, "mousemove", onMouseMove);
    animateGlow();
  };

  const initScrollAnimations = () => {
    const animatables = document.querySelectorAll(".animate-on-scroll");
    if (!animatables.length) return;

    if (!("IntersectionObserver" in window)) {
      animatables.forEach((element) => element.classList.add("visible"));
      return;
    }

    const observer = addObserver(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
            }
          });
        },
        {
          root: null,
          rootMargin: "0px 0px -80px 0px",
          threshold: 0.1,
        },
      ),
    );

    animatables.forEach((element) => observer.observe(element));
  };

  const initParticles = () => {
    const container = document.getElementById("heroParticles");
    if (!container) return;

    container.innerHTML = "";

    const particleCount = 30;
    for (let index = 0; index < particleCount; index += 1) {
      const particle = document.createElement("div");
      particle.classList.add("particle");

      const x = Math.random() * 100;
      const size = Math.random() * 3 + 1;
      const duration = Math.random() * 15 + 10;
      const delay = Math.random() * 15;
      const opacity = Math.random() * 0.3 + 0.05;

      particle.style.left = `${x}%`;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.setProperty("--duration", `${duration}s`);
      particle.style.animationDelay = `${delay}s`;
      particle.style.opacity = String(opacity);

      container.appendChild(particle);
    }
  };

  const initNavbar = () => {
    const navbar = document.getElementById("navbar");
    const navInner = navbar?.querySelector(".nav-inner");
    if (!navbar || !navInner) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      navbarAnimationFrame = window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 50) {
          navInner.style.background = "rgba(255, 255, 255, 0.08)";
        } else {
          navInner.style.background = "rgba(255, 255, 255, 0.05)";
        }

        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          navbar.style.transform = "translateX(-50%) translateY(-100px)";
        } else {
          navbar.style.transform = "translateX(-50%) translateY(0)";
        }
        navbar.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";

        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    addListener(window, "scroll", onScroll, { passive: true });
  };

  const initMobileMenu = () => {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    if (!hamburger || !mobileMenu) return;

    const onHamburgerClick = () => {
      hamburger.classList.toggle("active");
      mobileMenu.classList.toggle("active");
      document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : "";
    };

    addListener(hamburger, "click", onHamburgerClick);

    mobileMenu.querySelectorAll(".mobile-link").forEach((link) => {
      addListener(link, "click", () => {
        hamburger.classList.remove("active");
        mobileMenu.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  };

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      addListener(anchor, "click", (event) => {
        const targetId = anchor.getAttribute("href");
        if (!targetId) return;

        const target = document.querySelector(targetId);
        if (!target) return;

        event.preventDefault();
        const offsetTop = target.offsetTop - 80;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      });
    });
  };

  const initStickyCards = () => {
    const cards = document.querySelectorAll(".project-card");
    if (!cards.length) return;

    const isMobileLayout = () => window.innerWidth <= 767;

    const resetCardTransforms = () => {
      cards.forEach((card) => {
        card.style.transform = "none";
        card.style.zIndex = "";
        card.style.transformOrigin = "";

        const mockup = card.querySelector(".project-mockup");
        if (mockup) {
          mockup.style.transform = "none";
        }
      });
    };

    if (isMobileLayout()) {
      resetCardTransforms();
    }

    if ("IntersectionObserver" in window) {
      const observer = addObserver(
        new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
              }
            });
          },
          { threshold: 0.2 },
        ),
      );
      cards.forEach((card) => observer.observe(card));
    }

    const onScroll = () => {
      if (isMobileLayout()) {
        resetCardTransforms();
        return;
      }

      const viewportHeight = window.innerHeight;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const stickyTop = 100 + index * 20;

        let targetScale = 1;
        let targetTranslateY = 0;

        if (rect.top <= stickyTop + 2) {
          let stackedProgress = 0;

          for (let nextIndex = index + 1; nextIndex < cards.length; nextIndex += 1) {
            const nextCard = cards[nextIndex];
            const nextRect = nextCard.getBoundingClientRect();
            const nextStickyTop = 100 + nextIndex * 20;
            const slideDistance = viewportHeight * 0.35;
            const distanceToNextStick = nextRect.top - nextStickyTop;

            if (distanceToNextStick <= 0) {
              stackedProgress += 1;
            } else if (distanceToNextStick < slideDistance) {
              stackedProgress += 1 - distanceToNextStick / slideDistance;
            }
          }

          const visualDepth = Math.min(stackedProgress, 4);
          targetTranslateY = -(visualDepth * 20);
          targetScale = 1 - visualDepth * 0.04;
        }

        card.style.zIndex = String(index + 1);
        card.style.transform = `translateY(${targetTranslateY}px) scale(${targetScale}) translateZ(0)`;
        card.style.transformOrigin = "top center";

        const mockup = card.querySelector(".project-mockup");
        if (mockup && rect.top < viewportHeight && rect.bottom > 0) {
          const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
          const translateY = (progress - 0.5) * 20;
          mockup.style.transform = `translateY(${translateY}px)`;
        }
      });
    };

    addListener(window, "scroll", onScroll, { passive: true });
    addListener(window, "resize", onScroll, { passive: true });
    onScroll();
  };

  const initActiveNavLinks = () => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");
    if (!sections.length || !navLinks.length) return;

    const onScroll = () => {
      let currentSection = "";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          currentSection = section.getAttribute("id") || "";
        }
      });

      navLinks.forEach((link) => {
        link.style.color = "";
        link.style.background = "";
        if (link.getAttribute("href") === `#${currentSection}`) {
          link.style.color = "#ffffff";
          link.style.background = "rgba(255, 255, 255, 0.08)";
        }
      });
    };

    addListener(window, "scroll", onScroll, { passive: true });
    onScroll();
  };

  const initTiltEffect = () => {
    if (window.innerWidth <= 767 || window.matchMedia("(hover: none)").matches) {
      return;
    }

    const cards = document.querySelectorAll(".project-card");

    cards.forEach((card) => {
      const inner = card.querySelector(".project-card-inner");
      if (!inner) return;

      const onMouseMove = (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -2;
        const rotateY = ((x - centerX) / centerX) * 2;

        inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      };

      const onMouseLeave = () => {
        inner.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
        inner.style.transition = "transform 0.5s ease";
      };

      const onMouseEnter = () => {
        inner.style.transition = "none";
      };

      addListener(card, "mousemove", onMouseMove);
      addListener(card, "mouseleave", onMouseLeave);
      addListener(card, "mouseenter", onMouseEnter);
    });
  };

  const initCounterAnimation = () => {
    const statNumbers = document.querySelectorAll(".stat-number");
    if (!statNumbers.length || !("IntersectionObserver" in window)) return;

    const observer = addObserver(
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target;
            const text = element.textContent?.trim() || "";
            const numMatch = text.match(/\d+/);

            if (numMatch) {
              const target = Number.parseInt(numMatch[0], 10);
              const prefix = text.slice(0, text.indexOf(numMatch[0]));
              const suffix = text.slice(text.indexOf(numMatch[0]) + numMatch[0].length);
              let current = 0;

              const duration = 1000;
              const steps = 60;
              const increment = target / steps;
              const interval = duration / steps;

              const timerId = addInterval(
                window.setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    current = target;
                    window.clearInterval(timerId);
                  }

                  element.textContent = `${prefix}${Math.floor(current)}${suffix}`;
                }, interval),
              );
            }

            observer.unobserve(element);
          });
        },
        { threshold: 0.5 },
      ),
    );

    statNumbers.forEach((element) => observer.observe(element));
  };

    const initResumeFold = () => {
      const togglePaperFold = () => {
        const container = document.getElementById("paperFoldContainer");
        const btnText = document.getElementById("unfoldBtnText");
        if (!container || isUnfolding) return;
  
        if (container.classList.contains("unfolded")) {
          container.classList.remove("unfolded", "animating");
          if (btnText) btnText.textContent = "Unfold Resume";
  
          const panels = container.querySelectorAll(".map-panel, .map-fold-display");
          panels.forEach((panel) => {
            panel.style.animation = "none";
            void panel.offsetHeight;
            panel.style.animation = "";
          });
  
          if (foldTimeout) {
            window.clearTimeout(foldTimeout);
            foldTimeout = null;
          }
  
          isUnfolding = false;
        } else {
          isUnfolding = true;
          container.classList.add("animating");
  
          foldTimeout = addTimeout(
            window.setTimeout(() => {
              container.classList.add("unfolded");
              isUnfolding = false;
              if (btnText) btnText.textContent = "Fold Resume";
            }, 2000),
          );
        }
      };


    window.togglePaperFold = togglePaperFold;

    const foldDisplay = document.getElementById("foldDisplay");
    if (foldDisplay) {
      addListener(foldDisplay, "click", togglePaperFold);
    }
  };

  const initPendulum2D = () => {
    const scene = document.getElementById('hero3dScene');
    const hero = document.getElementById('hero');
    const svg = document.getElementById('pendulumSvg');
    if (!scene || !hero || !svg) return;

    // ── 2D spring physics state ──────────────────────────────
    let cx = 0, cy = 0;     // current X, Y offset from rest position
    let vx = 0, vy = 0;     // velocity

    // DAMP_X is high → many oscillations before settling (smooth pendulum feel)
    const DAMP_X = 0.984;
    const DAMP_Y = 0.918;
    const SPR_X = 0.055;   // gentle horizontal spring (slow, pendulum-like)
    const SPR_Y = 0.11;    // slightly stiffer vertical (gravity-like return)
    const MAX_X = 140;     // px: how far horizontally card can swing
    const MAX_Y = 90;      // px: how far vertically card can drift
    const BOTTOM_BUFFER = 16; // keeps card safely above hero section bottom edge
    const BOTTOM_SOFT_ZONE = 72; // start easing before hard limit to avoid abrupt stops

    let raf = null;

    // ── Build SVG string ─────────────────────────────────────
    const ns = 'http://www.w3.org/2000/svg';

    // Gradient: transparent at top (behind navbar → invisible origin),
    // solidifies toward card
    const defs = document.createElementNS(ns, 'defs');
    const grad = document.createElementNS(ns, 'linearGradient');
    grad.setAttribute('id', 'pendGrad');
    grad.setAttribute('gradientUnits', 'userSpaceOnUse');
    grad.setAttribute('x1', '0'); grad.setAttribute('y1', '0');
    grad.setAttribute('x2', '0'); grad.setAttribute('y2', '1'); // updated per frame
    [
      ['0%', 'rgba(167,139,250,0)'],
      ['18%', 'rgba(167,139,250,0)'],
      ['42%', 'rgba(167,139,250,0.35)'],
      ['75%', 'rgba(167,139,250,0.72)'],
      ['100%', 'rgba(167,139,250,0.95)'],
    ].forEach(([offset, color]) => {
      const s = document.createElementNS(ns, 'stop');
      s.setAttribute('offset', offset);
      s.setAttribute('stop-color', color);
      grad.appendChild(s);
    });
    defs.appendChild(grad);
    svg.appendChild(defs);

    // Main string path — cubic bezier for natural flex
    const stringPath = document.createElementNS(ns, 'path');
    stringPath.setAttribute('fill', 'none');
    stringPath.setAttribute('stroke', 'url(#pendGrad)');
    stringPath.setAttribute('stroke-width', '1.8');
    stringPath.setAttribute('stroke-linecap', 'round');
    svg.appendChild(stringPath);

    // Tiny glowing dot where string meets card top
    const dot = document.createElementNS(ns, 'circle');
    dot.setAttribute('r', '3.5');
    dot.setAttribute('fill', 'rgba(167,139,250,0.85)');
    dot.setAttribute('filter', 'url(#dotBlur)');
    // blur filter for glow
    const filt = document.createElementNS(ns, 'filter');
    filt.setAttribute('id', 'dotBlur');
    const feGauss = document.createElementNS(ns, 'feGaussianBlur');
    feGauss.setAttribute('stdDeviation', '2');
    filt.appendChild(feGauss);
    defs.appendChild(filt);
    svg.appendChild(dot);

    // ── String update with cubic bezier ─────────────────────
    const updateString = () => {
      const r = scene.getBoundingClientRect();

      // Anchor: horizontally centred above card, at very top of viewport (y=0)
      // The navbar sits at y=0 so this point is invisible behind it
      const ax = r.left + r.width / 2;
      const ay = 0;

      // Card attachment: top-centre of the card in its current position
      const cx2 = r.left + r.width / 2;
      const cy2 = r.top + 4;          // just inside top edge of card

      const strLen = cy2 - ay;

      // Two control points for cubic bezier — create S-curve flex when swinging
      // CP1 stays near anchor, CP2 bends toward the card's lean
      const cp1x = ax + cx * 0.08;               // barely moves near anchor
      const cp1y = ay + strLen * 0.30;
      const cp2x = cx2 + cx * 0.45;              // heavy flex near card
      const cp2y = cy2 - strLen * 0.20;

      const d = `M ${ax} ${ay} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${cx2} ${cy2}`;
      stringPath.setAttribute('d', d);

      // Update gradient endpoints for correct top-to-bottom fade
      grad.setAttribute('y1', String(ay));
      grad.setAttribute('y2', String(cy2));
      grad.setAttribute('x1', String(ax));
      grad.setAttribute('x2', String(ax));

      // Glowing dot follows card top
      dot.setAttribute('cx', String(cx2));
      dot.setAttribute('cy', String(cy2));
    };

    // ── Load entrance: Bungee Drop ───────────────
    // Drops from completely off-screen top
    cx = 10; cy = -800;
    vx = 0; vy = 0;

    // ── Physics tick ─────────────────────────────────────────
    let isScrolling = false;
    let scrollTimeout = null;

    const tick = () => {
      if (!isScrolling) {
        // Normal spring force pulling back strictly to center (0, 0)
        // This is the "Arrow Release" physics
        vx = (vx + (0 - cx) * SPR_X) * DAMP_X;
        vy = (vy + (0 - cy) * SPR_Y) * DAMP_Y;

        // Add a continuous levitation (bobbing) effect
        const t = Date.now() / 1000;
        vy += Math.sin(t * 1.4) * 0.15; // gentle vertical breathing
        vx += Math.cos(t * 1.1) * 0.05; // very gentle horizontal drift
        
        cx += vx;
        cy += vy;
      } else {
        // While pulling the bow (scrolling), freeze restoring spring
        // Apply heavy friction to velocity so momentum dies off quickly
        vx *= 0.5;
        vy *= 0.5;
        cx += vx;
        cy += vy;
      }

      // Soft constraints just to prevent absurd infinite explosions
      if (cx > 1000) { cx = 1000; vx *= -0.25; }
      if (cx < -1000) { cx = -1000; vx *= -0.25; }
      if (cy > 1000) { cy = 1000; vy *= -0.25; }
      if (cy < -1200) { cy = -1200; vy *= -0.25; }

      // Section endpoint: progressively resist downward motion near hero bottom,
      // then hard clamp exactly at the bottom boundary so card never drops below.
      const heroRect = hero.getBoundingClientRect();
      const sceneRect = scene.getBoundingClientRect();
      const bottomLimit = heroRect.bottom - BOTTOM_BUFFER;
      const distanceToBottom = bottomLimit - sceneRect.bottom;

      if (distanceToBottom < BOTTOM_SOFT_ZONE && vy > 0) {
        const t = Math.max(0, Math.min(1, distanceToBottom / BOTTOM_SOFT_ZONE));
        const resistance = 0.35 + t * 0.65;
        vy *= resistance;
      }

      if (sceneRect.bottom > bottomLimit) {
        const overflow = sceneRect.bottom - bottomLimit;
        cy -= overflow;
        if (vy > 0) vy *= -0.18;
      }

      // Natural lean: card tilts slightly in the direction it swings
      const tilt = cx * 0.055;                 
      const tiltFwd = -Math.abs(cx) * 0.008;      

      scene.style.transform =
        `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px) ` +
        `rotateZ(${tilt.toFixed(3)}deg) ` +
        `rotateX(${tiltFwd.toFixed(3)}deg)`;

      updateString();
      raf = requestAnimationFrame(tick);
    };

    tick();

    // ── Interaction: push based on cursor speed over CARD ───
    let lastMouseX = null;
    let lastMouseY = null;
    let mouseVx = 0;
    let mouseVy = 0;

    const trackMouse = (e) => {
      if (lastMouseX !== null) {
        mouseVx = e.clientX - lastMouseX;
        mouseVy = e.clientY - lastMouseY;
      }
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onCardHover = (e) => {
      vx += mouseVx * 0.1;
      vy += mouseVy * 0.1;

      const rect = scene.getBoundingClientRect();
      const cx_card = rect.left + rect.width / 2;
      const cy_card = rect.top + rect.height / 2;
      vx += (e.clientX - cx_card) * 0.012;
      vy += (e.clientY - cy_card) * 0.012;
    };

    // ── Arrow Bow Scroll Effect ───
    let lastScrollY_local = window.scrollY;
    const trackScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDy = currentScrollY - lastScrollY_local;
      lastScrollY_local = currentScrollY;
      
      // Pull the bow string: card tracks scroll exact viewport delta
      cy += scrollDy * 0.9; 
      
      isScrolling = true;
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      
      // Release fingers triggers the string snap back
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    addListener(window, 'mousemove', trackMouse);
    addListener(scene, 'mousemove', onCardHover);
    addListener(scene, 'mouseenter', onCardHover);
    addListener(window, 'scroll', trackScroll, { passive: true });

    // Cleanup RAF on unmount
    cleanupTasks.push(() => {
      if (raf !== null) cancelAnimationFrame(raf);
    });
  };


  initCursorGlow();
  initScrollAnimations();
  initParticles();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initStickyCards();
  initActiveNavLinks();
  initTiltEffect();
  initCounterAnimation();
  initResumeFold();
  initPendulum2D();


  return () => {
    cleanupTasks.forEach((cleanup) => cleanup());
    observers.forEach((observer) => observer.disconnect());
    intervals.forEach((timerId) => window.clearInterval(timerId));
    timeouts.forEach((timerId) => window.clearTimeout(timerId));

    if (cursorAnimationFrame !== null) {
      window.cancelAnimationFrame(cursorAnimationFrame);
    }
    if (navbarAnimationFrame !== null) {
      window.cancelAnimationFrame(navbarAnimationFrame);
    }
    if (foldTimeout) {
      window.clearTimeout(foldTimeout);
    }

    document.body.style.overflow = "";

    if (typeof previousTogglePaperFold === "function") {
      window.togglePaperFold = previousTogglePaperFold;
    } else {
      delete window.togglePaperFold;
    }
  };
}
