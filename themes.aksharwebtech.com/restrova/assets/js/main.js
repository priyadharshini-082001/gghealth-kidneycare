// Hero
function animateIfExists(selector, animation) {
    if (document.querySelector(selector)) {
        gsap.from(selector, animation);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Staggered entrance for hero content
    animateIfExists(".hero-badge", { opacity: 0, y: 30, duration: 0.7, delay: 0.2, ease: "power3.out" });
    animateIfExists(".hero-title", { opacity: 0, y: 50, duration: 0.8, delay: 0.4, ease: "power3.out" });
    animateIfExists(".hero-desc", { opacity: 0, y: 30, duration: 0.7, delay: 0.6, ease: "power3.out" });
    animateIfExists(".hero-actions", { opacity: 0, y: 30, duration: 0.7, delay: 0.75, ease: "power3.out" });
    animateIfExists(".hero-stats", { opacity: 0, y: 20, duration: 0.7, delay: 0.9, ease: "power3.out" });
    // Pizza plate entrance
    animateIfExists(".hero-pizza", { opacity: 0, scale: 0.6, rotation: -15, duration: 1, delay: 0.5, ease: "back.out(1.4)" });
    animateIfExists(".plate-ring", { opacity: 0, scale: 0.5, duration: 0.8, delay: 0.8, ease: "power2.out" });
    animateIfExists(".ring-2", { opacity: 0, scale: 0.5, duration: 0.8, delay: 1.0, ease: "power2.out" });
    // Food badges entrance
    animateIfExists(".badge-top-right", { opacity: 0, x: 40, duration: 0.7, delay: 1.1, ease: "back.out(1.7)" });
    animateIfExists(".badge-bottom-left", { opacity: 0, x: -40, duration: 0.7, delay: 1.2, ease: "back.out(1.7)" });
    animateIfExists(".badge-top-left", { opacity: 0, x: -40, duration: 0.7, delay: 1.3, ease: "back.out(1.7)" });
    // Shapes entrance
    animateIfExists(".hero-shape", { opacity: 0, scale: 0.3, duration: 1, delay: 0.3, stagger: 0.15, ease: "back.out(1.4)" });
    // Parallax on Mouse Move
    const hero = document.querySelector(".hero-section");
    const shapes = document.querySelectorAll(".hero-shape");
    const orbs = document.querySelectorAll(".hero-orb");

    if (hero) {
        hero.addEventListener("mousemove", function (e) {
            const cx = hero.offsetWidth / 2;
            const cy = hero.offsetHeight / 2;
            const dx = (e.clientX - cx) / cx;
            const dy = (e.clientY - cy) / cy;

            shapes.forEach(function (shape, i) {
                const depth = (i % 3 + 1) * 12;
                gsap.to(shape, {
                    x: dx * depth,
                    y: dy * depth,
                    duration: 0.8,
                    ease: "power1.out"
                });
            });

            orbs.forEach(function (orb, i) {
                const depth = (i + 1) * 20;
                gsap.to(orb, {
                    x: dx * depth,
                    y: dy * depth,
                    duration: 1.2,
                    ease: "power1.out"
                });
            });
        });

        hero.addEventListener("mouseleave", function () {
            gsap.to(shapes, { x: 0, y: 0, duration: 1, ease: "power2.out" });
            gsap.to(orbs, { x: 0, y: 0, duration: 1, ease: "power2.out" });
        });
    }

});

