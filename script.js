// ==================== CITY DATA ====================
const CITIES = [
  { name: "Tashkent", country: "Uzbekistan", flag: "🇺🇿", pm25: 38.1, aqi: 107, nafas: 24 },
  { name: "Ferghana", country: "Uzbekistan", flag: "🇺🇿", pm25: 71.2, aqi: 158, nafas: 2 },
  { name: "Samarkand", country: "Uzbekistan", flag: "🇺🇿", pm25: 42.0, aqi: 118, nafas: 8 },
  { name: "Delhi", country: "India", flag: "🇮🇳", pm25: 85.2, aqi: 175, nafas: 156 },
  { name: "Lahore", country: "Pakistan", flag: "🇵🇰", pm25: 92.1, aqi: 191, nafas: 31 },
  { name: "Dhaka", country: "Bangladesh", flag: "🇧🇩", pm25: 78.4, aqi: 162, nafas: 43 },
  { name: "Beijing", country: "China", flag: "🇨🇳", pm25: 45.0, aqi: 126, nafas: 89 },
  { name: "Tokyo", country: "Japan", flag: "🇯🇵", pm25: 12.0, aqi: 51, nafas: 88 },
  { name: "London", country: "UK", flag: "🇬🇧", pm25: 12.0, aqi: 51, nafas: 22 },
  { name: "New York", country: "USA", flag: "🇺🇸", pm25: 10.0, aqi: 42, nafas: 45 }
];

let LIVE = CITIES.map(c => ({ ...c, pm25: +(c.pm25 + (Math.random() - 0.5) * 1.5).toFixed(1) }));

// ==================== UTILITIES ====================
function getAQIColor(aqi) {
  if (aqi <= 50) return '#00e887';
  if (aqi <= 100) return '#ffe840';
  if (aqi <= 150) return '#ff9500';
  if (aqi <= 200) return '#ff3b3b';
  if (aqi <= 300) return '#c060ff';
  return '#8b0000';
}

function toast(msg, type = 'i') {
  const container = document.getElementById('toastContainer');
  const toastEl = document.createElement('div');
  toastEl.className = `toast ${type}`;
  const icons = { i: 'ℹ️', s: '✅', e: '❌', w: '⚠️' };
  toastEl.innerHTML = `<span>${icons[type] || 'ℹ️'}</span><span>${msg}</span>`;
  container.appendChild(toastEl);
  setTimeout(() => {
    toastEl.style.opacity = '0';
    setTimeout(() => toastEl.remove(), 300);
  }, 4000);
}

// ==================== SCROLL REVEAL ANIMATION ====================
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealThreshold = 100;
    
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = revealThreshold;
      
      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        // Optional: remove class when scrolling up (uncomment if desired)
        // element.classList.remove('active');
      }
    });
  };
  
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load
}

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('on'));
  document.getElementById(`page-${pageId}`).classList.add('on');
  document.querySelectorAll('.nl, .mn-link').forEach(el => el.classList.remove('on'));
  document.querySelectorAll(`[data-page="${pageId}"]`).forEach(el => el.classList.add('on'));
  window.scrollTo(0, 0);
}

// ==================== THEME ====================
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeBtn = document.getElementById('themeBtn');
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
}

// ==================== TICKER ====================
function updateTicker() {
  const ticker = document.getElementById('tickerTrack');
  if (!ticker) return;
  const topCities = [...LIVE].sort((a, b) => b.aqi - a.aqi).slice(0, 12);
  const html = topCities.map(c => `
    <div class="ti">
      <div class="ti-dot" style="background: ${getAQIColor(c.aqi)}"></div>
      <span>${c.flag} ${c.name}</span>
      <span style="color: ${getAQIColor(c.aqi)}">AQI ${c.aqi}</span>
    </div>
  `).join('');
  ticker.innerHTML = html + html;
}

// ==================== STATS COUNTERS ====================
function animateCounters() {
  const targets = {
    statCities: LIVE.length,
    statUnits: LIVE.reduce((sum, c) => sum + c.nafas, 0),
    statDeaths: 700,
    statAlerts: 128
  };

  for (const [id, target] of Object.entries(targets)) {
    const el = document.getElementById(id);
    if (!el) continue;
    let current = 0;
    const step = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 25);
  }
}

