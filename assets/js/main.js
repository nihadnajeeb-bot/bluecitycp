const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Count-up stats when visible
function animateCountUp(element, target, suffix) {
  const durationMs = 1200;
  const start = 0;
  const startTime = performance.now();

  function frame(now) {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const value = Math.floor(start + (target - start) * progress);
    element.textContent = suffix ? `${value}${suffix}` : String(value);
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function setupCountUps() {
  const counters = document.querySelectorAll('[data-countup]');
  if (!counters.length) return;

  const seen = new WeakSet();
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (seen.has(el)) return;
        seen.add(el);
        const target = Number(el.getAttribute('data-target')) || 0;
        const suffix = el.getAttribute('data-suffix') || '';
        animateCountUp(el, target, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', setupCountUps);

// Shake effect on widgets when scrolling
function setupShakeEffect() {
  const widgets = document.querySelectorAll('.card, .stat');
  if (!widgets.length) return;

  const seen = new WeakSet();
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (seen.has(el)) return;
        seen.add(el);
        
        // Add shake class
        el.classList.add('shake-effect');
        
        // Keep the class to maintain opacity (forwards fill-mode handles this, but we keep it for safety)
        
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  widgets.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', setupShakeEffect);

// ------------------------------------------------------------
// Project details rendering
// ------------------------------------------------------------
const PROJECT_FALLBACK_IMAGE = 'assets/images/logo.png';

const ProjectData = {
  // Example entries. Replace or extend with real project data and images.
  'project-1': {
    title: 'White Swan Refurbishment',
    client: 'White Swan LLC',
    duration: 'Jan 2024 – Mar 2024',
    brief: 'Refurbishment of lobby and common areas with modern finishes and HVAC upgrades.',
    imagesFolder: 'Project-1'
  },
  'project-2': {
    title: 'Yeamne Villa',
    client: 'Private Client',
    duration: 'Apr 2024 – Jul 2024',
    brief: 'Full villa makeover including duct cleaning, HVAC maintenance, and interior redesign.',
    imagesFolder: 'Project-2'
  },
  'project-3': {
    title: 'Cloud Space',
    client: 'Cloud Space Co.',
    duration: 'Aug 2024 – Oct 2024',
    brief: 'Open-plan office renovation with structural alterations and new MEP layout.',
    imagesFolder: 'Project-3'
  },
  'project-9': {
    title: 'Project 9',
    client: 'Private Client',
    duration: '2024',
    brief: 'Design and renovation project.',
    imagesFolder: 'Project-9'
  },
  'project-11': {
    title: 'Project 11',
    client: 'Private Client',
    duration: '2024',
    brief: 'Design and renovation project.',
    imagesFolder: 'Project-11'
  }
};

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Lightbox helpers with navigation
let lightboxEl = null;
function ensureLightbox() {
  if (lightboxEl) return lightboxEl;
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = 'rgba(0,0,0,0.9)';
  overlay.style.display = 'none';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '9999';
  overlay.style.cursor = 'zoom-out';

  const img = document.createElement('img');
  img.style.maxWidth = '92%';
  img.style.maxHeight = '92%';
  img.style.boxShadow = '0 10px 30px rgba(0,0,0,0.6)';
  img.alt = '';

  // Prev/Next buttons
  const btnStyle = 'position:absolute;top:50%;transform:translateY(-50%);background:rgba(0,0,0,0.6);color:#fff;border:0;border-radius:999px;width:44px;height:44px;cursor:pointer;font-size:22px;display:flex;align-items:center;justify-content:center;user-select:none;';
  const prevBtn = document.createElement('button');
  prevBtn.setAttribute('aria-label', 'Previous image');
  prevBtn.style.cssText = btnStyle + 'left:16px;';
  prevBtn.textContent = '‹';

  const nextBtn = document.createElement('button');
  nextBtn.setAttribute('aria-label', 'Next image');
  nextBtn.style.cssText = btnStyle + 'right:16px;';
  nextBtn.textContent = '›';

  overlay.appendChild(img);
  overlay.appendChild(prevBtn);
  overlay.appendChild(nextBtn);
  document.body.appendChild(overlay);

  function close() {
    overlay.style.display = 'none';
    img.src = '';
    overlay._images = null;
    overlay._index = -1;
    document.removeEventListener('keydown', onKey);
  }
  function onKey(e) {
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') showAt(overlay._index + 1);
    if (e.key === 'ArrowLeft') showAt(overlay._index - 1);
  }
  function showAt(idx) {
    const list = overlay._images || [];
    if (!list.length) return;
    const mod = (idx % list.length + list.length) % list.length; // wrap
    overlay._index = mod;
    img.src = list[mod];
  }

  overlay.addEventListener('click', close);
  prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showAt(overlay._index - 1); });
  nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showAt(overlay._index + 1); });

  lightboxEl = overlay;
  lightboxEl._img = img;
  lightboxEl._showAt = showAt;
  lightboxEl._onKey = onKey;
  return lightboxEl;
}

function openLightbox(images, startIndex, alt) {
  const lb = ensureLightbox();
  lb._images = Array.isArray(images) ? images.slice() : images ? [images] : [];
  lb._index = Math.max(0, Math.min(startIndex || 0, lb._images.length - 1));
  lb._img.alt = alt || '';
  lb.style.display = 'flex';
  lb._showAt(lb._index);
  document.addEventListener('keydown', lb._onKey);
}

// Auto-discovery utilities
function guessPrefixFromId(projectId) {
  // 'project-3' -> 'project3-'
  return projectId.replace(/-/g, '') + '-';
}

function preloadImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

const DISCOVER_EXTS = ['jpeg', 'jpg', 'png', 'webp', 'JPEG', 'JPG', 'PNG', 'WEBP'];

async function tryFile(urlBase, number) {
  for (const ext of DISCOVER_EXTS) {
    const url = `${urlBase}${number}.${ext}`;
    // eslint-disable-next-line no-await-in-loop
    const ok = await preloadImage(url);
    if (ok) return url;
  }
  return null;
}

async function autoDiscoverImagesByPrefix(prefix, limit = 80) {
  const base = 'assets/images/Projects/';
  const found = [];
  for (let n = 1; n <= limit; n++) {
    const hit = await tryFile(`${base}${prefix}`, n);
    if (hit) found.push(hit);
  }
  return found;
}

async function autoDiscoverImagesInFolder(folder, limit = 80) {
  const base = `assets/images/Projects/${folder}/`;
  const found = [];
  for (let n = 1; n <= limit; n++) {
    const hit = await tryFile(base, n);
    if (hit) found.push(hit);
  }
  return found;
}

async function resolveProjectImages(projectId, data) {
  // Priority: explicit images -> imagesFolder -> fallback to folder named projectId -> autoPrefix -> guessed prefix
  if (data.images && data.images.length) return data.images;
  if (data.imagesFolder) {
    const list = await autoDiscoverImagesInFolder(data.imagesFolder, 80);
    if (list.length) return list;
  }
  // Try folder named like the projectId by default
  const defaultFolderList = await autoDiscoverImagesInFolder(projectId, 80);
  if (defaultFolderList.length) return defaultFolderList;

  const prefix = data.autoPrefix || guessPrefixFromId(projectId);
  const list = await autoDiscoverImagesByPrefix(prefix, 80);
  return list;
}

async function renderProjectDetail() {
  const container = document.getElementById('project-detail');
  if (!container) return; // Not on project page

  const id = getQueryParam('id');
  const data = id && ProjectData[id] || {};

  const titleEl = document.getElementById('project-title');
  const metaEl = document.getElementById('project-meta');
  const briefEl = document.getElementById('project-brief');
  const photosEl = document.getElementById('project-photos');
  const coverEl = document.getElementById('project-cover');

  if (titleEl) titleEl.textContent = data.title || '';
  if (metaEl && (data.client || data.duration)) metaEl.textContent = `Client: ${data.client || '—'} • Timeframe: ${data.duration || '—'}`;
  if (briefEl && data.brief) briefEl.textContent = data.brief;

  // Resolve images
  const images = await resolveProjectImages(id, data);
  data.images = images;
  if (!data.cover && images && images.length) data.cover = images[0];

  // Render cover image
  if (coverEl) {
    coverEl.innerHTML = '';
    const src = data.cover || PROJECT_FALLBACK_IMAGE;
    const img = document.createElement('img');
    img.src = src;
    img.alt = data.title || id;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.cursor = 'zoom-in';
    img.onerror = () => { img.onerror = null; img.src = PROJECT_FALLBACK_IMAGE; };
    img.addEventListener('click', () => openLightbox(images && images.length ? images : src, 0, data.title || id));
    coverEl.appendChild(img);
  }

  if (photosEl) {
    photosEl.innerHTML = '';
    (images || []).forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      const img = document.createElement('img');
      img.className = 'card-img';
      img.alt = data.title || id;
      img.src = src;
      img.loading = 'lazy';
      img.onerror = () => {
        img.onerror = null;
        img.src = PROJECT_FALLBACK_IMAGE;
      };
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(images, idx, data.title || id));
      card.appendChild(img);
      photosEl.appendChild(card);
    });
  }
}