// Mobile dropdown accordion
document.querySelectorAll('.has-dropdown > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        if (window.innerWidth < 992) {
            e.preventDefault();
            var parent = this.closest('.has-dropdown');
            var isOpen = parent.classList.contains('mobile-open');
            // Close all
            document.querySelectorAll('.has-dropdown.mobile-open').forEach(function (el) {
                el.classList.remove('mobile-open');
            });
            // Toggle clicked
            if (!isOpen) parent.classList.add('mobile-open');
        }
    });
});
// Close mobile menu dropdowns when menu collapses
const menuCollapse = document.getElementById('menu');
if (menuCollapse) {
    menuCollapse.addEventListener('hide.bs.collapse', function () {
        document.querySelectorAll('.has-dropdown.mobile-open').forEach(function (el) {
            el.classList.remove('mobile-open');
        });
    });
}
// Scroll to Top Button
const scrollTopBtn = document.getElementById('footerScrollTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

(function () {
    'use strict';
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
        });
    }
    var loader = document.getElementById('loader');
    var wrapper = document.querySelector('.overflow-wrapper');
    function hideLoader() {
        if (loader) loader.classList.add('hide');
        if (wrapper) wrapper.classList.add('show');
    }
    var minWait = new Promise(function (r) { setTimeout(r, 2200); });
    var pageLoad = new Promise(function (r) {
        if (document.readyState === 'complete') r();
        else window.addEventListener('load', r);
    });
    Promise.all([minWait, pageLoad]).then(hideLoader);
    // Animated counters
    function animCounter(el, target, suffix, dur) {
        dur = dur || 1800;
        var s = null;
        function step(ts) {
            if (!s) s = ts;
            var p = Math.min((ts - s) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    var statsStrip = document.querySelector('.stats-strip');
    if (statsStrip && 'IntersectionObserver' in window) {
        var statsObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
                        animCounter(el, +el.dataset.target, el.dataset.suffix || '');
                    });
                    statsObs.disconnect();
                }
            });
        }, { threshold: 0.5 });
        statsObs.observe(statsStrip);
    }
    // Drag-to-scroll track
    var track = document.getElementById('catTrack');
    if (track) {
        var isDown = false, startX, scrollLeft, hasDragged = false;
        track.addEventListener('mousedown', function (e) {
            isDown = true;
            hasDragged = false;
            track.classList.add('grabbing');
            startX = e.pageX;
            scrollLeft = track.scrollLeft;
            e.preventDefault();
        });
        document.addEventListener('mouseup', function () {
            if (!isDown) return;
            isDown = false;
            track.classList.remove('grabbing');
        });
        document.addEventListener('mousemove', function (e) {
            if (!isDown) return;
            var dx = e.pageX - startX;
            if (Math.abs(dx) > 4) hasDragged = true;
            track.scrollLeft = scrollLeft - dx;
        });
        track.addEventListener('click', function (e) {
            if (hasDragged) {
                e.preventDefault();
                e.stopPropagation();
                hasDragged = false;
            }
        }, true);
        var touchStartX = 0, touchScrollLeft = 0;
        track.addEventListener('touchstart', function (e) {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = track.scrollLeft;
        }, { passive: true });
        track.addEventListener('touchmove', function (e) {
            var dx = e.touches[0].pageX - touchStartX;
            track.scrollLeft = touchScrollLeft - dx;
        }, { passive: true });
    }
    // Arrow buttons
    var prevBtn = document.getElementById('prevBtn');
    var nextBtn = document.getElementById('nextBtn');
    if (prevBtn && track) prevBtn.addEventListener('click', function () { track.scrollBy({ left: -320, behavior: 'smooth' }); });
    if (nextBtn && track) nextBtn.addEventListener('click', function () { track.scrollBy({ left: 320, behavior: 'smooth' }); });
    // Animated counters
    function animCounter(el, target, suffix, dur) {
        dur = dur || 1800;
        var s = null;
        (function step(ts) {
            if (!s) s = ts;
            var p = Math.min((ts - s) / dur, 1);
            var eased = 1 - Math.pow(1 - p, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(step);
        })(performance.now());
    }
    var band = document.querySelector('.stats-band');
    if (band && 'IntersectionObserver' in window) {
        var sObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    document.querySelectorAll('.sb-num').forEach(function (el) {
                        if (el && el.dataset.target) animCounter(el, +el.dataset.target, el.dataset.suffix || '');
                    });
                    sObs.disconnect();
                }
            });
        }, { threshold: 0.4 });
        sObs.observe(band);
    }
    // Spine glow fill on scroll
    (function () {
        var glow = document.getElementById('hsSpineGlow');
        var tl = document.querySelector('.hs-timeline');
        if (!glow || !tl) return;
        function update() {
            var r = tl.getBoundingClientRect(), wh = window.innerHeight;
            var prog = (wh * 0.9 - r.top) / (r.height + wh * 0.6);
            glow.style.height = Math.max(0, Math.min(1, prog)) * 100 + '%';
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    }());
    // Animated counters (ribbon)
    (function () {
        var ribbon = document.querySelector('.hs-ribbon');
        if (!ribbon) return;
        function anim(el, target, dur) {
            dur = dur || 1800; var s = null;
            (function step(ts) {
                if (!s) s = ts;
                var p = Math.min((ts - s) / dur, 1), e = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(e * target);
                if (p < 1) requestAnimationFrame(step);
            }(performance.now()));
        }
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    ribbon.querySelectorAll('.sr-num[data-target]').forEach(function (el) {
                        anim(el, +el.dataset.target);
                    });
                    obs.disconnect();
                }
            });
        }, { threshold: 0.5 });
        obs.observe(ribbon);
    }());

    // Cursor glow follow on cards
    document.querySelectorAll('.hs-card').forEach(function (card) {
        card.addEventListener('mousemove', function (e) {
            var r = card.getBoundingClientRect();
            var glow = card.querySelector('.card-corner-glow');
            if (glow) { glow.style.left = (e.clientX - r.left - 60) + 'px'; glow.style.top = (e.clientY - r.top - 60) + 'px'; }
        });
    });

})();

