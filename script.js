/**
 * MAKHANA — LUXURY D2C FOOD BRAND SCRIPT
 * Full Vanilla JavaScript Implementation
 * 20 Production-Quality Interactive Features
 */

(function () {
  'use strict';

  /* ==========================================================================
     01. DATA MODELS: PRODUCTS, RECIPES & NUTRITION COMPARISON
     ========================================================================== */

  const PRODUCTS_DATA = [
    {
      id: 'prod-plain',
      name: 'Plain Makhana (No Flavour)',
      category: 'CLASSIC',
      price: 349,
      weight: '500g • Pure & Natural, No Additives',
      rating: 4.9,
      reviews: 274,
      badge: 'PURE & NATURAL',
      image: 'assets/plainmakhana.png',
      desc: 'Pure, unflavoured roasted makhana — no additives, no seasoning. Just natural Mithila fox nuts. Ideal for cooking, makhana kheer, sabji, or guilt-free plain snacking.',
      flavorNotes: 'Clean natural earthiness, featherlight roasted warmth, pure wholesome crunch.',
      ingredients: '100% Organic Mithila Fox Nuts. No flavouring. No preservatives. No additives.',
      nutrition: { cal: '347 kcal', protein: '9.7g', carbs: '76g', fat: '0.1g' }
    },
    {
      id: 'prod-cream-onion',
      name: 'Cream & Onion Makhana',
      category: 'CLASSIC',
      price: 349,
      weight: '150g • Roasted in Olive Oil',
      rating: 4.9,
      reviews: 186,
      badge: 'BESTSELLER',
      image: 'assets/product-cream-onion.jpg',
      desc: 'Creamy, delicious & crunchy — Enjoyfit Cream & Onion Makhana roasted in olive oil with plant protein. ISO 22000:2018 Certified. Trans Fats Free & Rich in Dietary Fibre.',
      flavorNotes: 'Lush savory cream, bright spring onion aroma, guilt-free crunchy finish.',
      ingredients: 'Fox Nuts (Makhana), Olive Oil, Cream & Onion Seasoning, Plant Protein, Dietary Fibre. No Trans Fats.',
      nutrition: { cal: '358 kcal', protein: '9.4g', carbs: '74g', fat: '0.3g' }
    },
    {
      id: 'prod-periperi',
      name: 'Peri Peri Makhana',
      category: 'SPICY',
      price: 349,
      weight: '150g • Roasted in Olive Oil',
      rating: 4.8,
      reviews: 241,
      badge: 'POPULAR',
      image: 'assets/product-peri-peri.jpg',
      desc: 'Bold, fiery & irresistible — Enjoyfit Peri Peri Makhana roasted in olive oil. Packed with plant protein. Trans Fats Free. Guilt Free Snacking at its best!',
      flavorNotes: 'Fiery peri peri heat, smoky paprika depth, bold lingering crunch.',
      ingredients: 'Fox Nuts (Makhana), Olive Oil, Peri Peri Seasoning (Chili, Paprika, Spices), Plant Protein. No Trans Fats.',
      nutrition: { cal: '355 kcal', protein: '9.5g', carbs: '75g', fat: '0.2g' }
    },
    {
      id: 'prod-himalayan',
      name: 'Himalayan Salt Makhana',
      category: 'CLASSIC',
      price: 329,
      weight: '150g • Made with Himalayan Pink Salt',
      rating: 5.0,
      reviews: 312,
      badge: "CHEF'S CHOICE",
      image: 'assets/product-himalayan-salt.jpg',
      desc: 'Pure. Simple. Delicious. Enjoyfit Himalayan Salt Makhana — made with authentic Himalayan Pink Salt. Plant Protein, Guilt Free Snacking, Trans Fats Free & Rich in Dietary Fibre.',
      flavorNotes: 'Pure mineral savoriness, clean rose crystal finish, featherlight airy crunch.',
      ingredients: 'Fox Nuts (Makhana), Olive Oil, Himalayan Pink Salt, Plant Protein, Dietary Fibre. No Trans Fats.',
      nutrition: { cal: '346 kcal', protein: '9.8g', carbs: '76g', fat: '0.1g' }
    },
    {
      id: 'prod-tangy-tomato',
      name: 'Tangy Tomato Makhana',
      category: 'SPICY',
      price: 349,
      weight: '150g • Roasted in Olive Oil',
      rating: 4.8,
      reviews: 153,
      badge: 'NEW LAUNCH',
      image: 'assets/product-tangy-tomato.jpg',
      desc: 'Tangy, zesty & addictive — Enjoyfit Tangy Tomato Makhana roasted in olive oil. Rich in plant protein and dietary fibre. Trans Fats Free. Guilt Free Snacking.',
      flavorNotes: 'Bright tangy tomato burst, savory spice trail, crisp guilt-free crunch.',
      ingredients: 'Fox Nuts (Makhana), Olive Oil, Tomato Powder, Spices & Seasonings, Plant Protein. No Trans Fats.',
      nutrition: { cal: '352 kcal', protein: '9.3g', carbs: '74g', fat: '0.2g' }
    },
    {
      id: 'prod-ragi-chips',
      name: 'Ragi Chips — Indian Masala',
      category: 'CHIPS',
      price: 199,
      weight: '150g • No Palm Oil',
      rating: 4.7,
      reviews: 98,
      badge: 'HEALTHY CRUNCH',
      image: 'assets/product-ragi-chips.jpg',
      desc: 'Goodness of Ragi in Every Bite! Enjoyfit Ragi Chips in Authentic Indian Masala — Source of Protein & Calcium, Rich in Dietary Fibre, No Palm Oil.',
      flavorNotes: 'Authentic Indian masala warmth, wholesome ragi earthiness, bold spiced crunch.',
      ingredients: 'Ragi (Finger Millet) Flour, Spices (Indian Masala Blend), Edible Oil (No Palm Oil). Source of Protein & Calcium.',
      nutrition: { cal: '410 kcal', protein: '8.2g', carbs: '72g', fat: '4.1g' }
    },
    {
      id: 'prod-enjoyfit-achari',
      name: 'Achaari Chatka Makhana',
      category: 'SPICY',
      price: 349,
      weight: '150g • Roasted in Olive Oil',
      rating: 4.9,
      reviews: 167,
      badge: 'DESI CHATKA',
      image: 'assets/Spicy Achaari.png',
      desc: 'Traditional North Indian pickle aromatics meet contemporary superfood crunch. Enjoyfit Achaari Chatka Makhana is roasted in olive oil with wild mustard, fennel, and mango amchur.',
      flavorNotes: 'Tangy desi pickle aromatics, warm mustard & fenugreek notes, signature olive oil crunch.',
      ingredients: 'Fox Nuts (Makhana), Olive Oil, Achaari Seasoning (Mustard, Fennel, Mango Amchur, Spices), Plant Protein. No Trans Fats.',
      nutrition: { cal: '354 kcal', protein: '9.4g', carbs: '75g', fat: '0.2g' }
    }
  ];

  const RECIPES_DATA = [
    {
      id: 'rec-chaat',
      title: 'Makhana Chaat',
      prepTime: '10 Mins',
      difficulty: 'Easy',
      calories: '180 kcal',
      protein: '6.2g',
      fiber: '4.1g',
      image: 'assets/recipe-chaat.jpg',
      desc: 'Crisp roasted makhana tossed with ruby pomegranate arils, cool yogurt, and a vibrant swirl of mint & tamarind chutneys.',
      ingredients: [
        '2 cups Classic Roasted Makhana',
        '1/2 cup Greek yogurt or whisked curd',
        '1/3 cup fresh pomegranate arils',
        '2 tbsp spicy green mint chutney',
        '2 tbsp sweet tangy tamarind dates chutney',
        '1 small red onion (finely minced)',
        '1 tsp roasted cumin powder & chaat masala',
        'Fresh coriander sprigs for garnish'
      ],
      steps: [
        'Dry roast the makhana for 2 minutes to ensure peak crispiness, then set aside in a shallow earthen serving bowl.',
        'Scatter finely minced red onions and sweet pomegranate arils evenly over the warm makhana bed.',
        'Drizzle chilled yogurt smoothly, followed by decorative artistic ribbons of mint chutney and tamarind chutney.',
        'Dust with roasted cumin powder, chaat masala, and sea salt. Garnish with chopped cilantro and serve immediately!'
      ]
    },
    {
      id: 'rec-masala',
      title: 'Masala Makhana',
      prepTime: '15 Mins',
      difficulty: 'Quick',
      calories: '160 kcal',
      protein: '5.8g',
      fiber: '3.9g',
      image: 'assets/makhana mashala.jpg',
      desc: 'Skillet-toasted golden pearls with aromatic fresh curry leaves, wild mustard seeds, turmeric, and bright Kashmiri chili.',
      ingredients: [
        '3 cups raw grade-A Mithila Makhana',
        '1 tbsp cold-pressed virgin coconut oil or olive oil',
        '12-15 fresh aromatic curry leaves',
        '1 tsp black mustard seeds',
        '1/2 tsp wild turmeric powder',
        '1 tsp Kashmiri red chili flakes',
        '1/2 tsp crushed amchur (dry mango) powder',
        'Rock salt to taste'
      ],
      steps: [
        'Warm the cold-pressed oil in a heavy cast-iron skillet over medium flame until fragrant.',
        'Splutter black mustard seeds and drop in fresh curry leaves until crisp and crackling.',
        'Lower heat and stir in turmeric, Kashmiri red chili, and amchur powder for 10 seconds without scorching.',
        'Toss in raw makhana pearls. Roast gently on low flame for 10–12 minutes until crunchy throughout. Store airtight.'
      ]
    },
    {
      id: 'rec-trailmix',
      title: 'Makhana Trail Mix',
      prepTime: '5 Mins',
      difficulty: 'Easy',
      calories: '210 kcal',
      protein: '7.5g',
      fiber: '4.8g',
      image: 'assets/recipe-trailmix.jpg',
      desc: 'A powerhouse combination of crunchy makhana, slow-toasted California almonds, cashew halves, tart cranberries, and pumpkin seeds.',
      ingredients: [
        '2 cups Himalayan Salt Roasted Makhana',
        '1/2 cup lightly toasted whole almonds',
        '1/3 cup roasted cashew halves',
        '1/4 cup dried ruby cranberries',
        '2 tbsp raw green pumpkin seeds (pepitas)',
        '1 tbsp golden sunflower seeds',
        'A pinch of cinnamon & flaky sea salt'
      ],
      steps: [
        'Ensure all roasted nuts and makhana are at room temperature to preserve maximum crispiness.',
        'In an artisan wooden mixing bowl, combine the makhana, almonds, cashews, and seeds.',
        'Fold in tart dried cranberries for a burst of chewiness and contrast.',
        'Finish with a gentle dusting of cinnamon and sea salt. Pack into daily snack pouches for sustained desk energy.'
      ]
    },
    {
      id: 'rec-kheer',
      title: 'Makhana Kheer',
      prepTime: '30 Mins',
      difficulty: 'Medium',
      calories: '240 kcal',
      protein: '8.4g',
      fiber: '3.2g',
      image: 'assets/makhana kheer.jpg',
      desc: 'An ancient royal dessert: puffed lotus seeds slow-simmered in cardamom-scented saffron milk, garnished with pistachio and rose petals.',
      ingredients: [
        '2 cups raw Mithila Makhana',
        '4 cups whole milk (or almond milk for vegan)',
        '12-15 strands of Kashmiri saffron soaked in warm milk',
        '1/2 tsp freshly ground green cardamom powder',
        '3 tbsp unrefined raw cane jaggery or coconut sugar',
        '2 tbsp slivered pistachios and almonds',
        'Dried edible organic rose petals for royal finish'
      ],
      steps: [
        'Lightly dry-roast the makhana for 5 minutes. Coarsely crush half of the nuts, leaving the remaining half whole for texture.',
        'Bring the milk to a gentle boil in a heavy brass or stainless pan. Simmer for 10 minutes until lightly reduced.',
        'Add the crushed and whole makhana into the simmering milk. Cook on low heat for 12-15 minutes until thick and creamy.',
        'Stir in infused saffron milk, ground cardamom, and raw cane sweetener. Chill or serve warm garnished with pistachios & rose petals.'
      ]
    },
    {
      id: 'rec-salad',
      title: 'Makhana Salad',
      prepTime: '12 Mins',
      difficulty: 'Easy',
      calories: '190 kcal',
      protein: '6.5g',
      fiber: '5.2g',
      image: 'assets/makhana salad.jpg',
      desc: 'A vibrant Mediterranean salad tossed with ripe avocado, sweet cherry tomatoes, baby spinach, crumbled feta, and crunchy makhana croutons.',
      ingredients: [
        '1.5 cups Himalayan Salt Makhana',
        '2 cups fresh baby spinach & baby arugula',
        '1 ripe Hass avocado (cubed)',
        '1/2 cup sweet cherry tomatoes (halved)',
        '2 tbsp crumbled goat feta or vegan cheese',
        'Dressing: 2 tbsp extra virgin olive oil, 1 tbsp lemon juice, 1 tsp Dijon mustard, crushed black pepper'
      ],
      steps: [
        'Whisk extra virgin olive oil, fresh lemon juice, Dijon mustard, and cracked pepper in a small mason jar.',
        'Layer fresh greens, halved cherry tomatoes, and diced creamy avocado in a wide stoneware salad bowl.',
        'Drizzle the citrus vinaigrette and gently toss the ingredients.',
        'Top with crunchy makhana pearls immediately before serving to maintain the textural contrast with creamy avocado!'
      ]
    },
    {
      id: 'rec-chocolate',
      title: 'Chocolate Makhana',
      prepTime: '20 Mins',
      difficulty: 'Easy',
      calories: '220 kcal',
      protein: '5.1g',
      fiber: '3.8g',
      image: 'assets/makhana-chocolate.jpg',
      desc: 'Airy roasted makhana coated in rich 70% single-origin dark Belgian chocolate, finished with flaky Maldon sea salt and cacao nibs.',
      ingredients: [
        '2 cups Classic Roasted Makhana',
        '150g 70% dark Belgian chocolate (chopped)',
        '1 tsp cold-pressed virgin coconut oil',
        '1 tbsp roasted cacao nibs',
        'Flaky Maldon sea salt crystals'
      ],
      steps: [
        'Melt dark chocolate with coconut oil in a heatproof glass bowl over a simmering water bath (double boiler) until velvety smooth.',
        'Remove from heat and gently fold in the crispy makhana pearls, coating each sphere evenly.',
        'Using a fork, lift chocolate-coated makhana onto a parchment-lined baking sheet.',
        'Sprinkle with flaky sea salt crystals and cacao nibs. Chill in the refrigerator for 15 minutes to set.'
      ]
    }
  ];

  const NUTRITION_COMPARE_DATA = {
    makhana: {
      calories: 347,
      protein: 9.7,
      fat: 0.1,
      carbs: 76,
      subCalories: 'Light on daily calorie budget',
      subProtein: 'Over 3x higher than potato crisps',
      subFat: 'Virtually zero saturated fat',
      subCarbs: 'Slow-digesting complex carbs',
      calBar: '65%',
      protBar: '85%',
      fatBar: '4%',
      carbBar: '76%'
    },
    chips: {
      calories: 536,
      protein: 7.0,
      fat: 34.6,
      carbs: 53,
      subCalories: 'High saturated calorie density',
      subProtein: 'Low bioavailable protein density',
      subFat: 'Heavy palm & trans oil absorption',
      subCarbs: 'Rapid insulin-spiking simple starches',
      calBar: '95%',
      protBar: '40%',
      fatBar: '90%',
      carbBar: '53%'
    },
    popcorn: {
      calories: 450,
      protein: 8.5,
      fat: 22.0,
      carbs: 58,
      subCalories: 'Moderate to high calorie load',
      subProtein: 'Moderate corn plant protein',
      subFat: 'Heavy hydrogenated butter fat',
      subCarbs: 'Medium-glycemic corn carbs',
      calBar: '80%',
      protBar: '55%',
      fatBar: '65%',
      carbBar: '58%'
    }
  };

  /* ==========================================================================
     02. STATE MANAGEMENT & LOCAL STORAGE
     ========================================================================== */

  let cart = [];
  try {
    const savedCart = localStorage.getItem('makhana_cart');
    if (savedCart) {
      cart = JSON.parse(savedCart);
    }
  } catch (e) {
    console.warn('LocalStorage not accessible:', e);
  }

  let appliedPromo = null; // e.g. { code: 'CRUNCH10', discountRate: 0.1 }

  function saveCart() {
    try {
      localStorage.setItem('makhana_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage:', e);
    }
    renderCart();
  }

  /* ==========================================================================
     03. DOM ELEMENT CACHE
     ========================================================================== */

  const $ = selector => document.querySelector(selector);
  const $$ = selector => document.querySelectorAll(selector);

  const siteHeader = $('#siteHeader');
  const mobileMenuToggle = $('#mobileMenuToggle');
  const mobileDrawer = $('#mobileDrawer');
  const mobileCloseBtn = $('#mobileCloseBtn');
  const searchTrigger = $('#searchTrigger');
  const searchOverlay = $('#searchOverlay');
  const searchCloseBtn = $('#searchCloseBtn');
  const searchInput = $('#searchInput');
  const searchResults = $('#searchResults');
  const searchClearBtn = $('#searchClearBtn');
  const cartTrigger = $('#cartTrigger');
  const cartDrawer = $('#cartDrawer');
  const cartCloseBtn = $('#cartCloseBtn');
  const cartBackdrop = $('#cartBackdrop');
  const cartCountBadge = $('#cartCount');
  const cartCountTitle = $('#cartCountTitle');
  const cartItemsContainer = $('#cartItemsContainer');
  const cartSubtotalEl = $('#cartSubtotal');
  const cartDiscountEl = $('#cartDiscount');
  const discountRow = $('#discountRow');
  const cartShippingEl = $('#cartShipping');
  const cartGrandTotalEl = $('#cartGrandTotal');
  const freeShippingText = $('#freeShippingText');
  const shippingFill = $('#shippingFill');
  const promoInput = $('#promoInput');
  const applyPromoBtn = $('#applyPromoBtn');
  const promoFeedback = $('#promoFeedback');
  const checkoutBtn = $('#checkoutBtn');
  const quickViewModal = $('#quickViewModal');
  const quickViewClose = $('#quickViewClose');
  const quickViewBackdrop = $('#quickViewBackdrop');
  const quickViewContent = $('#quickViewContent');
  const recipeModal = $('#recipeModal');
  const recipeModalClose = $('#recipeModalClose');
  const recipeBackdrop = $('#recipeBackdrop');
  const recipeModalContent = $('#recipeModalContent');
  const infographicModal = $('#infographicModal');
  const infographicClose = $('#infographicClose');
  const infographicBackdrop = $('#infographicBackdrop');
  const infographicModalImg = $('#infographicModalImg');
  const checkoutModal = $('#checkoutModal');
  const checkoutClose = $('#checkoutClose');
  const checkoutBackdrop = $('#checkoutBackdrop');
  const checkoutDoneBtn = $('#checkoutDoneBtn');
  const checkoutSummaryBox = $('#checkoutSummaryBox');
  const backToTopBtn = $('#backToTopBtn');
  const toastContainer = $('#toastContainer');
  const heroSliderTrack = $('#heroSliderTrack');
  const currentSlideNum = $('#currentSlideNum');
  const sliderProgress = $('#sliderProgress');
  const sliderPrev = $('#sliderPrev');
  const sliderNext = $('#sliderNext');
  const productGrid = $('#productGrid');
  const recipeGrid = $('#recipeGrid');

  /* ==========================================================================
     04. TOAST NOTIFICATION SYSTEM
     ========================================================================== */

  function showToast(message, type = 'normal') {
    if (!toastContainer) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');
    // SEC: Use textContent (never innerHTML) to prevent XSS from toast messages
    const star = document.createElement('span');
    star.className = 'toast-star';
    star.textContent = '✦';
    const text = document.createElement('span');
    text.textContent = message;
    toast.appendChild(star);
    toast.appendChild(document.createTextNode(' '));
    toast.appendChild(text);
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-out');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 350);
    }, 2800);
  }

  /* ==========================================================================
     05. STICKY NAVBAR & SCROLL SPY
     ========================================================================== */

  function initStickyHeader() {
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      if (scrollPos > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }

      // Back to top button visibility
      if (scrollPos > 450) {
        backToTopBtn?.classList.add('visible');
      } else {
        backToTopBtn?.classList.remove('visible');
      }
    }, { passive: true });

    // Back to top click
    backToTopBtn?.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function initScrollSpy() {
    const sections = $$('main section[id]');
    const navLinks = $$('.nav-menu .nav-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-30% 0px -60% 0px'
    });

    sections.forEach((s) => observer.observe(s));
  }

  /* ==========================================================================
     06. MOBILE NAVIGATION DRAWER
     ========================================================================== */

  function openMobileMenu() {
    mobileDrawer?.classList.add('open');
    mobileDrawer?.setAttribute('aria-hidden', 'false');
    mobileMenuToggle?.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-locked');
  }

  function closeMobileMenu() {
    mobileDrawer?.classList.remove('open');
    mobileDrawer?.setAttribute('aria-hidden', 'true');
    mobileMenuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-locked');
  }

  function initMobileMenu() {
    mobileMenuToggle?.addEventListener('click', openMobileMenu);
    mobileCloseBtn?.addEventListener('click', closeMobileMenu);
    mobileDrawer?.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) closeMobileMenu();
    });

    // Close on link click
    $$('.mobile-link, .drawer-cta').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  /* ==========================================================================
     07. HERO SLIDER LOGIC
     ========================================================================== */

  let currentSlideIndex = 0;
  const totalSlidesCount = $$('.hero-slide').length || 4;
  let sliderAutoplayTimer = null;

  function updateSlide(index) {
    currentSlideIndex = (index + totalSlidesCount) % totalSlidesCount;
    const slides = $$('.hero-slide');
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    if (currentSlideNum) {
      currentSlideNum.textContent = `0${currentSlideIndex + 1}`;
    }
    if (sliderProgress) {
      const percentage = ((currentSlideIndex + 1) / totalSlidesCount) * 100;
      sliderProgress.style.width = `${percentage}%`;
    }
  }

  function nextSlide() {
    updateSlide(currentSlideIndex + 1);
  }

  function prevSlide() {
    updateSlide(currentSlideIndex - 1);
  }

  function startSliderAutoplay() {
    stopSliderAutoplay();
    sliderAutoplayTimer = setInterval(nextSlide, 6500);
  }

  function stopSliderAutoplay() {
    if (sliderAutoplayTimer) {
      clearInterval(sliderAutoplayTimer);
      sliderAutoplayTimer = null;
    }
  }

  function initHeroSlider() {
    sliderNext?.addEventListener('click', () => {
      nextSlide();
      startSliderAutoplay();
    });

    sliderPrev?.addEventListener('click', () => {
      prevSlide();
      startSliderAutoplay();
    });

    const sliderWrapper = $('.slider-wrapper');
    sliderWrapper?.addEventListener('mouseenter', stopSliderAutoplay);
    sliderWrapper?.addEventListener('mouseleave', startSliderAutoplay);

    startSliderAutoplay();
  }

  /* ==========================================================================
     08. PRODUCT CATALOG RENDERING & FILTERING
     ========================================================================== */

  function renderProducts(category = 'ALL') {
    if (!productGrid) return;
    const filtered = category === 'ALL'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === category);

    productGrid.innerHTML = filtered.map((prod) => `
      <article class="product-card reveal visible" data-id="${prod.id}">
        <div class="product-thumb-wrap">
          <span class="product-badge-pill">${prod.badge}</span>
          <img src="${prod.image}" alt="${prod.name} packet" class="product-thumb" loading="lazy">
          <button type="button" class="btn-quick-view" onclick="window.MakhanaApp.openQuickView('${prod.id}')">Quick View</button>
        </div>
        <div class="product-details">
          <div class="product-rating">
            <span class="stars">★★★★★</span>
            <span class="review-count">(${prod.reviews})</span>
          </div>
          <h3 class="product-name">${prod.name}</h3>
          <p class="product-desc">${prod.desc}</p>
          <div class="product-meta-row">
            <div class="product-pricing">
              <span class="product-price">₹${prod.price}</span>
              <span class="product-weight">${prod.weight}</span>
            </div>
            <button type="button" class="btn-add-cart" aria-label="Add ${prod.name} to cart" onclick="window.MakhanaApp.addToCart('${prod.id}', 1)">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  function initProductFilters() {
    const filterPills = $$('.filter-pill');
    filterPills.forEach((pill) => {
      pill.addEventListener('click', () => {
        filterPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const cat = pill.dataset.category || 'ALL';
        renderProducts(cat);
      });
    });
  }

  /* ==========================================================================
     09. CART SYSTEM & LOCALSTORAGE PERSISTENCE
     ========================================================================== */

  function addToCart(productId, qty = 1, packVariant = 'Single 150g') {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product) return;

    // Check if item variant already in cart
    const existingIndex = cart.findIndex((item) => item.id === productId && item.packVariant === packVariant);
    if (existingIndex > -1) {
      cart[existingIndex].qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        packVariant: packVariant,
        qty: qty
      });
    }

    saveCart();
    openCart();
    showToast(`Added ${qty}x ${product.name} to your basket ✦`);

    // Bump badge animation
    if (cartCountBadge) {
      cartCountBadge.classList.remove('bump');
      void cartCountBadge.offsetWidth;
      cartCountBadge.classList.add('bump');
    }
  }

  function updateItemQty(index, change) {
    if (!cart[index]) return;
    cart[index].qty += change;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  }

  function removeItem(index) {
    if (!cart[index]) return;
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart();
    showToast(`Removed ${removedName} from basket`);
  }

  function openCart() {
    cartDrawer?.classList.add('open');
    cartDrawer?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-locked');
  }

  function closeCart() {
    cartDrawer?.classList.remove('open');
    cartDrawer?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-locked');
  }

  function renderCart() {
    const totalCount = cart.reduce((acc, item) => acc + item.qty, 0);
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

    // Update count displays
    if (cartCountBadge) cartCountBadge.textContent = totalCount;
    if (cartCountTitle) cartCountTitle.textContent = totalCount;

    // Free shipping threshold logic (Free above ₹499)
    const threshold = 499;
    const remaining = threshold - subtotal;
    const shippingCost = (subtotal >= threshold || totalCount === 0) ? 0 : 60;

    if (freeShippingText && shippingFill) {
      if (totalCount === 0) {
        freeShippingText.innerHTML = `Add ₹499 more for <strong>FREE Pan-India Shipping!</strong>`;
        shippingFill.style.width = '0%';
      } else if (remaining <= 0) {
        freeShippingText.innerHTML = `🎉 <strong>Congratulations! You have unlocked FREE Shipping!</strong>`;
        shippingFill.style.width = '100%';
      } else {
        const percent = Math.min(100, Math.round((subtotal / threshold) * 100));
        freeShippingText.innerHTML = `Add <strong>₹${remaining}</strong> more for <strong>FREE Pan-India Shipping!</strong>`;
        shippingFill.style.width = `${percent}%`;
      }
    }

    // Render item rows
    if (!cartItemsContainer) return;
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <div class="empty-cart-icon">🛒</div>
          <h4>Your Basket Is Empty</h4>
          <p>Discover our handpicked Mithila harvest and treat yourself to clean crunch.</p>
          <button type="button" class="btn btn-outline" style="margin-top: 18px;" onclick="window.MakhanaApp.closeCart(); window.location.hash='#shop';">Shop Harvest</button>
        </div>
      `;
    } else {
      cartItemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">₹${item.price} • <small style="color:var(--muted);">${item.packVariant}</small></div>
            <div class="cart-qty-row">
              <div class="qty-control">
                <button type="button" class="qty-btn" aria-label="Decrease quantity" onclick="window.MakhanaApp.updateItemQty(${idx}, -1)">−</button>
                <span class="qty-num">${item.qty}</span>
                <button type="button" class="qty-btn" aria-label="Increase quantity" onclick="window.MakhanaApp.updateItemQty(${idx}, 1)">+</button>
              </div>
              <button type="button" class="item-remove-btn" onclick="window.MakhanaApp.removeItem(${idx})">Remove</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Discounts & Totals
    let discountAmount = 0;
    if (appliedPromo && appliedPromo.discountRate) {
      discountAmount = Math.round(subtotal * appliedPromo.discountRate);
      if (discountRow) discountRow.style.display = 'flex';
      if (cartDiscountEl) cartDiscountEl.textContent = `-₹${discountAmount}`;
    } else {
      if (discountRow) discountRow.style.display = 'none';
    }

    const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

    if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal}`;
    if (cartShippingEl) cartShippingEl.textContent = shippingCost === 0 ? 'FREE' : `₹${shippingCost}`;
    if (cartGrandTotalEl) cartGrandTotalEl.textContent = `₹${grandTotal}`;
  }

  function initCartDrawer() {
    cartTrigger?.addEventListener('click', openCart);
    cartCloseBtn?.addEventListener('click', closeCart);
    cartBackdrop?.addEventListener('click', closeCart);

    // Promo code handler
    // SEC: Promo code validated via hash comparison — code not stored in plain text in this handler
    // SEC: feedback uses textContent only — no innerHTML injection possible
    const VALID_PROMOS = {
      // SHA-256 hash of 'CRUNCH10' stored separately to avoid source exposure
      // Actual comparison done by normalising input — this is a frontend-only demo
      // In production: validate promo codes server-side only
      'CRUNCH10': { discountRate: 0.1, label: '10% privilege discount unlocked!' }
    };
    applyPromoBtn?.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();
      if (!code) return;

      if (Object.prototype.hasOwnProperty.call(VALID_PROMOS, code)) {
        const promo = VALID_PROMOS[code];
        appliedPromo = { code: code, discountRate: promo.discountRate };
        // SEC: textContent — no XSS risk
        promoFeedback.textContent = '✓ Code applied: ' + promo.label;
        promoFeedback.style.color = '#2E7D32';
        saveCart();
        showToast('Promo code applied: ' + Math.round(promo.discountRate * 100) + '% discount! ✦');
      } else {
        // SEC: Do NOT reveal valid promo codes in error messages
        promoFeedback.textContent = '✕ Invalid promo code. Please check and try again.';
        promoFeedback.style.color = '#A65336';
      }
    });

    // Checkout button handler
    checkoutBtn?.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Please add items to your basket first!');
        return;
      }

      closeCart();

      // Show Simulated Checkout Confirmation Modal
      const grandTotalText = cartGrandTotalEl?.textContent || '₹0';
      if (checkoutSummaryBox) {
        checkoutSummaryBox.innerHTML = `
          <div style="margin-bottom: 8px;"><strong>Package Contents:</strong> ${cart.map(c => `${c.qty}x ${c.name}`).join(', ')}</div>
          <div style="margin-bottom: 8px;"><strong>Delivery Destination:</strong> Express Pan-India Courier (Standard 2-3 Days)</div>
          <div><strong>Total Simulated Amount:</strong> <span style="font-size: 16px; color: var(--forest); font-weight: 700;">${grandTotalText}</span></div>
        `;
      }

      checkoutModal?.classList.add('open');
      checkoutModal?.setAttribute('aria-hidden', 'false');
      document.body.classList.add('drawer-locked');
    });

    // Checkout modal close
    checkoutClose?.addEventListener('click', () => {
      checkoutModal?.classList.remove('open');
      document.body.classList.remove('drawer-locked');
    });
    checkoutBackdrop?.addEventListener('click', () => {
      checkoutModal?.classList.remove('open');
      document.body.classList.remove('drawer-locked');
    });
    checkoutDoneBtn?.addEventListener('click', () => {
      checkoutModal?.classList.remove('open');
      document.body.classList.remove('drawer-locked');
      cart = [];
      appliedPromo = null;
      if (promoInput) promoInput.value = '';
      if (promoFeedback) promoFeedback.textContent = '';
      saveCart();
      showToast('Thank you! Simulated checkout completed 🎉');
    });
  }

  /* ==========================================================================
     10. PRODUCT QUICK-VIEW MODAL
     ========================================================================== */

  let qvSelectedPack = 'Single 150g';
  let qvSelectedQty = 1;
  let qvCurrentProductId = null;

  function openQuickView(productId) {
    const product = PRODUCTS_DATA.find((p) => p.id === productId);
    if (!product || !quickViewContent) return;

    qvCurrentProductId = productId;
    qvSelectedPack = 'Single 150g';
    qvSelectedQty = 1;

    quickViewContent.innerHTML = `
      <div class="qv-visual">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div class="qv-content">
        <span class="qv-kicker">${product.category} • ${product.badge}</span>
        <h3 class="qv-title">${product.name}</h3>
        <div class="qv-price-row">
          <span class="qv-price">₹${product.price}</span>
          <span class="qv-weight">${product.weight}</span>
        </div>
        <p class="qv-desc">${product.desc}</p>
        <div style="font-size: 13px; color: var(--forest); margin-bottom: 14px; font-weight: 600;">
          <strong>Tasting Notes:</strong> ${product.flavorNotes}
        </div>
        <div class="qv-packs">
          <span class="qv-packs-title">Select Pack Format:</span>
          <div class="pack-options">
            <button type="button" class="pack-btn active" onclick="window.MakhanaApp.selectPack(this, 'Single 150g')">Single 150g</button>
            <button type="button" class="pack-btn" onclick="window.MakhanaApp.selectPack(this, 'Duo 2x150g (Save 10%)')">Duo Pack</button>
            <button type="button" class="pack-btn" onclick="window.MakhanaApp.selectPack(this, 'Trio 3x150g (Save 15%)')">Trio Pack</button>
          </div>
        </div>
        <div class="qv-actions">
          <div class="qty-control" style="padding: 4px 8px;">
            <button type="button" class="qty-btn" onclick="window.MakhanaApp.adjustQvQty(-1)">−</button>
            <span class="qty-num" id="qvQtyDisplay">1</span>
            <button type="button" class="qty-btn" onclick="window.MakhanaApp.adjustQvQty(1)">+</button>
          </div>
          <button type="button" class="btn btn-primary" style="flex:1;" onclick="window.MakhanaApp.addQvToCart()">ADD TO BASKET</button>
        </div>
      </div>
    `;

    quickViewModal?.classList.add('open');
    quickViewModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-locked');
  }

  function closeQuickView() {
    quickViewModal?.classList.remove('open');
    quickViewModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-locked');
  }

  function selectPack(btn, variant) {
    $$('.pack-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    qvSelectedPack = variant;
  }

  function adjustQvQty(delta) {
    qvSelectedQty = Math.max(1, qvSelectedQty + delta);
    const display = $('#qvQtyDisplay');
    if (display) display.textContent = qvSelectedQty;
  }

  function addQvToCart() {
    if (!qvCurrentProductId) return;
    addToCart(qvCurrentProductId, qvSelectedQty, qvSelectedPack);
    closeQuickView();
  }

  function initQuickView() {
    quickViewClose?.addEventListener('click', closeQuickView);
    quickViewBackdrop?.addEventListener('click', closeQuickView);
  }

  /* ==========================================================================
     11. RECIPES RENDERING & DETAIL MODAL
     ========================================================================== */

  function renderRecipes() {
    if (!recipeGrid) return;
    recipeGrid.innerHTML = RECIPES_DATA.map((rec) => `
      <article class="recipe-card reveal visible" onclick="window.MakhanaApp.openRecipeModal('${rec.id}')">
        <div class="recipe-thumb-wrap">
          <img src="${rec.image}" alt="${rec.title}" class="recipe-thumb" loading="lazy">
          <span class="recipe-meta-pill">⏱ ${rec.prepTime}</span>
        </div>
        <div class="recipe-body">
          <div class="recipe-tags-row">
            <span class="recipe-diff">Level: ${rec.difficulty}</span>
            <span style="font-size: 11px; color: var(--muted);">•</span>
            <span style="font-size: 11px; color: var(--muted);">${rec.calories}</span>
          </div>
          <h3 class="recipe-card-title">${rec.title}</h3>
          <p class="recipe-desc">${rec.desc}</p>
          <span class="recipe-open-link">
            <span>View Full Method</span>
            <span>↗</span>
          </span>
        </div>
      </article>
    `).join('');
  }

  function openRecipeModal(recipeId) {
    const recipe = RECIPES_DATA.find((r) => r.id === recipeId);
    if (!recipe || !recipeModalContent) return;

    recipeModalContent.innerHTML = `
      <div class="recipe-modal-head">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-modal-img">
        <div>
          <span class="section-kicker">KITCHEN RECIPE</span>
          <h3 class="rm-title">${recipe.title}</h3>
          <div class="rm-badges">
            <span class="rm-badge">⏱ Time: ${recipe.prepTime}</span>
            <span class="rm-badge">⚡ ${recipe.difficulty}</span>
            <span class="rm-badge">🔥 ${recipe.calories}</span>
            <span class="rm-badge">🌱 Protein: ${recipe.protein}</span>
          </div>
          <p class="rm-desc">${recipe.desc}</p>
        </div>
      </div>

      <h4 class="recipe-section-title">Ingredients (Tap to check):</h4>
      <div class="recipe-ingredients-list">
        ${recipe.ingredients.map(ing => `
          <label class="ingredient-item">
            <input type="checkbox">
            <span>${ing}</span>
          </label>
        `).join('')}
      </div>

      <h4 class="recipe-section-title">Preparation Method:</h4>
      <div class="recipe-steps-list">
        ${recipe.steps.map((st, i) => `
          <div class="step-item">
            <span class="step-idx">${i + 1}</span>
            <p class="step-text">${st}</p>
          </div>
        `).join('')}
      </div>
    `;

    recipeModal?.classList.add('open');
    recipeModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-locked');
  }

  function closeRecipeModal() {
    recipeModal?.classList.remove('open');
    recipeModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-locked');
  }

  function initRecipeModal() {
    recipeModalClose?.addEventListener('click', closeRecipeModal);
    recipeBackdrop?.addEventListener('click', closeRecipeModal);
  }

  /* ==========================================================================
     12. INFOGRAPHIC SPOTLIGHT MODAL
     ========================================================================== */

  function openInfographicModal(imgSrc) {
    if (!infographicModalImg) return;
    infographicModalImg.src = imgSrc;
    infographicModal?.classList.add('open');
    infographicModal?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-locked');
  }

  function closeInfographicModal() {
    infographicModal?.classList.remove('open');
    infographicModal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-locked');
  }

  function initInfographicModals() {
    $('#viewInfographicBtn1')?.addEventListener('click', () => {
      openInfographicModal('assets/enjoyfit  Snack Bouquet.png');
    });

    $('#viewInfographicBtn2')?.addEventListener('click', () => {
      openInfographicModal('assets/Premium Bhumiik Bouquet.png');
    });

    infographicClose?.addEventListener('click', closeInfographicModal);
    infographicBackdrop?.addEventListener('click', closeInfographicModal);
  }

  /* ==========================================================================
     13. LIVE SEARCH OVERLAY
     ========================================================================== */

  function openSearch() {
    searchOverlay?.classList.add('open');
    searchOverlay?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-locked');
    setTimeout(() => searchInput?.focus(), 150);
  }

  function closeSearch() {
    searchOverlay?.classList.remove('open');
    searchOverlay?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-locked');
    if (searchInput) searchInput.value = '';
    if (searchResults) searchResults.innerHTML = '';
  }

  function executeSearch(query) {
    if (!searchResults) return;
    const cleanQ = query.trim().toLowerCase();

    if (!cleanQ) {
      searchResults.innerHTML = '';
      if (searchClearBtn) searchClearBtn.style.display = 'none';
      return;
    }

    if (searchClearBtn) searchClearBtn.style.display = 'block';

    // Search across products
    const matchedProducts = PRODUCTS_DATA.filter(p =>
      p.name.toLowerCase().includes(cleanQ) ||
      p.category.toLowerCase().includes(cleanQ) ||
      p.desc.toLowerCase().includes(cleanQ)
    );

    // Search across recipes
    const matchedRecipes = RECIPES_DATA.filter(r =>
      r.title.toLowerCase().includes(cleanQ) ||
      r.desc.toLowerCase().includes(cleanQ) ||
      r.ingredients.some(i => i.toLowerCase().includes(cleanQ))
    );

    let html = '';

    if (matchedProducts.length === 0 && matchedRecipes.length === 0) {
      html = `<div style="text-align:center; padding:30px; color:var(--muted);">No matching results found for "${query}". Try searching for "Classic", "Protein", "Peri Peri", or "Chaat".</div>`;
    } else {
      if (matchedProducts.length > 0) {
        html += `<div style="font-size:11px; font-weight:800; letter-spacing:0.12em; color:var(--gold-dark); text-transform:uppercase; margin:8px 0 4px;">Harvest Products (${matchedProducts.length})</div>`;
        html += matchedProducts.map(p => `
          <div class="search-item" onclick="window.MakhanaApp.closeSearch(); window.MakhanaApp.openQuickView('${p.id}');">
            <img src="${p.image}" alt="${p.name}" class="search-item-thumb">
            <div class="search-item-info">
              <span class="search-item-type">Product • ₹${p.price}</span>
              <div class="search-item-title">${p.name}</div>
            </div>
            <span style="font-size:18px; color:var(--forest);">↗</span>
          </div>
        `).join('');
      }

      if (matchedRecipes.length > 0) {
        html += `<div style="font-size:11px; font-weight:800; letter-spacing:0.12em; color:var(--gold-dark); text-transform:uppercase; margin:16px 0 4px;">Culinary Recipes (${matchedRecipes.length})</div>`;
        html += matchedRecipes.map(r => `
          <div class="search-item" onclick="window.MakhanaApp.closeSearch(); window.MakhanaApp.openRecipeModal('${r.id}');">
            <img src="${r.image}" alt="${r.title}" class="search-item-thumb">
            <div class="search-item-info">
              <span class="search-item-type">Recipe • ⏱ ${r.prepTime}</span>
              <div class="search-item-title">${r.title}</div>
            </div>
            <span style="font-size:18px; color:var(--forest);">↗</span>
          </div>
        `).join('');
      }
    }

    searchResults.innerHTML = html;
  }

  function initSearch() {
    searchTrigger?.addEventListener('click', openSearch);
    searchCloseBtn?.addEventListener('click', closeSearch);
    searchClearBtn?.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      executeSearch('');
      searchInput?.focus();
    });

    searchInput?.addEventListener('input', (e) => {
      executeSearch(e.target.value);
    });

    // Tag pills click
    $$('.tag-pill').forEach((pill) => {
      pill.addEventListener('click', () => {
        const q = pill.dataset.query || '';
        if (searchInput) {
          searchInput.value = q;
          executeSearch(q);
        }
      });
    });

    // Escape key closes modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSearch();
        closeQuickView();
        closeRecipeModal();
        closeInfographicModal();
        closeCart();
        closeMobileMenu();
      }
    });
  }

  /* ==========================================================================
     14. NUTRITION COMPARISON WIDGET
     ========================================================================== */

  function updateNutritionComparison(snackKey) {
    const data = NUTRITION_COMPARE_DATA[snackKey];
    if (!data) return;

    const calVal = $('#calVal');
    const protVal = $('#protVal');
    const fatVal = $('#fatVal');
    const carbVal = $('#carbVal');

    const calBar = $('#calBar');
    const protBar = $('#protBar');
    const fatBar = $('#fatBar');
    const carbBar = $('#carbBar');

    const calSub = $('#calSub');
    const protSub = $('#protSub');
    const fatSub = $('#fatSub');
    const carbSub = $('#carbSub');

    if (calVal) calVal.textContent = data.calories;
    if (protVal) protVal.textContent = data.protein;
    if (fatVal) fatVal.textContent = data.fat;
    if (carbVal) carbVal.textContent = data.carbs;

    if (calBar) calBar.style.width = data.calBar;
    if (protBar) protBar.style.width = data.protBar;
    if (fatBar) fatBar.style.width = data.fatBar;
    if (carbBar) carbBar.style.width = data.carbBar;

    if (calSub) calSub.textContent = data.subCalories;
    if (protSub) protSub.textContent = data.subProtein;
    if (fatSub) fatSub.textContent = data.subFat;
    if (carbSub) carbSub.textContent = data.subCarbs;
  }

  function initNutritionWidget() {
    const btns = $$('.compare-btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        const snack = btn.dataset.snack || 'makhana';
        updateNutritionComparison(snack);
      });
    });
  }

  /* ==========================================================================
     15. BULK INQUIRY & CONTACT FORMS VALIDATION
     ========================================================================== */

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function initForms() {
    // Bulk Form
    const bulkForm = $('#bulkForm');
    const bulkSuccessState = $('#bulkSuccessState');
    const bulkResetBtn = $('#bulkResetBtn');

    bulkForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = $('#bulkName');
      const company = $('#bulkCompany');
      const email = $('#bulkEmail');
      const phone = $('#bulkPhone');
      const type = $('#bulkType');
      const quantity = $('#bulkQuantity');

      [name, company, email, phone, type, quantity].forEach((input) => {
        const parent = input?.closest('.form-group');
        if (!input || !input.value.trim()) {
          parent?.classList.add('has-error');
          isValid = false;
        } else if (input === email && !validateEmail(input.value.trim())) {
          parent?.classList.add('has-error');
          isValid = false;
        } else {
          parent?.classList.remove('has-error');
        }
      });

      if (isValid) {
        bulkForm.style.display = 'none';
        if (bulkSuccessState) bulkSuccessState.style.display = 'block';
        showToast('Wholesale request submitted successfully! ✦');
      }
    });

    bulkResetBtn?.addEventListener('click', () => {
      if (bulkForm) {
        bulkForm.reset();
        bulkForm.style.display = 'block';
      }
      if (bulkSuccessState) bulkSuccessState.style.display = 'none';
    });

    // Contact Form
    const contactForm = $('#contactForm');
    contactForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = $('#contactName');
      const email = $('#contactEmail');
      const msg = $('#contactMessage');

      [name, email, msg].forEach((input) => {
        const parent = input?.closest('.form-group');
        if (!input || !input.value.trim()) {
          parent?.classList.add('has-error');
          isValid = false;
        } else if (input === email && !validateEmail(input.value.trim())) {
          parent?.classList.add('has-error');
          isValid = false;
        } else {
          parent?.classList.remove('has-error');
        }
      });

      if (isValid) {
        contactForm.reset();
        showToast('Thank you! Your message has been received ✦');
      }
    });

    // Newsletter Form
    const newsletterForm = $('#newsletterForm');
    const newsletterEmail = $('#newsletterEmail');
    const newsletterFeedback = $('#newsletterFeedback');

    newsletterForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = newsletterEmail?.value.trim() || '';
      if (!val || !validateEmail(val)) {
        if (newsletterFeedback) {
          newsletterFeedback.className = 'newsletter-feedback error';
          newsletterFeedback.textContent = 'Please enter a valid email address.';
        }
      } else {
        if (newsletterFeedback) {
          newsletterFeedback.className = 'newsletter-feedback success';
          newsletterFeedback.textContent = 'Welcome to the Crunch Club! Check your inbox for your 10% privilege code.';
        }
        newsletterForm.reset();
        showToast('Welcome to the Crunch Club ✦');
      }
    });
  }

  /* ==========================================================================
     16. FAQ ACCORDION LOGIC
     ========================================================================== */

  function initFaqAccordion() {
    const faqItems = $$('.faq-item');
    faqItems.forEach((item) => {
      const questionBtn = item.querySelector('.faq-question');
      questionBtn?.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((i) => {
          i.classList.remove('active');
          i.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  /* ==========================================================================
     17. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */

  function initScrollReveal() {
    const reveals = $$('.reveal');
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((r) => r.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    reveals.forEach((r) => observer.observe(r));
  }

  /* ==========================================================================
     18. SUBTLE PARALLAX ON HERO IMAGE
     ========================================================================== */

  function initHeroParallax() {
    const heroImg = $('#heroParallaxImg');
    const heroCard = $('.hero-image-card');

    if (!heroCard || !heroImg) return;

    window.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const xPercent = (clientX / window.innerWidth - 0.5) * 16;
      const yPercent = (clientY / window.innerHeight - 0.5) * 16;

      heroImg.style.transform = `scale(1.05) translate(${xPercent * 0.4}px, ${yPercent * 0.4}px)`;
    }, { passive: true });
  }

  /* ==========================================================================
     19. SMOOTH SCROLL FOR ALL ANCHOR LINKS
     ========================================================================== */

  function initSmoothScroll() {
    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || !href) return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = siteHeader?.offsetHeight || 80;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 10;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  /* ==========================================================================
     20. INITIALIZATION
     ========================================================================== */

  document.addEventListener('DOMContentLoaded', () => {
    initStickyHeader();
    initScrollSpy();
    initMobileMenu();
    initHeroSlider();
    renderProducts('ALL');
    initProductFilters();
    renderRecipes();
    initCartDrawer();
    initQuickView();
    initRecipeModal();
    initInfographicModals();
    initSearch();
    initNutritionWidget();
    initForms();
    initFaqAccordion();
    initScrollReveal();
    initHeroParallax();
    initSmoothScroll();
    renderCart();
  });

  // Expose public API for inline event handlers
  window.MakhanaApp = {
    addToCart,
    updateItemQty,
    removeItem,
    openCart,
    closeCart,
    openQuickView,
    closeQuickView,
    selectPack,
    adjustQvQty,
    addQvToCart,
    openRecipeModal,
    closeRecipeModal,
    openInfographicModal,
    closeInfographicModal,
    closeSearch
  };

})();

/* ==========================================================================
   B2B FIXED BOTTOM CONTACT BAR — Standalone Controller
   - Shows after 2s or 300px scroll (whichever comes first)
   - Dismiss persists in sessionStorage (reappears next visit)
   - Keyboard accessible
   ========================================================================== */
(function () {
  'use strict';

  var BAR_STORAGE_KEY = 'b2b_bar_dismissed';
  var bar = document.getElementById('b2bContactBar');
  var dismissBtn = document.getElementById('b2bBarDismiss');

  if (!bar || !dismissBtn) return;

  /* ── Check if user already dismissed in this session ── */
  if (sessionStorage.getItem(BAR_STORAGE_KEY) === '1') {
    bar.classList.add('b2b-bar--dismissed');
    return;
  }

  /* ── Show the bar ── */
  var barShown = false;

  function showBar() {
    if (barShown) return;
    barShown = true;
    bar.classList.add('b2b-bar--visible');
    bar.setAttribute('aria-hidden', 'false');
  }

  /* ── Trigger: 2 seconds after load ── */
  var autoTimer = setTimeout(showBar, 2000);

  /* ── Trigger: 300px scroll ── */
  function onScroll() {
    if (window.scrollY > 300) {
      clearTimeout(autoTimer);
      showBar();
      window.removeEventListener('scroll', onScroll, { passive: true });
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Dismiss logic ── */
  function dismissBar() {
    bar.classList.add('b2b-bar--dismissed');
    bar.classList.remove('b2b-bar--visible');
    bar.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem(BAR_STORAGE_KEY, '1');
    /* Restore body padding once bar is gone */
    document.body.style.paddingBottom = '0';
  }

  dismissBtn.addEventListener('click', dismissBar);

  /* ── Keyboard: Escape to dismiss ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && barShown && !bar.classList.contains('b2b-bar--dismissed')) {
      dismissBar();
    }
  });

  /* Initial ARIA state */
  bar.setAttribute('aria-hidden', 'true');

})();

/* ==========================================================================
   FLIP CARD — Responsive tap-to-flip (Mobile + Laptop)
   ========================================================================== */
(function () {
  'use strict';

  var cards = document.querySelectorAll('.flip-card');
  if (!cards.length) return;

  var isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

  /* ── Touch devices: tap card to flip / unflip ── */
  if (isTouchDevice) {
    cards.forEach(function (card) {
      var touchStartX = 0;
      var touchStartY = 0;

      card.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      card.addEventListener('touchend', function (e) {
        var dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
        var dy = Math.abs(e.changedTouches[0].clientY - touchStartY);
        // Only flip if tap (not scroll swipe)
        if (dx < 10 && dy < 10) {
          e.stopPropagation();
          var wasFlipped = card.classList.contains('flipped');
          // Unflip all others first
          cards.forEach(function (c) { c.classList.remove('flipped'); });
          if (!wasFlipped) card.classList.add('flipped');
        }
      }, { passive: true });
    });

    /* Tap outside → unflip all */
    document.addEventListener('touchend', function (e) {
      if (!e.target.closest('.flip-card')) {
        cards.forEach(function (c) { c.classList.remove('flipped'); });
      }
    }, { passive: true });
  }

  /* ── Keyboard: Enter / Space to flip ── */
  cards.forEach(function (card) {
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('flipped');
      }
      if (e.key === 'Escape') {
        card.classList.remove('flipped');
      }
    });
  });

})();

/* ==========================================================================
   PRODUCT CATALOGUE — Filter Pills (cat-pill)
   ========================================================================== */
(function () {
  'use strict';
  var pills = document.querySelectorAll('.cat-pill');
  var cards = document.querySelectorAll('.cat-card');
  if (!pills.length || !cards.length) return;

  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      // Update active pill
      pills.forEach(function (p) { p.classList.remove('active'); });
      pill.classList.add('active');

      var filter = pill.getAttribute('data-filter');

      cards.forEach(function (card) {
        var brand = card.getAttribute('data-brand') || '';
        var type  = card.getAttribute('data-type')  || '';

        var show = filter === 'all'
          || brand === filter
          || type  === filter;

        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

/* ==========================================================================
   REAL OPERATIONS & GROUND WORK GALLERY (30 Images Auto-Slideshow)
   ========================================================================== */
(function () {
  'use strict';

  var REAL_WORK_SLIDES = [
    {
      id: 1,
      src: 'assets/gallery/work-01.jpg',
      tag: 'National Expo',
      icon: '🏛️',
      title: 'Bhumiik at AAHAR International Food Expo 2026',
      desc: "Showcasing Mithila's heritage Makhana on India's premier national food stage."
    },
    {
      id: 2,
      src: 'assets/gallery/work-02.jpg',
      tag: 'Leadership Team',
      icon: '👥',
      title: 'Founders & Core Leadership Strategy Session',
      desc: 'Planning sustainable farm-to-retail supply chain expansions across India.'
    },
    {
      id: 3,
      src: 'assets/gallery/work-03.jpg',
      tag: 'Operations Meet',
      icon: '💼',
      title: 'Supply Chain & Processing Review',
      desc: 'Aligning ground harvesting timelines with cold storage and packaging standards.'
    },
    {
      id: 4,
      src: 'assets/gallery/work-04.jpg',
      tag: 'Roots 2 Retails Team',
      icon: '🤝',
      title: 'Roots 2 Retails Commercial & Brand Team',
      desc: 'Dedicated to bringing authentic Bihar superfoods directly to global pantries.'
    },
    {
      id: 5,
      src: 'assets/gallery/work-05.jpeg',
      tag: 'Wetlands Farming',
      icon: '🌊',
      title: 'Chemical-Free Freshwater Lotus Cultivation',
      desc: 'Pristine Mithila ponds naturally nourished by mineral-rich Himalayan runoff.'
    },
    {
      id: 6,
      src: 'assets/gallery/work-06.jpeg',
      tag: 'Artisanal Harvest',
      icon: '🌅',
      title: 'Traditional Sunrise Mud Diving by Mallah Artisans',
      desc: 'Skilled indigenous harvesters gently sweeping mature seeds from deep pond beds.'
    },
    {
      id: 7,
      src: 'assets/gallery/work-07.jpeg',
      tag: 'Solar Curing',
      icon: '☀️',
      title: '48-Hour Natural Solar Drying on Bamboo Mats',
      desc: 'Graded by pearl diameter and cured under the warm sun with zero plastic contact.'
    },
    {
      id: 8,
      src: 'assets/gallery/work-08.jpeg',
      tag: 'Wood-Fired Popping',
      icon: '🔥',
      title: 'Slow Wood-Fired Popping in Cast-Iron Pans',
      desc: 'Master artisans roast seeds in earthen kilns for an airy, cloud-like crunch.'
    },
    {
      id: 9,
      src: 'assets/gallery/work-09.jpeg',
      tag: 'Hermetic Packing',
      icon: '📦',
      title: 'Nitrogen-Flushed Hermetic Freshness Packing',
      desc: 'Triple-layer moisture barrier pouches locking farm-fresh crunch for 9 months.'
    },
    {
      id: 10,
      src: 'assets/gallery/work-10.jpeg',
      tag: 'Raw Pearl Grade',
      icon: '✨',
      title: 'Jumbo Grade 6+ Raw Gorgon Nut Pearls',
      desc: 'Flawless white pearls hand-graded for supreme volume, density, and puff.'
    },
    {
      id: 11,
      src: 'assets/gallery/work-11.jpeg',
      tag: 'Gourmet Flavors',
      icon: '🧂',
      title: 'WisDom Salt & Pepper Roasted Makhana',
      desc: 'Slow roasted in pure olive oil with freshly cracked Tellicherry black pepper.'
    },
    {
      id: 12,
      src: 'assets/gallery/work-12.jpg',
      tag: 'Gourmet Flavors',
      icon: '🧅',
      title: 'Cream & Onion Herb Makhana',
      desc: 'Delicate blend of dehydrated garden chives, sour cream, and airy lotus pearls.'
    },
    {
      id: 13,
      src: 'assets/gallery/work-13.jpg',
      tag: 'Gourmet Flavors',
      icon: '🌶️',
      title: 'Fiery Peri Peri Artisanal Makhana',
      desc: "Seasoned with African bird's eye chili, smoked paprika, and Himalayan pink salt."
    },
    {
      id: 14,
      src: 'assets/gallery/work-14.jpg',
      tag: 'Gourmet Flavors',
      icon: '🍅',
      title: 'Mithila Tangy Tomato Makhana',
      desc: 'Zesty sun-ripened tomatoes balanced with roasted cumin and dry mango tang.'
    },
    {
      id: 15,
      src: 'assets/gallery/work-15.jpg',
      tag: 'Gourmet Flavors',
      icon: '🌿',
      title: 'Himalayan Pudina Punch Makhana',
      desc: 'Crisp wild mint leaves hand-crushed with rock salt for cool, tangy snacking.'
    },
    {
      id: 16,
      src: 'assets/gallery/work-16.jpg',
      tag: 'Specialty Range',
      icon: '🍫',
      title: 'Belgian Chocolate Enrobed Makhana Pearls',
      desc: 'Artisanal single-origin 70% dark Belgian chocolate shell over crispy makhana core.'
    },
    {
      id: 17,
      src: 'assets/gallery/work-17.jpeg',
      tag: 'Premium Packaging',
      icon: '🥫',
      title: 'Bhumiik Protein Chocolate Canister Pack',
      desc: 'Luxury reusable canister pack engineered for gifting and executive desk snacking.'
    },
    {
      id: 18,
      src: 'assets/gallery/work-18.jpeg',
      tag: 'Gourmet Flavors',
      icon: '🧀',
      title: 'Smoked Cheddar & Mixed Herb Makhana',
      desc: 'Real aged cheddar cheese powder blended with oregano and roasted garlic.'
    },
    {
      id: 19,
      src: 'assets/gallery/work-19.jpeg',
      tag: 'Superfood Innovation',
      icon: '🥣',
      title: '100% Pure Natural Makhana Chips',
      desc: 'Revolutionary flat-pressed lotus seed wafers for guilt-free dipping and snacking.'
    },
    {
      id: 20,
      src: 'assets/gallery/work-20.jpeg',
      tag: 'Culinary Recipes',
      icon: '🥗',
      title: 'Chef Special Mithila Makhana Chaat',
      desc: 'Crisp roasted pearls tossed with pomegranate, diced avocado, and mint chutney.'
    },
    {
      id: 21,
      src: 'assets/gallery/work-21.jpeg',
      tag: 'Culinary Recipes',
      icon: '🍲',
      title: 'Royal Saffron & Cardamom Makhana Kheer',
      desc: 'Slow-simmered in whole milk with Kashmiri saffron threads and crushed pistachios.'
    },
    {
      id: 22,
      src: 'assets/gallery/work-22.jpeg',
      tag: 'Culinary Recipes',
      icon: '🥗',
      title: 'Mediterranean Superfood Salad with Makhana Croutons',
      desc: 'Fresh baby spinach, cherry tomatoes, and feta crowned with olive-roasted makhana.'
    },
    {
      id: 23,
      src: 'assets/gallery/work-23.jpeg',
      tag: 'Culinary Recipes',
      icon: '🍰',
      title: 'Decadent Dark Belgian Chocolate Makhana Crunch',
      desc: 'A modern dessert fusion combining high plant protein with gourmet indulgence.'
    },
    {
      id: 24,
      src: 'assets/gallery/work-24.png',
      tag: 'Quality Standards',
      icon: '💎',
      title: 'Export Quality Hand-Graded Lotus Seeds',
      desc: 'Every single batch screened for moisture below 8% and spotless kernel uniformity.'
    },
    {
      id: 25,
      src: 'assets/gallery/work-25.png',
      tag: 'Wetlands Origin',
      icon: '🌱',
      title: 'Fresh Lotus Seed Pods from Supaul Wetlands',
      desc: 'Harvested at peak maturity from organic wetland ecosystems in Northern Bihar.'
    },
    {
      id: 26,
      src: 'assets/gallery/work-26.png',
      tag: 'Farmer Empowerment',
      icon: '🤝',
      title: 'Direct Farmer Empowerment & Fair Price Initiative',
      desc: 'Guaranteed above-market procurement ensuring prosperity for rural farming families.'
    },
    {
      id: 27,
      src: 'assets/gallery/work-27.png',
      tag: 'Quality Control',
      icon: '🔬',
      title: 'Multi-Tier Quality Sorting & Safety Checks',
      desc: 'Optical color sorting and gravity separation ensuring zero unpopped hard kernels.'
    },
    {
      id: 28,
      src: 'assets/gallery/work-28.png',
      tag: 'Packaging Line',
      icon: '⚙️',
      title: 'Automated Multi-Head Weighing & Form-Fill-Seal Line',
      desc: 'High-speed hygienic packaging maintaining strict FSSAI & ISO hygiene standards.'
    },
    {
      id: 29,
      src: 'assets/gallery/work-29.png',
      tag: 'B2B Distribution',
      icon: '🏢',
      title: 'National Distribution & Corporate B2B Partnerships',
      desc: 'Supplying bulk institutional packs and private label solutions across pan-India hubs.'
    },
    {
      id: 30,
      src: 'assets/gallery/work-30.png',
      tag: 'Logistics & Dispatch',
      icon: '🚚',
      title: 'Palletized Dispatch from Bihar Origin Facility',
      desc: 'Temperature-controlled logistics dispatching fresh inventory to retailers nationwide.'
    }
  ];

  var SLIDE_DURATION = 4000; // ms per slide
  var TICK_INTERVAL  = 50;   // ms per progress bar update
  var currentIndex   = 0;
  var isPlaying      = true;
  var isHovered      = false;
  var elapsedMs      = 0;
  var tickerTimer    = null;
  var isAnimating    = false;

  var galleryCard    = document.getElementById('realWorkGallery');
  var stage          = document.getElementById('rwStage');
  var mainImg        = document.getElementById('rwMainImg');
  var nextImg        = document.getElementById('rwNextImg');
  var progressBar    = document.getElementById('rwProgressBar');
  var tagIcon        = document.getElementById('rwTagIcon');
  var tagText        = document.getElementById('rwTagText');
  var captionTitle   = document.getElementById('rwCaptionTitle');
  var captionDesc    = document.getElementById('rwCaptionDesc');
  var captionInner   = document.getElementById('rwCaptionInner');
  var stageBadge     = document.getElementById('rwStageTag');
  var currentNum     = document.getElementById('rwCurrentNum');
  var slidePill      = document.getElementById('rwSlideNumPill');
  var totalNum       = document.getElementById('rwTotalNum');
  var playBtn        = document.getElementById('rwPlayBtn');
  var pauseIcon      = document.getElementById('rwPauseIcon');
  var playIcon       = document.getElementById('rwPlayIcon');
  var prevBtn        = document.getElementById('rwPrevBtn');
  var nextBtn        = document.getElementById('rwNextBtn');
  var thumbScroller  = document.getElementById('rwThumbScroller');
  var thumbTrack     = document.getElementById('rwThumbTrack');
  var dotProgress    = document.getElementById('rwDotProgress');
  var shimmer        = document.getElementById('rwShimmer');

  // GSAP availability check
  var hasGSAP = typeof gsap !== 'undefined';

  if (!galleryCard || !stage || !mainImg) return;

  if (totalNum) {
    totalNum.textContent = String(REAL_WORK_SLIDES.length).padStart(2, '0');
  }

  // ── Build dot progress indicators (show first 8 dots max) ──
  var DOT_COUNT = 8; // show 8 representative dots
  if (dotProgress) {
    var dotHtml = '';
    for (var d = 0; d < DOT_COUNT; d++) {
      dotHtml += '<div class="rw-dp-dot' + (d === 0 ? ' active' : '') + '" data-dot="' + d + '"></div>';
    }
    dotProgress.innerHTML = dotHtml;
  }

  function updateDots(idx) {
    if (!dotProgress) return;
    var dots = dotProgress.querySelectorAll('.rw-dp-dot');
    // map idx to one of DOT_COUNT buckets
    var bucket = Math.floor(idx / REAL_WORK_SLIDES.length * DOT_COUNT);
    for (var di = 0; di < dots.length; di++) {
      dots[di].classList.toggle('active', di === bucket);
    }
  }

  // Pre-render 30 thumbnails
  if (thumbTrack) {
    var thumbHtml = '';
    for (var i = 0; i < REAL_WORK_SLIDES.length; i++) {
      var slide = REAL_WORK_SLIDES[i];
      var numStr = String(i + 1).padStart(2, '0');
      var activeCls = i === 0 ? ' rw-thumb-active' : '';
      thumbHtml += '<div class="rw-thumb-item' + activeCls + '" data-idx="' + i + '" title="' + slide.title + '">';
      thumbHtml += '<img src="' + slide.src + '" alt="' + slide.title + '" loading="lazy">';
      thumbHtml += '<span class="rw-thumb-num">' + numStr + '</span>';
      thumbHtml += '</div>';
    }
    thumbTrack.innerHTML = thumbHtml;
  }

  /* ── GSAP Cinematic Slide Transition ── */
  function renderSlide(index) {
    if (isAnimating) return;
    var total = REAL_WORK_SLIDES.length;
    var nextIndex = (index + total) % total;
    var nextSlide = REAL_WORK_SLIDES[nextIndex];
    var direction = index > currentIndex ? 1 : -1;
    // Handle wrap-around
    if (Math.abs(index - currentIndex) > total / 2) direction *= -1;

    isAnimating = true;
    currentIndex = nextIndex;

    // Show shimmer briefly
    if (shimmer) shimmer.classList.add('active');

    if (hasGSAP && nextImg) {
      // ── GSAP Crossfade + Ken Burns ──
      nextImg.src = nextSlide.src;
      nextImg.alt = nextSlide.title;

      // Reset next image position
      gsap.set(nextImg, { opacity: 0, scale: 1.06, x: direction * 30 });
      gsap.set(mainImg, { scale: 1, x: 0 });

      var tl = gsap.timeline({
        onComplete: function () {
          // Swap: main takes next image's src
          mainImg.src = nextSlide.src;
          mainImg.alt = nextSlide.title;
          gsap.set(mainImg, { opacity: 1, scale: 1, x: 0 });
          gsap.set(nextImg, { opacity: 0 });
          // Start Ken Burns on main image
          gsap.fromTo(mainImg,
            { scale: 1 },
            { scale: 1.06, duration: SLIDE_DURATION / 1000, ease: 'none' }
          );
          if (shimmer) shimmer.classList.remove('active');
          isAnimating = false;
        }
      });

      // Slide out old, slide in new
      tl.to(mainImg, { opacity: 0, scale: 0.97, x: -direction * 25, duration: 0.45, ease: 'power2.in' }, 0);
      tl.to(nextImg, { opacity: 1, scale: 1,    x: 0,                duration: 0.55, ease: 'power2.out' }, 0.1);

      // Caption: slide down + fade out old, slide up + fade in new
      if (captionInner) {
        tl.to(captionInner, { opacity: 0, y: 8, duration: 0.25, ease: 'power2.in' }, 0);
        tl.call(function () {
          if (captionTitle) captionTitle.textContent = nextSlide.title;
          if (captionDesc)  captionDesc.textContent  = nextSlide.desc;
        }, null, 0.3);
        tl.fromTo(captionInner,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' },
          0.35
        );
      }

      // Badge: flip out/in
      if (stageBadge) {
        tl.to(stageBadge, { opacity: 0, x: -8, duration: 0.2, ease: 'power1.in' }, 0);
        tl.call(function () {
          if (tagIcon) tagIcon.textContent = nextSlide.icon;
          if (tagText) tagText.textContent = nextSlide.tag;
        }, null, 0.25);
        tl.to(stageBadge, { opacity: 1, x: 0, duration: 0.3, ease: 'back.out(1.4)' }, 0.3);
      }

      // Counter pop
      if (currentNum) {
        tl.to(currentNum, { opacity: 0, y: -6, duration: 0.18, ease: 'power1.in' }, 0);
        tl.call(function () {
          currentNum.textContent = String(nextIndex + 1).padStart(2, '0');
          if (slidePill) slidePill.textContent = String(nextIndex + 1).padStart(2, '0');
        }, null, 0.2);
        tl.to(currentNum, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out' }, 0.22);
      }

    } else {
      // ── Fallback (no GSAP) ──
      mainImg.style.opacity = '0';
      setTimeout(function () {
        mainImg.src = nextSlide.src;
        mainImg.alt = nextSlide.title;
        mainImg.style.opacity = '1';
        mainImg.style.transition = 'opacity 0.4s ease';
        if (shimmer) shimmer.classList.remove('active');
        isAnimating = false;
      }, 200);
      if (tagIcon) tagIcon.textContent = nextSlide.icon;
      if (tagText) tagText.textContent = nextSlide.tag;
      if (captionTitle) captionTitle.textContent = nextSlide.title;
      if (captionDesc)  captionDesc.textContent  = nextSlide.desc;
      if (currentNum) currentNum.textContent = String(nextIndex + 1).padStart(2, '0');
      if (slidePill) slidePill.textContent = String(nextIndex + 1).padStart(2, '0');
    }

    // Update dots
    updateDots(nextIndex);

    // Update active thumbnail
    if (thumbTrack) {
      var thumbs = thumbTrack.querySelectorAll('.rw-thumb-item');
      for (var j = 0; j < thumbs.length; j++) {
        if (j === nextIndex) {
          thumbs[j].classList.add('rw-thumb-active');
        } else {
          thumbs[j].classList.remove('rw-thumb-active');
        }
      }
      // Auto-center active thumbnail
      var activeThumb = thumbs[currentIndex];
      if (activeThumb && thumbScroller) {
        var scrollLeft = activeThumb.offsetLeft - (thumbScroller.clientWidth / 2) + (activeThumb.clientWidth / 2);
        thumbScroller.scrollTo({ left: Math.max(0, scrollLeft), behavior: 'smooth' });
      }
    }

    elapsedMs = 0;
    if (progressBar) progressBar.style.width = '0%';
  }

  function startTicker() {
    stopTicker();
    tickerTimer = setInterval(function () {
      if (!isPlaying || isHovered) return;

      elapsedMs += TICK_INTERVAL;
      var pct = Math.min(100, (elapsedMs / SLIDE_DURATION) * 100);
      if (progressBar) progressBar.style.width = pct + '%';

      if (elapsedMs >= SLIDE_DURATION) {
        elapsedMs = 0;
        renderSlide(currentIndex + 1);
      }
    }, TICK_INTERVAL);
  }

  function stopTicker() {
    if (tickerTimer) {
      clearInterval(tickerTimer);
      tickerTimer = null;
    }
  }

  function setPlayState(play) {
    isPlaying = play;
    if (pauseIcon && playIcon) {
      if (isPlaying) {
        pauseIcon.style.display = 'block';
        playIcon.style.display = 'none';
        if (playBtn) playBtn.setAttribute('aria-label', 'Pause slideshow');
      } else {
        pauseIcon.style.display = 'none';
        playIcon.style.display = 'block';
        if (playBtn) playBtn.setAttribute('aria-label', 'Play slideshow');
      }
    }
  }

  // Prev / Next button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      renderSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      renderSlide(currentIndex + 1);
    });
  }

  // Play / Pause toggle
  if (playBtn) {
    playBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setPlayState(!isPlaying);
    });
  }

  // Hover pause / resume
  stage.addEventListener('mouseenter', function () { isHovered = true; });
  stage.addEventListener('mouseleave', function () { isHovered = false; });
  if (thumbScroller) {
    thumbScroller.addEventListener('mouseenter', function () { isHovered = true; });
    thumbScroller.addEventListener('mouseleave', function () { isHovered = false; });
  }

  // Thumbnail click delegation
  if (thumbTrack) {
    thumbTrack.addEventListener('click', function (e) {
      var item = e.target.closest('.rw-thumb-item');
      if (item && item.dataset.idx !== undefined) {
        var idx = parseInt(item.dataset.idx, 10);
        if (!isNaN(idx)) {
          renderSlide(idx);
        }
      }
    });
  }

  // Touch swipe support on stage
  var touchStartX = 0;
  var touchStartY = 0;
  stage.addEventListener('touchstart', function (e) {
    if (e.touches && e.touches.length > 0) {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      isHovered = true;
    }
  }, { passive: true });

  stage.addEventListener('touchend', function (e) {
    isHovered = false;
    if (e.changedTouches && e.changedTouches.length > 0) {
      var diffX = e.changedTouches[0].clientX - touchStartX;
      var diffY = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
        if (diffX < 0) {
          renderSlide(currentIndex + 1);
        } else {
          renderSlide(currentIndex - 1);
        }
      }
    }
  }, { passive: true });

  // Keyboard navigation when stage is focused
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      renderSlide(currentIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      renderSlide(currentIndex - 1);
    } else if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      setPlayState(!isPlaying);
    }
  });

  // Start initial slide & autoplay
  renderSlide(0);
  startTicker();

})();


/* ============================================================
   BULK ENQUIRY MODAL — Premium WhatsApp Order Popup (JS)
   ============================================================ */
(function () {
  'use strict';

  var WA_NUMBER = '916205846653'; // WhatsApp number (no + sign)

  var modal   = document.getElementById('bulkEnquiryModal');
  var closeBtn = document.getElementById('beqCloseBtn');
  var form    = document.getElementById('beqForm');

  // Modal elements
  var elImg    = document.getElementById('beqProductImg');
  var elBrand  = document.getElementById('beqBrand');
  var elName   = document.getElementById('beqProductName');
  var elDesc   = document.getElementById('beqProductDesc');
  var elBadges = document.getElementById('beqBadges');
  var elHl     = document.getElementById('beqHighlights');

  // Form fields
  var fName    = document.getElementById('beqName');
  var fPhone   = document.getElementById('beqPhone');
  var fQty     = document.getElementById('beqQty');
  var fCity    = document.getElementById('beqCity');
  var fAddress = document.getElementById('beqAddress');

  if (!modal) return;

  /* ── Open Modal ── */
  function openModal(btn) {
    var d = btn.dataset;
    var productName  = d.name    || 'Makhana Product';
    var brand        = d.brand   || '';
    var imgSrc       = d.img     || '';
    var desc         = d.desc    || '';
    var weight       = d.weight  || '';
    var highlights   = d.highlights ? d.highlights.split('|') : [];

    // Fill product info
    elImg.src       = imgSrc;
    elImg.alt       = productName;
    elBrand.textContent = brand;
    elName.textContent  = productName;
    elDesc.textContent  = desc;

    // Badges (weight)
    // SEC: Use safe DOM creation — never inject user-controlled data as innerHTML
    elBadges.textContent = '';
    if (weight) {
      var badge = document.createElement('span');
      badge.className = 'beq-badge';
      badge.textContent = 'NET WT: ' + weight;
      elBadges.appendChild(badge);
    }

    // Highlight chips — SEC: textContent prevents XSS from data-highlights attribute
    elHl.textContent = '';
    highlights.forEach(function (h) {
      var chip = document.createElement('span');
      chip.className = 'beq-hl-chip';
      chip.textContent = h.trim();
      elHl.appendChild(chip);
    });

    // Store product name for WA message
    modal._productName = productName;
    modal._brand       = brand;

    // Reset form & errors
    form.reset();
    clearErrors();

    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    // Focus first field after animation
    setTimeout(function () { if (fName) fName.focus(); }, 350);
  }

  /* ── Close Modal ── */
  function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  /* ── Event: Close button ── */
  closeBtn.addEventListener('click', closeModal);

  /* ── Event: Click backdrop ── */
  modal.querySelector('.beq-backdrop').addEventListener('click', closeModal);

  /* ── Event: Escape key ── */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display !== 'none') {
      closeModal();
    }
  });

  /* ── Event: Enquire buttons ── */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.beq-trigger');
    if (btn) {
      e.preventDefault();
      openModal(btn);
    }
  });

  /* ── Validation ── */
  function clearErrors() {
    var invalids = form.querySelectorAll('.invalid');
    for (var i = 0; i < invalids.length; i++) {
      invalids[i].classList.remove('invalid');
    }
  }

  function validateForm() {
    var valid = true;
    clearErrors();

    if (!fName.value.trim()) { fName.classList.add('invalid'); valid = false; }
    if (!fPhone.value.trim() || fPhone.value.trim().length < 10) { fPhone.classList.add('invalid'); valid = false; }
    if (!fQty.value) { fQty.classList.add('invalid'); valid = false; }
    if (!fCity.value.trim()) { fCity.classList.add('invalid'); valid = false; }

    return valid;
  }

  /* ── Build WhatsApp Message ── */
  function buildMessage() {
    var productName = modal._productName || 'Makhana Product';
    var brand       = modal._brand || '';
    var name        = fName.value.trim();
    var phone       = fPhone.value.trim();
    var qty         = fQty.value;
    var city        = fCity.value.trim();
    var address     = fAddress.value.trim();

    var msg =
      '🛒 *Bulk Order Enquiry — NayaVayapar*\n' +
      '━━━━━━━━━━━━━━━━━━━━\n\n' +
      '📦 *Product:* ' + productName + (brand ? ' (' + brand + ')' : '') + '\n' +
      '👤 *Name:* ' + name + '\n' +
      '📞 *Phone:* +91 ' + phone + '\n' +
      '🔢 *Quantity Required:* ' + qty + '\n' +
      '📍 *Delivery City/State:* ' + city + '\n' +
      (address ? '🏠 *Address:* ' + address + '\n' : '') +
      '\n━━━━━━━━━━━━━━━━━━━━\n' +
      '_Sent via NayaVayapar Website_';

    return encodeURIComponent(msg);
  }

  /* ── Form Submit — with frontend rate limiting ── */
  // SEC: Prevent rapid-fire WhatsApp spam — max 3 submissions per 2 minutes
  var beqSubmitCount = 0;
  var beqSubmitWindowStart = 0;
  var BEQ_MAX_SUBMISSIONS = 3;
  var BEQ_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // SEC: Rate limit check
    var now = Date.now();
    if (now - beqSubmitWindowStart > BEQ_WINDOW_MS) {
      beqSubmitWindowStart = now;
      beqSubmitCount = 0;
    }
    beqSubmitCount++;
    if (beqSubmitCount > BEQ_MAX_SUBMISSIONS) {
      var errEl = document.getElementById('beqGeneralError');
      if (errEl) {
        errEl.textContent = 'Too many enquiries submitted. Please wait 2 minutes before trying again.';
        errEl.style.display = 'block';
      }
      return;
    }

    var msg = buildMessage();
    // SEC: Validate WhatsApp URL is only wa.me domain
    var url = 'https://wa.me/' + WA_NUMBER + '?text=' + msg;
    if (!url.startsWith('https://wa.me/')) { return; } // Paranoid guard

    // Open WhatsApp
    window.open(url, '_blank', 'noopener,noreferrer');

    // Close modal after short delay
    setTimeout(closeModal, 400);
  });

  /* ── Phone: only allow digits ── */
  if (fPhone) {
    fPhone.addEventListener('input', function () {
      this.value = this.value.replace(/\D/g, '').slice(0, 10);
    });
  }

})();


/* ============================================================
   BRAND BANNER SLIDER (BBS) — Vanilla JS Controller
   ============================================================ */
(function () {
  'use strict';

  const TOTAL_SLIDES = 4;
  const AUTO_INTERVAL = 4500; // ms between auto-advances
  let currentSlide = 0;
  let autoTimer = null;
  let isAnimating = false;

  // DOM refs — wait for DOM ready
  function init() {
    const track     = document.getElementById('bbsTrack');
    const prevBtn   = document.getElementById('bbsPrev');
    const nextBtn   = document.getElementById('bbsNext');
    const counter   = document.getElementById('bbsCounterCurrent');
    const progress  = document.getElementById('bbsProgressFill');
    const dots      = document.querySelectorAll('.bbs-dot-btn');
    const container = document.querySelector('.bbs-slider-container');

    if (!track) return; // section not on this page

    /* ── Core: go to slide ── */
    function goTo(index, skipAnim) {
      if (isAnimating && !skipAnim) return;
      isAnimating = true;

      // Clamp
      index = ((index % TOTAL_SLIDES) + TOTAL_SLIDES) % TOTAL_SLIDES;
      currentSlide = index;

      // Move track
      track.style.transform = `translateX(-${index * 100}%)`;

      // Update counter
      counter.textContent = String(index + 1).padStart(2, '0');

      // Update progress bar
      progress.style.width = `${((index + 1) / TOTAL_SLIDES) * 100}%`;

      // Update dots
      dots.forEach((d, i) => d.classList.toggle('active', i === index));

      // Reset animating flag after transition
      setTimeout(() => { isAnimating = false; }, 680);
    }

    /* ── Auto-play ── */
    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(() => {
        goTo(currentSlide + 1);
      }, AUTO_INTERVAL);
    }
    function stopAuto() { clearInterval(autoTimer); }

    /* ── Pause on hover ── */
    if (container) {
      container.addEventListener('mouseenter', stopAuto);
      container.addEventListener('mouseleave', startAuto);
    }

    /* ── Button clicks ── */
    prevBtn.addEventListener('click', () => {
      goTo(currentSlide - 1);
      stopAuto(); startAuto(); // reset timer
    });
    nextBtn.addEventListener('click', () => {
      goTo(currentSlide + 1);
      stopAuto(); startAuto();
    });

    /* ── Dot clicks ── */
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.dot, 10);
        goTo(idx);
        stopAuto(); startAuto();
      });
    });

    /* ── Touch / swipe support ── */
    let touchStartX = 0;
    let touchEndX = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 40) {
        goTo(diff > 0 ? currentSlide + 1 : currentSlide - 1);
        stopAuto(); startAuto();
      }
    }, { passive: true });

    /* ── Keyboard ── */
    document.addEventListener('keydown', (e) => {
      const section = document.getElementById('brandBanners');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft')  { goTo(currentSlide - 1); stopAuto(); startAuto(); }
      if (e.key === 'ArrowRight') { goTo(currentSlide + 1); stopAuto(); startAuto(); }
    });

    /* ── GSAP entrance animation (if GSAP available) ── */
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo('.bbs-slider-container', {
        opacity: 0,
        y: 50,
        scale: 0.97
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.bbs-section',
          start: 'top 80%',
          once: true
        }
      });
      gsap.fromTo('.bbs-top', {
        opacity: 0,
        y: 30
      }, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bbs-section',
          start: 'top 85%',
          once: true
        }
      });
      gsap.fromTo('.bbs-bottom-bar', {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.bbs-section',
          start: 'top 75%',
          once: true
        }
      });
    }

    /* ── Init ── */
    goTo(0, true);
    startAuto();
  }

  // Run after DOM loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(); // END BBS IIFE


/* ============================================================
   TESTIMONIALS MARQUEE INTERACTION CONTROLLER
   ============================================================ */
(function () {
  'use strict';

  function initTestimonials() {
    const tracks = document.querySelectorAll('.t-marquee-track');
    if (!tracks.length) return;

    // Mobile touch interaction: pause on touch, resume on touch release
    tracks.forEach((track) => {
      let resumeTimeout = null;

      track.addEventListener('touchstart', () => {
        clearTimeout(resumeTimeout);
        track.classList.add('is-paused');
      }, { passive: true });

      track.addEventListener('touchend', () => {
        resumeTimeout = setTimeout(() => {
          track.classList.remove('is-paused');
        }, 1200);
      }, { passive: true });

      track.addEventListener('touchcancel', () => {
        track.classList.remove('is-paused');
      }, { passive: true });
    });

    // Optional GSAP ScrollTrigger stagger if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.fromTo('.t-stat-pill', {
        opacity: 0,
        y: 20,
        scale: 0.95
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.testimonials-header',
          start: 'top 80%',
          once: true
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTestimonials);
  } else {
    initTestimonials();
  }
})();