async function renderGalleryThumbnails() {
  const cards = document.querySelectorAll('[data-project-id]');
  if (!cards.length) return;
  for (const card of cards) {
    const projectId = card.getAttribute('data-project-id');
    const imgEl = card.querySelector('img.card-img');
    if (!imgEl) continue;
    const data = ProjectData[projectId] || {};

    let images = data.images;
    if (!images || !images.length || data.imagesFolder || data.autoPrefix) {
      // eslint-disable-next-line no-await-in-loop
      images = await resolveProjectImages(projectId, data);
    }

    const src = (data.cover) || (images && images[0]) || PROJECT_FALLBACK_IMAGE;
    imgEl.src = src;
    imgEl.alt = data.title || projectId;
    imgEl.loading = 'lazy';
    imgEl.onerror = () => { imgEl.onerror = null; imgEl.src = PROJECT_FALLBACK_IMAGE; };
  }
}

// Live Google rating: fetch from serverless function and update footer block
async function loadGoogleRating() {
  const block = document.querySelector('.google-rating-block[data-google-rating-api]');
  if (!block) return;
  const apiUrl = block.getAttribute('data-google-rating-api') || '/.netlify/functions/get-google-rating';
  const valueEl = document.getElementById('js-google-rating-value');
  const countEl = document.getElementById('js-google-rating-count');
  const starsEl = document.getElementById('js-google-rating-stars');
  if (!valueEl || !countEl) return;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) return;
    const data = await res.json();
    if (data.rating != null) {
      valueEl.textContent = Number(data.rating).toFixed(1);
      if (starsEl) {
        const r = Math.min(5, Math.max(0, Number(data.rating)));
        const full = Math.round(r);
        starsEl.textContent = '\u2605'.repeat(full) + '\u2606'.repeat(5 - full);
      }
    }
    if (data.user_ratings_total != null) {
      countEl.textContent = String(Math.max(0, Math.floor(Number(data.user_ratings_total))));
    }
  } catch (_) {
    valueEl.textContent = '—';
    countEl.textContent = '—';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectDetail();
  renderGalleryThumbnails();
  loadGoogleRating();
});