// menu tabs
document.querySelectorAll('.filter-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.tab;
        document.querySelectorAll('.menu-panel').forEach(function (p) { p.classList.remove('active'); });
        var target = document.getElementById('panel-' + cat);
        if (target) {
            target.classList.add('active');
            target.querySelectorAll('.sr').forEach(function (el) { el.classList.remove('visible'); });
            setTimeout(function () {
                target.querySelectorAll('.sr').forEach(function (el, i) {
                    setTimeout(function () { el.classList.add('visible'); }, i * 70);
                });
            }, 30);
        }
    });
});

// testimonial slider
(function () {
    var wrap = document.querySelector('.testi-slider-wrap');
    var track = document.getElementById('testiTrack');
    var dotsEl = document.getElementById('testiDots');
    var prevBtn = document.getElementById('testiPrev');
    var nextBtn = document.getElementById('testiNext');
    if (!track || !wrap) return;

    var cards = Array.from(track.querySelectorAll('.testi-card'));
    var total = cards.length;
    var current = 0;
    var GAP = 24;
    var timer;

    function perView() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
    }

    function maxPage() { return Math.ceil(total / perView()); }

    function setCardWidths() {
        var pv = perView();
        var availableWidth = wrap.offsetWidth - 20;
        var cardW = (availableWidth - GAP * (pv - 1)) / pv;
        cards.forEach(function (c) { c.style.width = cardW + 'px'; });
    }

    function buildDots() {
        dotsEl.innerHTML = '';
        var pages = maxPage();
        for (var i = 0; i < pages; i++) {
            (function (idx) {
                var btn = document.createElement('button');
                btn.className = 'testi-dot' + (idx === 0 ? ' active' : '');
                btn.setAttribute('aria-label', 'Slide ' + (idx + 1));
                btn.addEventListener('click', function () { goTo(idx); });
                dotsEl.appendChild(btn);
            })(i);
        }
    }

    function goTo(idx) {
        var pages = maxPage();
        current = (idx + pages) % pages;
        var pv = perView();
        var cardW = cards[0].offsetWidth;
        var offset = current * pv * (cardW + GAP);
        var maxOffset = (total - pv) * (cardW + GAP);
        track.style.transform = 'translateX(-' + Math.min(offset, maxOffset) + 'px)';
        dotsEl.querySelectorAll('.testi-dot').forEach(function (d, i) {
            d.classList.toggle('active', i === current);
        });
    }

    function startTimer() {
        clearInterval(timer);
        timer = setInterval(function () { goTo(current + 1); }, 5000);
    }

    prevBtn.addEventListener('click', function () { goTo(current - 1); startTimer(); });
    nextBtn.addEventListener('click', function () { goTo(current + 1); startTimer(); });

    track.addEventListener('mouseenter', function () { clearInterval(timer); });
    track.addEventListener('mouseleave', startTimer);

    var tx = 0;
    track.addEventListener('touchstart', function (e) { tx = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', function (e) {
        var dx = tx - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 40) { goTo(dx > 0 ? current + 1 : current - 1); startTimer(); }
    });

    window.addEventListener('resize', function () {
        current = 0;
        setCardWidths();
        buildDots();
        goTo(0);
    });

    setCardWidths();
    buildDots();
    startTimer();
}());

