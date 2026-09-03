/* ==========================================================================
   MATELIOVERSE — Exact MOB Interactivity & Dynamics
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
  initSearchPlaceholder();
  initAddButtons();
});

/* ── Hero Carousel (Auto-rotation & Dot Navigation) ── */
function initHeroCarousel() {
  const track = document.getElementById('hero-track');
  const dotsContainer = document.getElementById('hero-dots-capsule');
  if (!track || !dotsContainer) return;

  const dots = dotsContainer.querySelectorAll('.hero-dot-btn');
  let currentSlide = 0;
  const totalSlides = dots.length;
  let timer = null;

  function setSlide(index) {
    currentSlide = index;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() {
    setSlide((currentSlide + 1) % totalSlides);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextSlide, 4500);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      stopTimer();
      setSlide(parseInt(dot.dataset.index, 10));
      startTimer();
    });
  });

  const slider = document.getElementById('hero-slider');
  if (slider) {
    slider.addEventListener('mouseenter', stopTimer);
    slider.addEventListener('mouseleave', startTimer);
  }

  startTimer();
}

/* ── Rotating Search Placeholder ── */
function initSearchPlaceholder() {
  const input = document.getElementById('top-search-input');
  if (!input) return;

  const searchPhrases = [
    'Search "electrical wires"',
    'Search "cements"',
    'Search "Fevicol"',
    'Search "bathroom tiles"',
    'Search "TMT bars"',
    'Search "CPVC pipes"',
    'Search "Asian Paints"',
    'Search "ceiling fans"',
    'Search "plywood"'
  ];

  let phraseIndex = 0;

  setInterval(() => {
    if (document.activeElement === input || input.value.length > 0) return;
    phraseIndex = (phraseIndex + 1) % searchPhrases.length;
    input.setAttribute('placeholder', searchPhrases[phraseIndex]);
  }, 2800);
}

/* ── Horizontal Product Carousel Scroll ── */
window.scrollCarousel = function(carouselId, offset) {
  const el = document.getElementById(carouselId);
  if (el) {
    el.scrollBy({ left: offset, behavior: 'smooth' });
  }
};

/* ── Interactive ADD Button to Quantity Selector ── */
function initAddButtons() {
  let cartCount = 0;

  document.querySelectorAll('.mob-add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      if (btn.classList.contains('in-cart')) return;

      btn.classList.add('in-cart');
      btn.innerHTML = `
        <div style="display:flex; align-items:center; gap:8px; width:100%; justify-content:space-between;">
          <span class="qty-btn-minus" style="font-size:16px; cursor:pointer; padding:0 4px;">-</span>
          <span class="qty-val" style="font-weight:700;">1</span>
          <span class="qty-btn-plus" style="font-size:16px; cursor:pointer; padding:0 4px;">+</span>
        </div>
      `;
      btn.style.background = '#1890FF';
      btn.style.color = '#FFFFFF';

      cartCount++;
      updateCartBadge(cartCount);

      const minus = btn.querySelector('.qty-btn-minus');
      const plus = btn.querySelector('.qty-btn-plus');
      const val = btn.querySelector('.qty-val');
      let qty = 1;

      minus.addEventListener('click', (ev) => {
        ev.stopPropagation();
        qty--;
        if (qty <= 0) {
          btn.classList.remove('in-cart');
          btn.innerHTML = 'ADD';
          btn.style.background = '#FFFFFF';
          btn.style.color = '#1890FF';
          cartCount = Math.max(0, cartCount - 1);
          updateCartBadge(cartCount);
        } else {
          val.textContent = qty;
        }
      });

      plus.addEventListener('click', (ev) => {
        ev.stopPropagation();
        qty++;
        val.textContent = qty;
      });
    });
  });
}

function updateCartBadge(count) {
  const cartBtn = document.querySelector('.nav-cart-btn');
  if (!cartBtn) return;

  let badge = cartBtn.querySelector('.cart-count-badge');
  if (!badge) {
    badge = document.createElement('span');
    badge.className = 'cart-count-badge';
    badge.style.cssText = `
      position: absolute;
      top: 2px;
      right: 2px;
      background: #EF4444;
      color: #FFF;
      font-size: 10px;
      font-weight: 800;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    `;
    cartBtn.appendChild(badge);
  }

  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}