// ==================== BUILD STATIC SECTIONS ====================
function buildEcoFlow() {
  const steps = [
    { icon: '🌀', title: 'NAFAS Filter', desc: 'Spiral cinnamon-roll core captures 85–92% of PM2.5 via centrifugal force + electrostatic ionization. Fits any diesel exhaust pipe. $49/unit.' },
    { icon: '📡', title: 'Embedded Sensor', desc: 'Plantower PM2.5 sensor inside each filter measures pollution before and after capture. Transmits data every 60 seconds via WiFi to the cloud.' },
    { icon: '☁️', title: 'NAFAS Platform', desc: 'Cloud platform aggregates all sensor readings into a live global map. Every filter is a data point. More deployments = higher resolution.' },
    { icon: '🧠', title: 'AI Action Layer', desc: 'Machine learning predicts pollution spikes 24–48h ahead. Schools, hospitals, and governments receive automatic alerts before conditions become dangerous.' }
  ];
  const container = document.getElementById('ecoFlow');
  if (container) {
    container.innerHTML = steps.map(s => `
      <div class="eco-step reveal">
        <div class="eco-icon">${s.icon}</div>
        <div class="eco-title">${s.title}</div>
        <div class="eco-desc">${s.desc}</div>
      </div>
    `).join('');
  }
}

function buildFeatures() {
  const features = [
    { icon: '🗺️', title: 'Live Global Map', desc: 'Real-time PM2.5, PM10, NOx, and AQI from 52 cities. Color-coded by WHO AQI categories.' },
    { icon: '🤖', title: 'AI Forecast Engine', desc: '48-hour PM2.5 predictions using Open-Meteo real data, traffic patterns, and weather. Updated hourly.' },
    { icon: '🏫', title: 'School Alert System', desc: '24 registered schools across 12 countries. Automatic alerts when nearby PM2.5 exceeds WHO limits.' },
    { icon: '🌀', title: 'Filter Monitoring', desc: 'Real-time performance dashboard for every deployed NAFAS unit. PM2.5 capture rates, maintenance status.' },
    { icon: '📊', title: 'Government Dashboard', desc: 'Aggregated city-level trends, historical data exports, source attribution. Free for governments.' },
    { icon: '🌐', title: 'Open Data API', desc: 'WHO, UNICEF, and researchers access the NAFAS data API. Growing network creates self-improving intelligence.' }
  ];
  const container = document.getElementById('featuresGrid');
  if (container) {
    container.innerHTML = features.map(f => `
      <div class="fg reveal">
        <div class="fg-icon">${f.icon}</div>
        <div class="fg-title">${f.title}</div>
        <div class="fg-desc">${f.desc}</div>
      </div>
    `).join('');
  }
}

function buildImpact() {
  const impacts = [
    { num: '700K', label: 'Deaths/year from vehicle exhaust', sub: 'Global figure, WHO 2024' },
    { num: '930M', label: 'Children breathing toxic air daily', sub: '7× above WHO safe limits' },
    { num: '$49', label: 'Cost per NAFAS filter unit', sub: '77× more affordable than nearest competitor' },
    { num: '92%', label: 'PM2.5 capture efficiency', sub: 'Combined centrifugal + electrostatic stages' },
    { num: '21M', label: 'Diesel vehicles in target markets', sub: 'South Asia + Central Asia fleet estimate' },
    { num: '87%', label: 'AI forecast accuracy (48h)', sub: 'Validated on 6-month pilot dataset' }
  ];
  const container = document.getElementById('impactGrid');
  if (container) {
    container.innerHTML = impacts.map(i => `
      <div class="ig reveal">
        <div class="ig-num">${i.num}</div>
        <div class="ig-label">${i.label}</div>
        <div class="ig-sub">${i.sub}</div>
      </div>
    `).join('');
  }
}

function buildFAQ() {
  const faqs = [
    { q: 'How does the NAFAS filter physically work?', a: 'The NAFAS filter uses a two-stage process. First, a spiral "cinnamon-roll" core forces exhaust gas through a curved path, creating centrifugal force that traps particles on the walls. Second, a low-voltage (3kV, 15W) electrostatic wire ionizes remaining fine particles and attracts them to collector plates. Combined capture: 85–92% of PM2.5.' },
    { q: 'Does the filter work on electric vehicles?', a: 'NAFAS filters target diesel combustion exhaust. Our primary market is the 4.6 million old diesel vehicles in Uzbekistan and 21 million across South and Central Asia.' },
    { q: 'How accurate is the real-time data?', a: 'The platform fetches live air quality data from the Open-Meteo Air Quality API. Updates occur every hour automatically.' },
    { q: 'Who can afford the NAFAS filter at $49?', a: 'Our distribution model is B2B — we sell to institutions. Municipal bus fleets, trucking companies, and school districts purchase in bulk. International organizations fund deployment in low-income communities.' },
    { q: 'How does the school alert system work?', a: 'If predicted PM2.5 near a registered school exceeds WHO daily safe limits (15 μg/m³), the system sends automated notifications to the school with specific actions.' }
  ];
  const container = document.getElementById('faqList');
  if (container) {
    container.innerHTML = faqs.map((f, i) => `
      <div class="faq-item reveal">
        <div class="faq-q" data-faq="${i}">
          ${f.q}<span class="faq-arrow">▾</span>
        </div>
        <div class="faq-a">${f.a}</div>
      </div>
    `).join('');

    document.querySelectorAll('.faq-q').forEach(q => {
      q.addEventListener('click', () => {
        q.parentElement.classList.toggle('open');
      });
    });
  }
}