/* COUNTDOWN */
document.addEventListener("DOMContentLoaded", function () {
    let end = Date.now() + (8 * 3600 + 47 * 60 + 30) * 1000;
    (function tick() {
        const diff = Math.max(0, Math.floor((end - Date.now()) / 1000));
        const h = document.getElementById('cdH');
        const m = document.getElementById('cdM');
        const s = document.getElementById('cdS');
        if (h && m && s) {
            h.textContent = String(Math.floor(diff / 3600)).padStart(2, '0');
            m.textContent = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
            s.textContent = String(diff % 60).padStart(2, '0');
        }
        setTimeout(tick, 1000);
    })();
});

/* Menu Detail Tabs */
function switchTab(id, btn) {
    document.querySelectorAll('.dtab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.dtab-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('tab-' + id).classList.add('active');
}

/* FAQ ACCORDION */
function toggle(qEl) {
    const item = qEl.closest('.faq-item');
    const answer = item.querySelector('.faq-answer');
    const isOpen = item.classList.contains('open');
    const siblings = item.closest('.faq-list').querySelectorAll('.faq-item');
    siblings.forEach(s => {
        s.classList.remove('open');
        s.querySelector('.faq-answer').style.maxHeight = '0';
    });

    if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
    }
}

/* Animated counters in aboutus page */
function animCount(el) {
    const target = parseInt(el.dataset.target);
    const sup = el.querySelector('sup');
    const supText = sup ? sup.outerHTML : '';
    let current = 0;
    const step = Math.ceil(target / 40);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.innerHTML = current + supText;
        if (current >= target) clearInterval(timer);
    }, 30);
}
const cObs = new IntersectionObserver(e => {
    e.forEach(x => {
        if (x.isIntersecting) {
            x.target.querySelectorAll('.c-num[data-target]').forEach(animCount);
            cObs.unobserve(x.target);
        }
    });
}, { threshold: .3 });
document.querySelectorAll('.counters').forEach(el => cObs.observe(el));

/* Reservation page */

/* Live Clock */
function tick() {
    const clockTime = document.getElementById('clockTime');
    const clockDate = document.getElementById('clockDate');
    if (!clockTime || !clockDate) return;
    const n = new Date();
    clockTime.textContent = n.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    clockDate.textContent = n.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
}
if (document.getElementById('clockTime') && document.getElementById('clockDate')) {
    tick();
    setInterval(tick, 1000);
}

/* Select Time Slot */
function selectTime(el) {
    document.querySelectorAll('.ts').forEach(t => t.classList.remove('selected'));
    el.classList.add('selected');
    const slotText = el.querySelector('span');
    selectedTime = slotText ? slotText.textContent : null;
}
let selectedDate = null, selectedTime = null;

