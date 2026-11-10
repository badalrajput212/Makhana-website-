/**
 * BULK ORDER CHATBOT — ROOTS 2 RETAILS
 * Bilingual (English / Hindi) | 7-Step Guided Flow
 * WhatsApp Integration | Backend Email API
 *
 * Config — update CHATBOT_CONFIG before deployment
 */

;(function () {
  'use strict';

  /* =========================================================================
     SECTION A — CONFIGURATION
     ========================================================================= */

  const CHATBOT_CONFIG = {
    whatsappNumber: '916205846653',        // International format, digits only
    businessEmail:  'nayavayapar@gmail.com',
    apiBase:        '/api',                // Base URL of your Node.js backend
    typingDelayMs:  700,                   // Simulates natural bot response delay
    sessionKey:     'r2r_chatbot_session', // localStorage key
  };

  /* =========================================================================
     SECTION B — PRODUCT DATA (mirrored from script.js PRODUCTS_DATA)
     Each product has variants (pack sizes). Expand as needed.
     ========================================================================= */

  const CHATBOT_PRODUCTS = [
    {
      id: 'prod-plain',
      name: 'Plain Makhana (No Flavour)',
      nameHi: 'सादा मखाना (बिना फ्लेवर)',
      category: 'CLASSIC',
      badge: 'PURE & NATURAL',
      image: 'assets/hero-makhana.png',
      desc: 'Pure, unflavoured roasted makhana — no additives, no seasoning. Just natural Mithila fox nuts. Perfect for cooking, kheer, and healthy snacking.',
      descHi: 'शुद्ध, बिना फ्लेवर वाला मखाना — कोई मसाला नहीं, कोई सीज़निंग नहीं। सिर्फ प्राकृतिक मखाना। खीर, सब्जी या स्नैकिंग के लिए एकदम सही।',
      variants: [
        { id: 'plain-500', label: '500g — Raw / Plain',   labelHi: '500ग्राम — कच्चा / सादा',  price: 349, weight: '500g' },
        { id: 'plain-1kg', label: '1 kg — Raw / Plain',   labelHi: '1 किलो — कच्चा / सादा',   price: 649, weight: '1 kg' },
        { id: 'plain-5kg', label: '5 kg — Bulk / Wholesale', labelHi: '5 किलो — बल्क / थोक', price: 2999, weight: '5 kg' },
      ]
    },
    {
      id: 'prod-cream-onion',
      name: 'Cream & Onion Makhana',
      nameHi: 'क्रीम एंड ओनियन मखाना',
      category: 'CLASSIC',
      badge: 'BESTSELLER',
      image: 'assets/product-cream-onion.jpg',
      desc: 'Creamy, delicious & crunchy — roasted in olive oil. ISO 22000:2018 Certified. Trans Fats Free.',
      descHi: 'क्रीमी, स्वादिष्ट और कुरकुरा — ऑलिव ऑयल में भुना हुआ। ट्रांस फैट फ्री।',
      variants: [
        { id: 'cream-onion-150', label: '150g — Roasted in Olive Oil', labelHi: '150ग्राम — ऑलिव ऑयल में भुना', price: 349, weight: '150g' },
      ]
    },
    {
      id: 'prod-periperi',
      name: 'Peri Peri Makhana',
      nameHi: 'पेरी पेरी मखाना',
      category: 'SPICY',
      badge: 'POPULAR',
      image: 'assets/product-peri-peri.jpg',
      desc: 'Bold, fiery & irresistible — roasted in olive oil. Plant Protein. Guilt Free Snacking.',
      descHi: 'तीखा, मज़ेदार और लाजवाब — ऑलिव ऑयल में भुना। गिल्ट फ्री स्नैकिंग।',
      variants: [
        { id: 'periperi-150', label: '150g — Roasted in Olive Oil', labelHi: '150ग्राम — ऑलिव ऑयल में भुना', price: 349, weight: '150g' },
      ]
    },
    {
      id: 'prod-himalayan',
      name: 'Himalayan Salt Makhana',
      nameHi: 'हिमालयन साल्ट मखाना',
      category: 'CLASSIC',
      badge: "CHEF'S CHOICE",
      image: 'assets/product-himalayan-salt.jpg',
      desc: 'Pure. Simple. Delicious — made with authentic Himalayan Pink Salt. Rich in Dietary Fibre.',
      descHi: 'शुद्ध, सरल और स्वादिष्ट — असली हिमालयन पिंक साल्ट के साथ बना। डायटरी फाइबर से भरपूर।',
      variants: [
        { id: 'himalayan-150', label: '150g — Himalayan Pink Salt', labelHi: '150ग्राम — हिमालयन पिंक साल्ट', price: 329, weight: '150g' },
      ]
    },
    {
      id: 'prod-tangy-tomato',
      name: 'Tangy Tomato Makhana',
      nameHi: 'टैंगी टोमैटो मखाना',
      category: 'SPICY',
      badge: 'NEW LAUNCH',
      image: 'assets/product-tangy-tomato.jpg',
      desc: 'Tangy, zesty & addictive — roasted in olive oil. Plant Protein. Trans Fats Free.',
      descHi: 'चटपटा, तीखा और लाजवाब — ऑलिव ऑयल में भुना। ट्रांस फैट फ्री।',
      variants: [
        { id: 'tangy-tomato-150', label: '150g — Roasted in Olive Oil', labelHi: '150ग्राम — ऑलिव ऑयल में भुना', price: 349, weight: '150g' },
      ]
    },
    {
      id: 'prod-ragi-chips',
      name: 'Ragi Chips — Indian Masala',
      nameHi: 'रागी चिप्स — इंडियन मसाला',
      category: 'CHIPS',
      badge: 'HEALTHY CRUNCH',
      image: 'assets/product-ragi-chips.jpg',
      desc: 'Goodness of Ragi in Every Bite! Source of Protein & Calcium. No Palm Oil. Rich in Dietary Fibre.',
      descHi: 'हर कौर में रागी की अच्छाई! प्रोटीन और कैल्शियम का स्रोत। नो पाम ऑयल।',
      variants: [
        { id: 'ragi-chips-150', label: '150g — No Palm Oil', labelHi: '150ग्राम — नो पाम ऑयल', price: 199, weight: '150g' },
      ]
    }
  ];

  /* =========================================================================
     SECTION C — STRINGS (Bilingual)
     ========================================================================= */

  const STRINGS = {
    en: {
      welcome:           'Welcome to Roots 2 Retails! 🌿\nI\'m here to help you place a bulk makhana order.\nLet\'s get started!',
      chooseLanguage:    'Please choose your preferred language:',
      showProducts:      'Here are our available makhana products. Select the ones you\'d like to order:',
      selectBtn:         'Select',
      selectedBtn:       '✓ Selected',
      continueProducts:  'Continue →',
      noProductSelected: 'Please select at least one product to continue.',
      chooseVariant:     'For {product}, please choose a pack size:',
      enterQty:          'How many packs of {product} ({variant}) would you like?',
      qtyHint:           'Enter a whole number (e.g. 5)',
      qtyError:          'Please enter a valid positive whole number.',
      addMore:           'Would you like to add more products?',
      addMoreYes:        'Yes, add more products',
      addMoreNo:         'No, proceed to details',
      collectDetails:    'Great! Now I\'ll collect your delivery details. These are needed to process your bulk order enquiry.',
      askName:           'What is your full name? *',
      askPhone:          'What is your WhatsApp/phone number with country code? *\n(e.g. +91 98765 43210)',
      askAddress:        'What is your full delivery address? *',
      askCity:           'Which city? *',
      askState:          'Which state? *',
      askPin:            'What is your PIN code? *\n(6-digit Indian PIN)',
      askEmail:          'Your email address? (optional — press Skip to skip)',
      skipBtn:           'Skip →',
      nameError:         'Please enter your full name.',
      phoneError:        'Please enter a valid Indian phone number (10 digits after country code).',
      addressError:      'Please enter your delivery address.',
      cityError:         'Please enter your city.',
      stateError:        'Please enter your state.',
      pinError:          'Please enter a valid 6-digit PIN code.',
      emailError:        'Please enter a valid email address, or press Skip.',
      summaryTitle:      'Order Enquiry Summary',
      summaryOrderId:    'Order Enquiry ID',
      summaryLang:       'Language',
      summaryProducts:   'Products Selected',
      summaryName:       'Name',
      summaryPhone:      'Phone',
      summaryAddress:    'Address',
      summaryCity:       'City',
      summaryState:      'State',
      summaryPIN:        'PIN Code',
      summaryEmail:      'Email',
      summaryDate:       'Date & Time',
      summaryQty:        'Qty',
      summaryPrice:      'Unit Price',
      summarySubtotal:   'Subtotal',
      disclaimer:        '⚠️ This is a bulk enquiry only. Final price, availability and shipping cost will be confirmed by our team. No payment is collected here.',
      confirmBtn:        'Confirm Order ✓',
      editBtn:           'Edit Details ✎',
      submitting:        'Submitting your enquiry…',
      successTitle:      'Order Enquiry Submitted! 🎉',
      successText:       'Your bulk order enquiry has been registered. Our team will contact you within 4 business hours.',
      whatsappTitle:     'Send on WhatsApp',
      whatsappBtn:       'Open WhatsApp →',
      whatsappInstruct:  '📱 WhatsApp will open with your order details pre-filled. Please press the Send button inside WhatsApp to deliver it to us.',
      emailSent:         '📧 An order summary has been emailed to our team.',
      emailFailed:       '⚠️ Email delivery encountered an issue, but your enquiry is saved. We\'ll follow up via WhatsApp.',
      newOrder:          'Place Another Order',
      back:              '← Back',
      errorGeneral:      'Something went wrong. Please try again.',
      onlineStatus:      'Typically replies instantly',
      stepLabels:        ['Lang', 'Products', 'Qty', 'Details', 'Confirm'],
    },
    hi: {
      welcome:           'Roots 2 Retails में आपका स्वागत है! 🌿\nमैं आपका बल्क मखाना ऑर्डर देने में सहायता करूंगा।\nआइए शुरू करते हैं!',
      chooseLanguage:    'कृपया अपनी पसंदीदा भाषा चुनें:',
      showProducts:      'हमारे उपलब्ध मखाना उत्पाद यहाँ हैं। जो चाहिए उन्हें चुनें:',
      selectBtn:         'चुनें',
      selectedBtn:       '✓ चुना गया',
      continueProducts:  'आगे बढ़ें →',
      noProductSelected: 'जारी रखने के लिए कम से कम एक उत्पाद चुनें।',
      chooseVariant:     '{product} के लिए पैक साइज़ चुनें:',
      enterQty:          '{product} ({variant}) के कितने पैक चाहिए?',
      qtyHint:           'पूर्ण संख्या दर्ज करें (जैसे 5)',
      qtyError:          'कृपया एक वैध पूर्ण संख्या दर्ज करें।',
      addMore:           'क्या आप और उत्पाद जोड़ना चाहते हैं?',
      addMoreYes:        'हाँ, और उत्पाद जोड़ें',
      addMoreNo:         'नहीं, विवरण भरें',
      collectDetails:    'बढ़िया! अब मैं आपका डिलीवरी विवरण लूंगा। यह आपका बल्क ऑर्डर एन्क्वायरी प्रोसेस करने के लिए आवश्यक है।',
      askName:           'आपका पूरा नाम क्या है? *',
      askPhone:          'आपका WhatsApp/फ़ोन नंबर (देश कोड सहित)? *\n(जैसे +91 98765 43210)',
      askAddress:        'आपका पूरा डिलीवरी पता क्या है? *',
      askCity:           'शहर का नाम? *',
      askState:          'राज्य का नाम? *',
      askPin:            'पिन कोड? *\n(6 अंकों का भारतीय पिन)',
      askEmail:          'आपका ईमेल पता? (वैकल्पिक — छोड़ने के लिए Skip दबाएं)',
      skipBtn:           'छोड़ें →',
      nameError:         'कृपया अपना पूरा नाम दर्ज करें।',
      phoneError:        'कृपया एक वैध भारतीय मोबाइल नंबर दर्ज करें।',
      addressError:      'कृपया अपना डिलीवरी पता दर्ज करें।',
      cityError:         'कृपया अपना शहर दर्ज करें।',
      stateError:        'कृपया अपना राज्य दर्ज करें।',
      pinError:          'कृपया 6 अंकों का वैध पिन कोड दर्ज करें।',
      emailError:        'कृपया एक वैध ईमेल पता दर्ज करें, या Skip दबाएं।',
      summaryTitle:      'ऑर्डर एन्क्वायरी सारांश',
      summaryOrderId:    'ऑर्डर ID',
      summaryLang:       'भाषा',
      summaryProducts:   'चुने गए उत्पाद',
      summaryName:       'नाम',
      summaryPhone:      'फ़ोन',
      summaryAddress:    'पता',
      summaryCity:       'शहर',
      summaryState:      'राज्य',
      summaryPIN:        'पिन कोड',
      summaryEmail:      'ईमेल',
      summaryDate:       'दिनांक व समय',
      summaryQty:        'मात्रा',
      summaryPrice:      'इकाई मूल्य',
      summarySubtotal:   'उप-कुल',
      disclaimer:        '⚠️ यह केवल बल्क एन्क्वायरी है। अंतिम मूल्य, उपलब्धता और शिपिंग लागत हमारी टीम द्वारा पुष्टि की जाएगी। यहाँ कोई भुगतान नहीं लिया जाएगा।',
      confirmBtn:        'ऑर्डर कन्फर्म करें ✓',
      editBtn:           'जानकारी बदलें ✎',
      submitting:        'एन्क्वायरी सबमिट हो रही है…',
      successTitle:      'ऑर्डर एन्क्वायरी सबमिट हुई! 🎉',
      successText:       'आपकी बल्क ऑर्डर एन्क्वायरी दर्ज हो गई है। हमारी टीम 4 कार्य घंटों के भीतर संपर्क करेगी।',
      whatsappTitle:     'WhatsApp पर भेजें',
      whatsappBtn:       'WhatsApp खोलें →',
      whatsappInstruct:  '📱 WhatsApp आपके ऑर्डर विवरण के साथ खुलेगा। कृपया WhatsApp के अंदर Send बटन दबाएं।',
      emailSent:         '📧 ऑर्डर सारांश हमारी टीम को ईमेल किया जा चुका है।',
      emailFailed:       '⚠️ ईमेल डिलीवरी में समस्या आई, लेकिन आपकी एन्क्वायरी सेव है। हम WhatsApp से संपर्क करेंगे।',
      newOrder:          'नया ऑर्डर दें',
      back:              '← वापस',
      errorGeneral:      'कुछ गड़बड़ हुई। कृपया पुनः प्रयास करें।',
      onlineStatus:      'आमतौर पर तुरंत जवाब देते हैं',
      stepLabels:        ['भाषा', 'उत्पाद', 'मात्रा', 'विवरण', 'पुष्टि'],
    }
  };

  /* =========================================================================
     SECTION D — STATE
     ========================================================================= */

  let state = {
    open: false,
    lang: null,                  // 'en' | 'hi'
    step: 'language',            // current step identifier
    selectedProducts: [],        // [{ product, variant, qty }]
    pendingProductIdx: 0,        // index into selectedProducts being collected
    customerDetails: {},
    orderEnquiryId: null,
    submitted: false,
    submitting: false,
    // Step tracking: 0=lang, 1=products, 2=qty, 3=details, 4=summary
    stepIndex: 0,
    historyStack: [],            // For back-navigation
    detailField: null,           // which customer field we're collecting
    detailOrder: ['name','phone','address','city','state','pin','email'],
    pendingVariantForProductId: null,
  };

  // Restore session if available
  function loadSession() {
    try {
      const raw = sessionStorage.getItem(CHATBOT_CONFIG.sessionKey);
      if (raw) {
        const saved = JSON.parse(raw);
        // Only restore non-submitted, non-final sessions
        if (saved && !saved.submitted) {
          state = Object.assign(state, saved);
        }
      }
    } catch (_) {}
  }
  function saveSession() {
    try {
      sessionStorage.setItem(CHATBOT_CONFIG.sessionKey, JSON.stringify(state));
    } catch (_) {}
  }

  /* =========================================================================
     SECTION E — UTILITIES
     ========================================================================= */

  function t(key) {
    const lang = state.lang || 'en';
    return (STRINGS[lang] && STRINGS[lang][key]) || (STRINGS.en[key] || '');
  }

  function generateOrderId() {
    const ts  = Date.now().toString(36).toUpperCase();
    const rnd = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `R2R-${ts}-${rnd}`;
  }

  function formatDateTime(d) {
    return d.toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  }

  function getProductName(p) {
    return state.lang === 'hi' ? p.nameHi : p.name;
  }
  function getVariantLabel(v) {
    return state.lang === 'hi' ? v.labelHi : v.label;
  }

  /* Validators */
  function validatePhone(val) {
    // Remove spaces, dashes, parentheses
    const clean = val.replace(/[\s\-().+]/g, '');
    // Accept: 10 digit Indian number or with 91 prefix
    return /^(91)?\d{10}$/.test(clean);
  }
  function validatePin(val) {
    return /^\d{6}$/.test(val.trim());
  }
  function validateEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  }

  /* =========================================================================
     SECTION F — DOM BUILDER HELPERS
     ========================================================================= */

  function svgIcon(type) {
    const icons = {
      bot: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
              <path d="M12 2a2 2 0 0 1 2 2v2H10V4a2 2 0 0 1 2-2z"/>
              <rect x="2" y="8" width="20" height="12" rx="3"/>
              <circle cx="8" cy="14" r="1.5" fill="currentColor" stroke="none"/>
              <circle cx="16" cy="14" r="1.5" fill="currentColor" stroke="none"/>
              <line x1="12" y1="6" x2="12" y2="8"/>
            </svg>`,
      close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>`,
      back:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>`,
      send:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>`,
      check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>`,
      summary:`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>`,
      wa:    `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`,
    };
    return icons[type] || '';
  }

  function timeNow() {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  /* =========================================================================
     SECTION G — CHATBOT HTML INJECTION
     ========================================================================= */

  function buildChatbotHTML() {
    const html = `
      <!-- CHATBOT TRIGGER BUTTON -->
      <button
        type="button"
        class="chatbot-trigger"
        id="chatbotTrigger"
        aria-label="Open Bulk Order Chatbot"
        title="Bulk Order Chat"
      >
        <span class="chatbot-trigger-badge" id="chatbotTriggerBadge">!</span>
        <span class="chatbot-trigger-icon">${svgIcon('bot')}</span>
      </button>

      <!-- CHATBOT WINDOW -->
      <div class="chatbot-window" id="chatbotWindow" role="dialog" aria-modal="true" aria-label="Bulk Order Chatbot">

        <!-- HEADER -->
        <div class="chatbot-header">
          <div class="chatbot-header-avatar">${svgIcon('bot')}</div>
          <div class="chatbot-header-info">
            <div class="chatbot-header-title">Roots 2 Retails — Bulk Orders</div>
            <div class="chatbot-header-sub">
              <span class="chatbot-online-dot"></span>
              <span id="chatbotStatusText">Typically replies instantly</span>
            </div>
          </div>
          <div class="chatbot-header-actions">
            <button type="button" class="chatbot-header-btn" id="chatbotBackBtn" aria-label="Go back" title="Back">
              ${svgIcon('back')}
            </button>
            <button type="button" class="chatbot-header-btn" id="chatbotCloseBtn" aria-label="Close chatbot">
              ${svgIcon('close')}
            </button>
          </div>
        </div>

        <!-- PROGRESS BAR -->
        <div class="chatbot-progress" id="chatbotProgress">
          <div class="chatbot-progress-steps" id="chatbotProgressSteps">
            <!-- Built dynamically -->
          </div>
          <div class="chatbot-step-label" id="chatbotStepLabel"></div>
        </div>

        <!-- MESSAGES -->
        <div class="chatbot-messages" id="chatbotMessages" aria-live="polite" aria-label="Chat messages"></div>

        <!-- INPUT AREA -->
        <div class="chatbot-input-area" id="chatbotInputArea">
          <div class="chatbot-input-row">
            <textarea
              class="chatbot-input"
              id="chatbotInput"
              placeholder="Type a message…"
              rows="1"
              aria-label="Type your message"
            ></textarea>
            <button type="button" class="chatbot-send-btn" id="chatbotSendBtn" aria-label="Send">
              ${svgIcon('send')}
            </button>
          </div>
          <div class="chatbot-input-hint" id="chatbotInputHint">Press Enter to send</div>
        </div>
      </div>
    `;

    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  /* =========================================================================
     SECTION H — DOM REFERENCES (post-injection)
     ========================================================================= */

  let dom = {};

  function cacheDom() {
    dom = {
      trigger:       document.getElementById('chatbotTrigger'),
      triggerBadge:  document.getElementById('chatbotTriggerBadge'),
      window:        document.getElementById('chatbotWindow'),
      closeBtn:      document.getElementById('chatbotCloseBtn'),
      backBtn:       document.getElementById('chatbotBackBtn'),
      messages:      document.getElementById('chatbotMessages'),
      input:         document.getElementById('chatbotInput'),
      sendBtn:       document.getElementById('chatbotSendBtn'),
      inputArea:     document.getElementById('chatbotInputArea'),
      inputHint:     document.getElementById('chatbotInputHint'),
      progressSteps: document.getElementById('chatbotProgressSteps'),
      stepLabel:     document.getElementById('chatbotStepLabel'),
      statusText:    document.getElementById('chatbotStatusText'),
    };
  }

  /* =========================================================================
     SECTION I — PROGRESS BAR
     ========================================================================= */

  const STEP_COUNT = 5;

  function renderProgress() {
    const labels = t('stepLabels');
    let html = '';
    for (let i = 0; i < STEP_COUNT; i++) {
      const isDone   = i < state.stepIndex;
      const isActive = i === state.stepIndex;
      html += `<div class="chatbot-step-dot ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}" title="${labels[i]}"></div>`;
      if (i < STEP_COUNT - 1) {
        const fillPct = isDone ? '100%' : '0%';
        html += `<div class="chatbot-step-line"><div class="chatbot-step-line-fill" style="width:${fillPct}"></div></div>`;
      }
    }
    dom.progressSteps.innerHTML = html;
    dom.stepLabel.textContent   = labels[Math.min(state.stepIndex, STEP_COUNT - 1)];
  }

  /* =========================================================================
     SECTION J — MESSAGE RENDERING
     ========================================================================= */

  function appendMessage(role, content, isHTML = false) {
    const div  = document.createElement('div');
    div.className = `chatbot-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';

    if (isHTML) {
      bubble.innerHTML = content;
    } else {
      // Convert newlines to <br> and preserve text
      bubble.innerHTML = content.replace(/\n/g, '<br>');
    }

    const ts = document.createElement('div');
    ts.className = 'chatbot-msg-time';
    ts.textContent = timeNow();

    div.appendChild(bubble);
    div.appendChild(ts);
    dom.messages.appendChild(div);
    scrollToBottom();
    return div;
  }

  function appendTyping() {
    const div = document.createElement('div');
    div.className = 'chatbot-msg bot';
    div.id = 'chatbotTyping';
    div.innerHTML = `
      <div class="chatbot-typing">
        <span></span><span></span><span></span>
      </div>`;
    dom.messages.appendChild(div);
    scrollToBottom();
    return div;
  }

  function removeTyping() {
    const el = document.getElementById('chatbotTyping');
    if (el) el.remove();
  }

  function scrollToBottom() {
    dom.messages.scrollTop = dom.messages.scrollHeight;
  }

  // Appends a bot message after a typing delay
  function botReply(content, isHTML = false, delay = CHATBOT_CONFIG.typingDelayMs) {
    return new Promise(resolve => {
      appendTyping();
      setTimeout(() => {
        removeTyping();
        appendMessage('bot', content, isHTML);
        resolve();
      }, delay);
    });
  }

  // Append interactive options
  function appendOptions(optionsArr, onSelect) {
    const div = document.createElement('div');
    div.className = 'chatbot-msg bot';
    div.id = 'chatbotOptionsMsg';

    const optContainer = document.createElement('div');
    optContainer.className = 'chatbot-options';

    optionsArr.forEach(opt => {
      const btn = document.createElement('button');
      btn.type      = 'button';
      btn.className = `chatbot-option-btn ${opt.cls || ''}`;
      btn.textContent = opt.label;
      btn.setAttribute('aria-label', opt.label);
      btn.addEventListener('click', () => {
        // Remove options message
        div.remove();
        onSelect(opt);
      });
      optContainer.appendChild(btn);
    });

    div.appendChild(optContainer);
    dom.messages.appendChild(div);
    scrollToBottom();
    return div;
  }

  function removeOptions() {
    const el = document.getElementById('chatbotOptionsMsg');
    if (el) el.remove();
  }

  /* =========================================================================
     SECTION K — INPUT AREA CONTROL
     ========================================================================= */

  function showInput(placeholder = '', hint = '') {
    dom.inputArea.classList.remove('chatbot-hidden');
    dom.input.placeholder = placeholder;
    dom.inputHint.textContent = hint || 'Press Enter to send';
    dom.input.value = '';
    dom.input.style.height = 'auto';
    dom.input.focus();
  }

  function hideInput() {
    dom.inputArea.classList.add('chatbot-hidden');
  }

  function getInputValue() {
    return dom.input.value.trim();
  }

  function clearInput() {
    dom.input.value = '';
    dom.input.style.height = 'auto';
  }

  /* =========================================================================
     SECTION L — CHATBOT FLOW STEPS
     ========================================================================= */

  /* --- STEP 0: Language Selection --- */
  async function stepLanguage() {
    state.step      = 'language';
    state.stepIndex = 0;
    renderProgress();
    hideInput();
    await botReply(STRINGS.en.welcome);
    await botReply(STRINGS.en.chooseLanguage, false, 400);
    appendOptions([
      { label: '🇬🇧 English', value: 'en', cls: '' },
      { label: '🇮🇳 हिंदी',   value: 'hi', cls: '' },
    ], onLanguageSelect);
  }

  function onLanguageSelect(opt) {
    state.lang = opt.value;
    appendMessage('user', opt.label);
    saveSession();
    // Update header sub-text
    dom.statusText.textContent = t('onlineStatus');
    stepProducts();
  }

  /* --- STEP 1: Product Selection --- */
  async function stepProducts() {
    state.step      = 'products';
    state.stepIndex = 1;
    renderProgress();
    hideInput();

    await botReply(t('showProducts'));

    // Render product cards
    const cardContainer = document.createElement('div');
    cardContainer.className = 'chatbot-msg bot chatbot-fade-in';
    const productList = document.createElement('div');
    productList.className = 'chatbot-product-list';
    productList.id = 'chatbotProductList';

    CHATBOT_PRODUCTS.forEach(product => {
      const isSelected = state.selectedProducts.some(sp => sp.product.id === product.id);

      const card = document.createElement('div');
      card.className = `chatbot-product-card ${isSelected ? 'selected' : ''}`;
      card.dataset.productId = product.id;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-pressed', isSelected ? 'true' : 'false');

      card.innerHTML = `
        <img class="chatbot-product-img" src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="chatbot-product-info">
          <div class="chatbot-product-name">${getProductName(product)}</div>
          <div class="chatbot-product-weight">${product.variants[0].label}</div>
          <div class="chatbot-product-price">₹${product.variants[0].price}</div>
        </div>
        ${!isSelected ? `<div class="chatbot-product-badge">${product.badge}</div>` : ''}
        <div class="chatbot-product-check">${svgIcon('check')}</div>
      `;

      card.addEventListener('click', () => toggleProductSelection(card, product));
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') toggleProductSelection(card, product); });

      productList.appendChild(card);
    });

    cardContainer.appendChild(productList);
    dom.messages.appendChild(cardContainer);
    scrollToBottom();

    // Continue button
    await new Promise(resolve => setTimeout(resolve, 300));
    appendOptions([
      { label: t('continueProducts'), cls: 'gold', value: 'continue' }
    ], opt => {
      if (opt.value === 'continue') {
        if (state.selectedProducts.length === 0) {
          botReply(t('noProductSelected'));
          setTimeout(() => appendOptions([
            { label: t('continueProducts'), cls: 'gold', value: 'continue' }
          ], onProductContinue), 800);
          return;
        }
        onProductContinue(opt);
      }
    });
  }

  function onProductContinue(_opt) {
    if (state.selectedProducts.length === 0) {
      botReply(t('noProductSelected'));
      return;
    }
    // Reset qty for any newly selected products without qty
    state.selectedProducts = state.selectedProducts.map(sp => ({
      ...sp,
      variant: sp.variant || sp.product.variants[0],
      qty: sp.qty || null,
    }));
    state.pendingProductIdx = 0;
    stepVariantOrQty();
  }

  function toggleProductSelection(card, product) {
    const existIdx = state.selectedProducts.findIndex(sp => sp.product.id === product.id);
    if (existIdx > -1) {
      // Deselect
      state.selectedProducts.splice(existIdx, 1);
      card.classList.remove('selected');
      card.setAttribute('aria-pressed', 'false');
      const badge = card.querySelector('.chatbot-product-badge');
      if (!badge) {
        const newBadge = document.createElement('div');
        newBadge.className = 'chatbot-product-badge';
        newBadge.textContent = product.badge;
        card.appendChild(newBadge);
      }
    } else {
      // Select
      state.selectedProducts.push({ product, variant: null, qty: null });
      card.classList.add('selected');
      card.setAttribute('aria-pressed', 'true');
      const badge = card.querySelector('.chatbot-product-badge');
      if (badge) badge.remove();
    }
    saveSession();
  }

  /* --- STEP 2: Variant + Quantity per product --- */
  async function stepVariantOrQty() {
    state.step      = 'qty';
    state.stepIndex = 2;
    renderProgress();
    hideInput();

    const idx = state.pendingProductIdx;
    if (idx >= state.selectedProducts.length) {
      // All products done
      stepCollectDetails();
      return;
    }

    const item = state.selectedProducts[idx];

    // If product has only 1 variant, auto-select it
    if (item.product.variants.length === 1 && !item.variant) {
      item.variant = item.product.variants[0];
    }

    // If variant not yet selected AND >1 variant, ask
    if (!item.variant && item.product.variants.length > 1) {
      await stepChooseVariant(idx);
      return;
    }

    // Ask quantity
    await stepEnterQty(idx);
  }

  async function stepChooseVariant(idx) {
    const item = state.selectedProducts[idx];
    const msg  = t('chooseVariant').replace('{product}', getProductName(item.product));
    await botReply(msg);

    const container = document.createElement('div');
    container.className = 'chatbot-msg bot chatbot-fade-in';
    const varGroup = document.createElement('div');
    varGroup.className = 'chatbot-variant-group';

    item.product.variants.forEach(v => {
      const card = document.createElement('div');
      card.className = 'chatbot-variant-card';
      card.innerHTML = `
        <div>
          <div class="chatbot-variant-name">${getVariantLabel(v)}</div>
          <div class="chatbot-variant-detail">${v.weight}</div>
        </div>
        <div class="chatbot-variant-price">₹${v.price}</div>
      `;
      card.addEventListener('click', () => {
        container.remove();
        item.variant = v;
        appendMessage('user', `${getVariantLabel(v)} — ₹${v.price}`);
        saveSession();
        stepEnterQty(idx);
      });
      varGroup.appendChild(card);
    });

    container.appendChild(varGroup);
    dom.messages.appendChild(container);
    scrollToBottom();
  }

  async function stepEnterQty(idx) {
    const item = state.selectedProducts[idx];
    const msg  = t('enterQty')
      .replace('{product}', getProductName(item.product))
      .replace('{variant}', getVariantLabel(item.variant));

    await botReply(msg);

    // Show qty stepper + confirm button
    const stepperDiv = document.createElement('div');
    stepperDiv.className = 'chatbot-msg bot chatbot-fade-in';
    stepperDiv.id = 'chatbotQtyWidget';

    let qty = item.qty || 1;

    stepperDiv.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px;">
        <div class="chatbot-qty-stepper">
          <button type="button" class="chatbot-qty-btn" id="qtyMinus">−</button>
          <div class="chatbot-qty-num" id="qtyDisplay">${qty}</div>
          <button type="button" class="chatbot-qty-btn" id="qtyPlus">+</button>
        </div>
        <div class="chatbot-form-hint">${t('qtyHint')}</div>
      </div>
    `;
    dom.messages.appendChild(stepperDiv);
    scrollToBottom();

    document.getElementById('qtyMinus').addEventListener('click', () => {
      if (qty > 1) { qty--; document.getElementById('qtyDisplay').textContent = qty; }
    });
    document.getElementById('qtyPlus').addEventListener('click', () => {
      qty++;
      document.getElementById('qtyDisplay').textContent = qty;
    });

    // Also allow text input for large quantities
    showInput(t('qtyHint'), t('qtyHint'));

    // Confirm qty button
    appendOptions([
      { label: `✓ ${t('continueProducts').replace('→','').trim()}`, cls: 'gold', value: 'confirmQty' }
    ], opt => {
      if (opt.value === 'confirmQty') {
        // Read from stepper (or text input if filled)
        const inputVal = getInputValue();
        if (inputVal) {
          const parsed = parseInt(inputVal, 10);
          if (!isNaN(parsed) && parsed > 0) qty = parsed;
          else {
            botReply(t('qtyError'));
            return;
          }
        }
        stepperDiv.remove();
        hideInput();
        const unitPrice = item.variant.price;
        const label     = `${qty} × ${getProductName(item.product)} (${getVariantLabel(item.variant)}) = ₹${qty * unitPrice}`;
        appendMessage('user', label);
        item.qty = qty;
        saveSession();
        state.pendingProductIdx++;
        stepVariantOrQty();
      }
    });
  }

  /* --- STEP 3: Collect Customer Details --- */
  async function stepCollectDetails() {
    state.step      = 'details';
    state.stepIndex = 3;
    renderProgress();
    hideInput();

    await botReply(t('collectDetails'));
    state.detailField = 'name';
    await askDetailField('name');
  }

  async function askDetailField(field) {
    state.detailField = field;
    hideInput();
    const askKey = {
      name:    'askName',
      phone:   'askPhone',
      address: 'askAddress',
      city:    'askCity',
      state_:  'askState',
      pin:     'askPin',
      email:   'askEmail',
    }[field];

    await botReply(t(askKey || 'askName'));

    if (field === 'email') {
      appendOptions([{ label: t('skipBtn'), cls: '', value: 'skip' }], opt => {
        if (opt.value === 'skip') {
          appendMessage('user', '(skipped)');
          state.customerDetails.email = '';
          advanceDetailField();
        }
      });
    }

    const placeholder = {
      name:    'Ramesh Kumar',
      phone:   '+91 98765 43210',
      address: '123 MG Road, Apartment 4B',
      city:    'Patna',
      state_:  'Bihar',
      pin:     '800001',
      email:   'ramesh@example.com',
    }[field] || '';

    showInput(placeholder);
  }

  function onDetailSubmit(value) {
    const field = state.detailField;
    let errKey = null;

    if (field === 'name')    { if (!value || value.length < 2) errKey = 'nameError'; }
    if (field === 'phone')   { if (!validatePhone(value)) errKey = 'phoneError'; }
    if (field === 'address') { if (!value || value.length < 5) errKey = 'addressError'; }
    if (field === 'city')    { if (!value) errKey = 'cityError'; }
    if (field === 'state_')  { if (!value) errKey = 'stateError'; }
    if (field === 'pin')     { if (!validatePin(value)) errKey = 'pinError'; }
    if (field === 'email')   { if (value && !validateEmail(value)) errKey = 'emailError'; }

    if (errKey) {
      appendMessage('user', value);
      botReply(t(errKey));
      setTimeout(() => {
        clearInput();
        if (field === 'email') {
          appendOptions([{ label: t('skipBtn'), cls: '', value: 'skip' }], opt => {
            if (opt.value === 'skip') {
              state.customerDetails.email = '';
              advanceDetailField();
            }
          });
        }
        showInput();
      }, 600);
      return;
    }

    appendMessage('user', value);
    clearInput();

    // Map 'state_' field key → storage key 'state'
    const storeKey = field === 'state_' ? 'state' : field;
    state.customerDetails[storeKey] = value;
    saveSession();
    advanceDetailField();
  }

  function advanceDetailField() {
    hideInput();
    const order   = ['name', 'phone', 'address', 'city', 'state_', 'pin', 'email'];
    const curIdx  = order.indexOf(state.detailField);
    const nextIdx = curIdx + 1;

    if (nextIdx >= order.length) {
      // All details collected
      stepSummary();
      return;
    }
    setTimeout(() => askDetailField(order[nextIdx]), 400);
  }

  /* --- STEP 4: Summary & Confirmation --- */
  async function stepSummary() {
    state.step      = 'summary';
    state.stepIndex = 4;
    renderProgress();
    hideInput();

    if (!state.orderEnquiryId) {
      state.orderEnquiryId = generateOrderId();
    }
    saveSession();

    const summaryHTML = buildSummaryHTML();
    await botReply(summaryHTML, true, 500);

    appendOptions([
      { label: t('confirmBtn'), cls: 'gold',   value: 'confirm' },
      { label: t('editBtn'),    cls: 'danger',  value: 'edit'    },
    ], onSummaryAction);
  }

  function buildSummaryHTML() {
    const cd    = state.customerDetails;
    const items = state.selectedProducts;
    const now   = formatDateTime(new Date());
    const lang  = state.lang === 'hi' ? 'हिंदी' : 'English';

    let productsRows = '';
    let grandTotal   = 0;

    items.forEach(item => {
      const subtotal = item.variant.price * item.qty;
      grandTotal += subtotal;
      productsRows += `
        <div class="chatbot-summary-product-row chatbot-summary-row">
          <span class="label">${getProductName(item.product)}</span>
          <span class="value">${item.qty} × ₹${item.variant.price} = ₹${subtotal}</span>
        </div>`;
    });

    return `
      <div class="chatbot-summary">
        <div class="chatbot-summary-header">
          ${svgIcon('summary')}
          <div class="chatbot-summary-title">${t('summaryTitle')}</div>
        </div>
        <div class="chatbot-summary-body">
          <div class="chatbot-summary-id">${t('summaryOrderId')}: ${state.orderEnquiryId}</div>

          <div class="chatbot-summary-row">
            <span class="label">${t('summaryLang')}</span>
            <span class="value">${lang}</span>
          </div>
          <div class="chatbot-summary-divider"></div>

          <div class="chatbot-summary-row">
            <span class="label">${t('summaryProducts')}</span>
          </div>
          ${productsRows}
          <div class="chatbot-summary-row" style="font-weight:700;">
            <span class="label">Total</span>
            <span class="value" style="color:#C9A45C;">₹${grandTotal}</span>
          </div>
          <div class="chatbot-summary-divider"></div>

          <div class="chatbot-summary-row">
            <span class="label">${t('summaryName')}</span>
            <span class="value">${cd.name || '—'}</span>
          </div>
          <div class="chatbot-summary-row">
            <span class="label">${t('summaryPhone')}</span>
            <span class="value">${cd.phone || '—'}</span>
          </div>
          <div class="chatbot-summary-row">
            <span class="label">${t('summaryAddress')}</span>
            <span class="value">${cd.address || '—'}, ${cd.city || ''}, ${cd.state || ''} - ${cd.pin || ''}</span>
          </div>
          ${cd.email ? `<div class="chatbot-summary-row">
            <span class="label">${t('summaryEmail')}</span>
            <span class="value">${cd.email}</span>
          </div>` : ''}
          <div class="chatbot-summary-row">
            <span class="label">${t('summaryDate')}</span>
            <span class="value">${now}</span>
          </div>

          <div class="chatbot-disclaimer">${t('disclaimer')}</div>
        </div>
      </div>`;
  }

  async function onSummaryAction(opt) {
    if (opt.value === 'edit') {
      appendMessage('user', t('editBtn'));
      // Go back to collecting details
      state.customerDetails = {};
      state.step      = 'details';
      state.stepIndex = 3;
      renderProgress();
      await botReply(t('collectDetails'), false, 400);
      state.detailField = 'name';
      askDetailField('name');
      return;
    }

    if (opt.value === 'confirm') {
      if (state.submitting || state.submitted) return;
      state.submitting = true;
      appendMessage('user', t('confirmBtn'));
      hideInput();
      await botReply(t('submitting'), false, 300);
      await submitOrder();
    }
  }

  /* =========================================================================
     SECTION M — ORDER SUBMISSION (API + WhatsApp)
     ========================================================================= */

  function buildOrderPayload() {
    const cd = state.customerDetails;
    return {
      enquiryId:  state.orderEnquiryId,
      language:   state.lang,
      timestamp:  new Date().toISOString(),
      customer: {
        name:    cd.name,
        phone:   cd.phone,
        address: cd.address,
        city:    cd.city,
        state:   cd.state,
        pin:     cd.pin,
        email:   cd.email || '',
      },
      products: state.selectedProducts.map(item => ({
        productId:   item.product.id,
        productName: item.product.name,
        variant:     item.variant.label,
        variantId:   item.variant.id,
        qty:         item.qty,
        unitPrice:   item.variant.price,
        subtotal:    item.variant.price * item.qty,
      })),
      totalAmount: state.selectedProducts.reduce((s, i) => s + i.variant.price * i.qty, 0),
    };
  }

  function buildWhatsAppMessage() {
    const cd      = state.customerDetails;
    const payload = buildOrderPayload();

    let productLines = payload.products.map(p =>
      `• ${p.productName} (${p.variant}) × ${p.qty} = ₹${p.subtotal}`
    ).join('\n');

    return `*🌿 BULK ORDER ENQUIRY — Roots 2 Retails*\n` +
      `*Order ID:* ${payload.enquiryId}\n` +
      `*Date:* ${formatDateTime(new Date())}\n\n` +
      `*Customer Details:*\n` +
      `Name: ${cd.name}\n` +
      `Phone: ${cd.phone}\n` +
      `Address: ${cd.address}, ${cd.city}, ${cd.state} - ${cd.pin}\n` +
      (cd.email ? `Email: ${cd.email}\n` : '') +
      `\n*Products Ordered:*\n${productLines}\n` +
      `*Total Amount:* ₹${payload.totalAmount}\n\n` +
      `_This is a bulk enquiry. Please confirm price, availability & shipping._`;
  }

  async function submitOrder() {
    const payload    = buildOrderPayload();
    let   emailOk    = false;
    let   apiError   = null;

    // ── Call backend API ──────────────────────────────────────────────────────
    try {
      const response = await fetch(`${CHATBOT_CONFIG.apiBase}/bulk-order`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.message || `HTTP ${response.status}`);
      }

      const result = await response.json();
      emailOk = result.emailSent === true;

    } catch (err) {
      console.error('[Chatbot] API error:', err);
      apiError = err.message;
    }

    state.submitted  = true;
    state.submitting = false;
    saveSession();

    // ── Show success state ────────────────────────────────────────────────────
    await stepSuccess(emailOk, apiError);
  }

  async function stepSuccess(emailOk, apiError) {
    hideInput();

    const waMsg    = buildWhatsAppMessage();
    const waEncoded = encodeURIComponent(waMsg);
    const waLink    = `https://wa.me/${CHATBOT_CONFIG.whatsappNumber}?text=${waEncoded}`;

    const emailStatusMsg = emailOk
      ? `<div style="color:#235241;font-size:12px;margin-top:4px;">${t('emailSent')}</div>`
      : (apiError
          ? `<div style="color:#A65336;font-size:12px;margin-top:4px;">${t('emailFailed')}</div>`
          : '');

    const successHTML = `
      <div class="chatbot-success">
        <div class="chatbot-success-icon">${svgIcon('check')}</div>
        <div class="chatbot-success-title">${t('successTitle')}</div>
        <div class="chatbot-success-text">${t('successText')}</div>
        <div class="chatbot-success-id">${state.orderEnquiryId}</div>
        ${emailStatusMsg}
      </div>`;

    await botReply(successHTML, true, 300);

    // WhatsApp block
    const waHTML = `
      <div class="chatbot-success">
        <div style="font-family:'Playfair Display',serif;font-size:14px;font-weight:600;color:#163A2D;">${t('whatsappTitle')}</div>
        <div class="chatbot-whatsapp-instruction">${t('whatsappInstruct')}</div>
      </div>`;

    await botReply(waHTML, true, 600);

    appendOptions([
      { label: t('whatsappBtn'), cls: 'gold', value: 'whatsapp' },
      { label: t('newOrder'),    cls: '',     value: 'newOrder'  },
    ], opt => {
      if (opt.value === 'whatsapp') {
        window.open(waLink, '_blank', 'noopener,noreferrer');
        // Keep chatbot open so user can see the instruction
        setTimeout(() => {
          appendMessage('bot', t('whatsappInstruct').replace('📱 ', ''));
        }, 800);
      }
      if (opt.value === 'newOrder') {
        resetChatbot();
      }
    });
  }

  /* =========================================================================
     SECTION N — RESET / RESTART
     ========================================================================= */

  function resetChatbot() {
    try { sessionStorage.removeItem(CHATBOT_CONFIG.sessionKey); } catch (_) {}
    state = {
      open:               state.open,
      lang:               null,
      step:               'language',
      selectedProducts:   [],
      pendingProductIdx:  0,
      customerDetails:    {},
      orderEnquiryId:     null,
      submitted:          false,
      submitting:         false,
      stepIndex:          0,
      historyStack:       [],
      detailField:        null,
      detailOrder:        ['name','phone','address','city','state','pin','email'],
      pendingVariantForProductId: null,
    };
    dom.messages.innerHTML = '';
    hideInput();
    stepLanguage();
  }

  /* =========================================================================
     SECTION O — OPEN / CLOSE TOGGLE
     ========================================================================= */

  function openChatbot() {
    state.open = true;
    dom.window.classList.add('chatbot-open');
    dom.trigger.setAttribute('aria-expanded', 'true');
    dom.triggerBadge.classList.remove('visible');
    saveSession();
    // If first open, start flow
    if (dom.messages.children.length === 0) {
      stepLanguage();
    }
  }

  function closeChatbot() {
    state.open = false;
    dom.window.classList.remove('chatbot-open');
    dom.trigger.setAttribute('aria-expanded', 'false');
    saveSession();
  }

  /* =========================================================================
     SECTION P — EVENT LISTENERS
     ========================================================================= */

  function bindEvents() {
    // Open/close
    dom.trigger.addEventListener('click', () => state.open ? closeChatbot() : openChatbot());
    dom.closeBtn.addEventListener('click', closeChatbot);

    // Back button — simple reset of last step (or close if at start)
    dom.backBtn.addEventListener('click', () => {
      if (state.step === 'language' || state.stepIndex === 0) {
        closeChatbot();
        return;
      }
      if (state.step === 'products') { resetChatbot(); return; }
      if (state.step === 'qty')      {
        // Go back to products
        state.selectedProducts = [];
        dom.messages.innerHTML = '';
        hideInput();
        state.step = 'language';
        state.stepIndex = 0;
        renderProgress();
        setTimeout(stepProducts, 300);
        return;
      }
      if (state.step === 'details')  {
        // Go back to qty
        state.customerDetails  = {};
        dom.messages.innerHTML = '';
        hideInput();
        state.pendingProductIdx = 0;
        state.selectedProducts  = state.selectedProducts.map(sp => ({ ...sp, qty: null }));
        setTimeout(stepVariantOrQty, 300);
        return;
      }
      if (state.step === 'summary')  {
        // Go back to details
        state.customerDetails = {};
        dom.messages.innerHTML = '';
        hideInput();
        setTimeout(stepCollectDetails, 300);
        return;
      }
    });

    // Send button / Enter key
    dom.sendBtn.addEventListener('click', handleSend);
    dom.input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });

    // Auto-resize textarea
    dom.input.addEventListener('input', () => {
      dom.input.style.height = 'auto';
      dom.input.style.height = Math.min(dom.input.scrollHeight, 120) + 'px';
    });

    // Close on outside click (desktop)
    document.addEventListener('click', e => {
      if (state.open &&
          !dom.window.contains(e.target) &&
          !dom.trigger.contains(e.target)) {
        closeChatbot();
      }
    }, true);

    // Keyboard: Escape closes
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && state.open) closeChatbot();
    });
  }

  function handleSend() {
    const val = getInputValue();
    if (!val) return;

    // Route to correct handler based on current step
    if (state.step === 'details' && state.detailField) {
      onDetailSubmit(val);
    } else if (state.step === 'qty') {
      // They may type the qty in the input
      const parsed = parseInt(val, 10);
      if (isNaN(parsed) || parsed < 1) {
        appendMessage('user', val);
        clearInput();
        botReply(t('qtyError'));
        return;
      }
      appendMessage('user', val);
      clearInput();
      const item = state.selectedProducts[state.pendingProductIdx];
      if (item) {
        item.qty = parsed;
        // Close the stepper if visible
        const stepperEl = document.getElementById('chatbotQtyWidget');
        if (stepperEl) stepperEl.remove();
        removeOptions();
        saveSession();
        state.pendingProductIdx++;
        stepVariantOrQty();
      }
    } else {
      appendMessage('user', val);
      clearInput();
    }
  }

  /* =========================================================================
     SECTION Q — INIT
     ========================================================================= */

  function init() {
    buildChatbotHTML();
    cacheDom();
    bindEvents();
    renderProgress();
    // Show badge after 3 seconds to attract attention
    setTimeout(() => {
      if (!state.open) {
        dom.triggerBadge.classList.add('visible');
      }
    }, 3000);
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