function buildPartners() {
  const partners = ['🌍 UNICEF', '🏥 WHO', '🏦 World Bank', '🌿 UNDP', '🔬 Open-Meteo', '📡 Plantower', '🎓 Oxford Said'];
  const container = document.getElementById('partnersList');
  if (container) {
    container.innerHTML = partners.map(p => `<div class="partner reveal">${p}</div>`).join('');
  }
}

// ==================== SEARCH ====================
function setupSearch() {
  const searchInput = document.getElementById('navSearch');
  const searchDrop = document.getElementById('searchDrop');

  if (!searchInput || !searchDrop) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length < 2) {
      searchDrop.classList.remove('open');
      return;
    }
    const results = LIVE.filter(c => c.name.toLowerCase().includes(query) || c.country.toLowerCase().includes(query)).slice(0, 6);
    if (!results.length) {
      searchDrop.classList.remove('open');
      return;
    }
    searchDrop.innerHTML = results.map(c => `
      <div class="sd-item" data-city="${c.name}">
        <span>${c.flag} ${c.name}, ${c.country}</span>
        <span style="color: ${getAQIColor(c.aqi)}">AQI ${c.aqi}</span>
      </div>
    `).join('');
    searchDrop.classList.add('open');

    document.querySelectorAll('.sd-item').forEach(item => {
      item.addEventListener('click', () => {
        toast(`📍 ${item.querySelector('span:first-child').innerText}`, 'i');
        searchDrop.classList.remove('open');
        searchInput.value = '';
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-search-wrap')) {
      searchDrop.classList.remove('open');
    }
  });
}

// ==================== CONTACT FORM ====================
function setupContact() {
  const sendBtn = document.getElementById('sendContactBtn');
  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const name = document.getElementById('contactName')?.value.trim() || '';
      const email = document.getElementById('contactEmail')?.value.trim() || '';
      const msg = document.getElementById('contactMsg')?.value.trim() || '';
      if (!name || !email || !msg) {
        toast('Please fill all fields.', 'e');
        return;
      }
      toast('✅ Message sent! We\'ll respond within 24 hours.', 's');
      if (document.getElementById('contactName')) document.getElementById('contactName').value = '';
      if (document.getElementById('contactEmail')) document.getElementById('contactEmail').value = '';
      if (document.getElementById('contactMsg')) document.getElementById('contactMsg').value = '';
    });
  }
}

// ==================== MOBILE MENU ====================
function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
    });
  }
}

// ==================== DROPDOWN NAVIGATION (Smooth Scroll) ====================
function setupDropdownNavigation() {
  document.querySelectorAll('.dropdown-item').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Close mobile menu if open
          const mobileNav = document.getElementById('mobileNav');
          if (mobileNav) mobileNav.classList.remove('open');
        }
      }
    });
  });
}

// ==================== LIVE DATA UPDATE ====================
function startLiveUpdates() {
  setInterval(() => {
    LIVE = LIVE.map(c => ({
      ...c,
      pm25: Math.max(0.5, +(c.pm25 + (Math.random() - 0.5) * 1.2).toFixed(1))
    }));
    LIVE = LIVE.map(c => ({ ...c, aqi: Math.min(300, Math.round(c.pm25 * 2.5)) }));
    updateTicker();
  }, 60000);
}

// ==================== INITIALIZATION ====================
function init() {
  setTheme('dark');
  buildEcoFlow();
  buildFeatures();
  buildImpact();
  buildFAQ();
  buildPartners();
  updateTicker();
  animateCounters();
  setupSearch();
  setupContact();
  setupMobileMenu();
  setupDropdownNavigation();
  startLiveUpdates();
  initScrollReveal();

  // Re-initialize reveal for dynamically added elements
  setTimeout(() => {
    initScrollReveal();
  }, 500);

  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.getAttribute('data-page');
      if (page) showPage(page);
    });
  });

  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  const adminLink = document.getElementById('adminLink');
  if (adminLink) {
    adminLink.addEventListener('click', () => {
      toast('Admin panel would open here', 'i');
    });
  }
}

// Start the application
init();