/* Date Picker */
let dpYear, dpMonth;
(function init() {
    const monthLabel = document.getElementById('dpMonthLabel');
    const grid = document.getElementById('dpGrid');
    if (!monthLabel || !grid) return;
    const n = new Date(); dpYear = n.getFullYear(); dpMonth = n.getMonth();
    renderDP();
})();

function renderDP() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const monthLabel = document.getElementById('dpMonthLabel');
    const grid = document.getElementById('dpGrid');
    if (!monthLabel || !grid) return;
    monthLabel.textContent = months[dpMonth] + ' ' + dpYear;
    grid.innerHTML = '';
    const first = new Date(dpYear, dpMonth, 1).getDay();
    const days = new Date(dpYear, dpMonth + 1, 0).getDate();
    const today = new Date();
    for (let i = 0; i < first; i++) { const c = document.createElement('div'); c.className = 'dp-cell empty'; grid.appendChild(c) }
    for (let d = 1; d <= days; d++) {
        const c = document.createElement('div'); c.className = 'dp-cell'; c.textContent = d;
        const cellDate = new Date(dpYear, dpMonth, d);
        const isToday = cellDate.toDateString() === today.toDateString();
        const isPast = cellDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
        if (isPast) { c.classList.add('disabled') }
        else {
            c.addEventListener('click', () => selectDay(c, d));
            if (isToday) c.classList.add('today');
            if (selectedDate && selectedDate.d === d && selectedDate.m === dpMonth && selectedDate.y === dpYear) c.classList.add('selected');
        }
        grid.appendChild(c);
    }
}
function dpNav(dir) {
    if (typeof dpMonth !== 'number' || typeof dpYear !== 'number') return;
    dpMonth += dir;
    if (dpMonth < 0) { dpMonth = 11; dpYear-- }
    if (dpMonth > 11) { dpMonth = 0; dpYear++ }
    renderDP();
}
function selectDay(el, d) {
    document.querySelectorAll('.dp-cell.selected').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    selectedDate = { d, m: dpMonth, y: dpYear };
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const selectedDateLabel = document.getElementById('dpSelectedDate');
    if (!selectedDateLabel) return;
    document.getElementById('dpSelectedDate').textContent = 'â€” ' + d + ' ' + months[dpMonth] + ' ' + dpYear;
}

/* Steps */
let curStep = 0;
function goStep(n) {
    const currentPanel = document.getElementById('panel' + curStep);
    if (!currentPanel) return;
    currentPanel.classList.remove('active');
    // mark step indicator
    const si = document.getElementById('si' + curStep);
    if (si) {
        si.classList.remove('active');
        if (n > curStep) si.classList.add('done');
        else si.classList.remove('done');
    }
    curStep = n;
    const nextPanel = document.getElementById('panel' + curStep);
    if (nextPanel) nextPanel.classList.add('active');
    const nextSi = document.getElementById('si' + curStep);
    if (nextSi) nextSi.classList.add('active');
    const rightPanel = document.getElementById('rightPanel');
    if (rightPanel) rightPanel.scrollTo({ top: 0, behavior: 'smooth' });
}

/***** SHOP PAGE ************/
(function () {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    const gridViewBtn = document.getElementById('gridViewBtn');
    const listViewBtn = document.getElementById('listViewBtn');
    const state = {
        cat: 'all',
        search: '',
        sort: 'featured',
        view: 'grid'
    };
    window.setView = function (view) {
        state.view = view;
        productsGrid.classList.toggle('list-view', view === 'list');
        if (gridViewBtn) gridViewBtn.classList.toggle('on', view === 'grid');
        if (listViewBtn) listViewBtn.classList.toggle('on', view === 'list');
    };
})();

/********* GALLERY FANCYBOX ***********/
document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector('[data-fancybox="gallery"]')) {
        Fancybox.bind('[data-fancybox="gallery"]', {
            Toolbar: {
                display: [
                    "zoom",
                    "slideshow",
                    "fullscreen",
                    "close"
                ]
            },
            Thumbs: {
                autoStart: true
            }
        });
    }
});

/********* HOMEPAGE 2 ***********/
document.addEventListener("DOMContentLoaded", function () {
    const header2 = document.getElementById("header2");
    const header2Toggle = document.getElementById("header2Toggle");
    const header2MobileMenu = document.getElementById("header2MobileMenu");
    const header2MobileOverlay = document.getElementById("header2MobileOverlay");
    const header2MobileClose = document.getElementById("header2MobileClose");
    if (header2) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 30) {
                header2.classList.add("scrolled");
            } else {
                header2.classList.remove("scrolled");
            }
        });
    }
    // Open Mobile Menu
    function openMobileMenu() {
        if (header2Toggle) header2Toggle.classList.add("active");
        if (header2MobileMenu) header2MobileMenu.classList.add("active");
        if (header2MobileOverlay) header2MobileOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }
    // Close Mobile Menu
    function closeMobileMenu() {
        if (header2Toggle) header2Toggle.classList.remove("active");
        if (header2MobileMenu) header2MobileMenu.classList.remove("active");
        if (header2MobileOverlay) header2MobileOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }
    if (header2Toggle) {
        header2Toggle.addEventListener("click", function () {
            if (header2MobileMenu && header2MobileMenu.classList.contains("active")) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    if (header2MobileClose) {
        header2MobileClose.addEventListener("click", closeMobileMenu);
    }
    if (header2MobileOverlay) {
        header2MobileOverlay.addEventListener("click", closeMobileMenu);
    }
    window.addEventListener("resize", function () {
        if (window.innerWidth > 991) {
            closeMobileMenu();
        }
    });
    // Mobile Submenu Toggle
    const submenuParents = document.querySelectorAll(".header2-mobile-has-submenu");
    submenuParents.forEach(function (item) {
        const toggleBtn = item.querySelector(".header2-mobile-submenu-toggle");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", function (e) {
                e.preventDefault();
                // close others (accordion style)
                submenuParents.forEach(function (otherItem) {
                    if (otherItem !== item) {
                        otherItem.classList.remove("active");
                    }
                });
                item.classList.toggle("active");
            });
        }
    });
    const mobileLinks = document.querySelectorAll(".header2-mobile-menu a");
    mobileLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (!link.closest(".header2-mobile-link-wrap")) {
                closeMobileMenu();
            }
        });
    });
});
// Testimonials filter
document.querySelectorAll('.tp-filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.tp-filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.tp-grid .tp-card').forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('tp-hidden');
            } else {
                card.classList.add('tp-hidden');
            }
        });
    });
});
// Payment tabs
document.querySelectorAll('.co-pay-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.co-pay-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.co-pay-panel').forEach(p => p.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab-' + this.dataset.tab).classList.add('active');
    });
});
// Delivery card selection
document.querySelectorAll('.co-delivery-card').forEach(card => {
    card.addEventListener('click', function () {
        document.querySelectorAll('.co-delivery-card').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
    });
});
// Fancybox our story video player
Fancybox.bind('[data-fancybox="video-story"]', {
    dragToClose: false,
    trapFocus: true,
    placeFocusBack: true,
    autoFocus: false,
    closeButton: "top",
    Toolbar: {
        display: {
            left: [],
            middle: [],
            right: ["close"]
        }
    },
    Thumbs: false,
    Html: {
        video: {
            autoplay: true,
            controls: true
        }
    },
    on: {
        reveal: () => {
            const video = document.querySelector('.fancybox__content video');
            if (video) {
                video.play().catch(() => { });
            }
        }
    }
});
// search overlay
(function () {
    'use strict';
    var overlay = document.getElementById('srchOverlay');
    var input = document.getElementById('srchInput');
    var trigger = document.getElementById('srchTrigger');
    function srchOpen() {
        overlay.classList.add('srch-open');
        document.body.style.overflow = 'hidden';
        setTimeout(function () { if (input) input.focus(); }, 360);
    }
    function srchClose() {
        overlay.classList.remove('srch-open');
        document.body.style.overflow = '';
    }
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('srch-open')) {
            srchClose();
        }
    });
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay || e.target.classList.contains('srch-backdrop')) {
            srchClose();
        }
    });
    window.srchOpen = srchOpen;
    window.srchClose = srchClose;
    if (trigger) {
        trigger.addEventListener('click', function (e) {
            e.preventDefault();
            srchOpen();
        });
    }
    var existingSearchIcon = document.querySelector('.search-icon');
    if (existingSearchIcon && existingSearchIcon !== trigger) {
        existingSearchIcon.addEventListener('click', function (e) {
            e.preventDefault();
            srchOpen();
        });
    }
})();
// Contact page topic chips + demo submit
document.addEventListener('DOMContentLoaded', function () {
    var chipWrap = document.getElementById('cpChips');
    if (chipWrap) {
        chipWrap.querySelectorAll('.cp-chip').forEach(function (chip) {
            chip.addEventListener('click', function () {
                chipWrap.querySelectorAll('.cp-chip').forEach(function (item) {
                    item.classList.remove('selected');
                });
                chip.classList.add('selected');
            });
        });
    }
    var contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    var submitFeedback = document.createElement('div');
    submitFeedback.className = 'cp-submit-feedback';
    submitFeedback.setAttribute('aria-live', 'polite');
    submitFeedback.style.marginTop = '14px';
    submitFeedback.style.fontSize = '14px';
    submitFeedback.style.fontWeight = '500';
    contactForm.appendChild(submitFeedback);
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }
        var selectedChip = chipWrap ? chipWrap.querySelector('.cp-chip.selected') : null;
        var topic = selectedChip ? selectedChip.textContent.trim() : 'General enquiry';
        submitFeedback.style.color = '#1f8f4f';
        submitFeedback.textContent = 'Message sent for ' + topic + '. This demo uses frontend validation only.';
        contactForm.reset();
        if (chipWrap) {
            var chips = chipWrap.querySelectorAll('.cp-chip');
            chips.forEach(function (chip, index) {
                chip.classList.toggle('selected', index === 0);
            });
        }
    });
});

//Shop detail page gallery
class GalleryCarousel {
    constructor() {
        this.currentIndex = 0;
        this.mainImage = document.getElementById('mainImage');
        this.galleryMain = document.getElementById('galleryMain');
        this.galleryThumbs = document.querySelectorAll('.gallery-thumb');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.totalImages = this.galleryThumbs.length;
        if (this.mainImage && this.galleryMain && this.galleryThumbs.length > 0) {
            this.init();
        }
    }
    init() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevImage());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }
        this.galleryThumbs.forEach((thumb) => {
            thumb.addEventListener('click', (e) => {
                const index = parseInt(e.currentTarget.dataset.index);
                this.goToImage(index);
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevImage();
            if (e.key === 'ArrowRight') this.nextImage();
        });
        let touchStartX = 0;
        this.galleryMain.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        });
        this.galleryMain.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) this.nextImage();
            if (touchEndX - touchStartX > 50) this.prevImage();
        });
    }
    updateImage() {
        const currentThumb = this.galleryThumbs[this.currentIndex];
        const newImageSrc = currentThumb.querySelector('img').src;
        this.mainImage.style.opacity = '0';
        setTimeout(() => {
            this.mainImage.src = newImageSrc;
            this.galleryMain.classList.remove('image-animation');
            void this.galleryMain.offsetWidth;
            this.galleryMain.classList.add('image-animation');
            this.mainImage.style.opacity = '1';
        }, 300);
        this.galleryThumbs.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === this.currentIndex);
        });
    }
    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateImage();
    }
    prevImage() {
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateImage();
    }
    goToImage(index) {
        this.currentIndex = index;
        this.updateImage();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new GalleryCarousel();
});
