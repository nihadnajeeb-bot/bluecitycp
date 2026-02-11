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
    title: 'White Swan Building Renovation - 5 Floors',
    client: 'Saeed Suhail Saeed',
    duration: 'Jan 2024 – Mar 2024',
    brief: `The refurbishment of the White Swan Building, which was nearly three decades old was aimed at enhancing the functionality, aesthetics, and overall ambiance of the building. These works included extensive civil modifications, meticulous finishing, and a fresh coat of paint to create a modern and inviting environment for occupants. The work posed numerous challenges, including, the careful demolition of existing finishes without compromising the building's structural integrity. Despite the hectic nature of the task, we completed it with ease and zero accidents.

Key Highlights:
• Demolition and waste removal: Precisely removed the finishes, false ceiling etc. preserving the integrity of the building and disposed it in the municipality yard.
• Flooring Installation: Laid high-quality flooring materials such as tiles, marble, etc. to enhance durability and visual appeal.
• Plumbing and Electrical Upgrades: Upgraded plumbing and electrical systems to ensure safety, efficiency, and compliance with modern standards. Installation of Fixtures and Fittings: Incorporated contemporary fixtures and fittings in restrooms, kitchens, and other utility areas for improved functionality and aesthetics.
• Commissioning of the services including Plumbing and Electricity.

Specifics of works done:
• Project duration: 189 Days.
• Project Description: 5 Floors / 40 Apts Total
• Manhours: 44,640 Labour-hours.
• Total Cost: AED 3,133,400.00`,
    imagesFolder: 'Project-1'
  },
  'project-2': {
    title: 'Yeamne Villa',
    client: 'Private Villa',
    duration: 'Apr 2024 – Jul 2024',
    brief: `Our team successfully completed the installation of high-quality PVC cladding on the exterior of the villa. This upgrade not only enhances the villa's visual appeal but also provides added protection against harsh weather conditions, ensuring durability and low maintenance. The installation was carried out with precision, meeting the client's expectations for both aesthetics and functionality.

Challenges and Solutions:
• The villa's exterior had some uneven areas, making it difficult to achieve a smooth and uniform cladding installation. Our team carefully leveled the surface using appropriate backing materials and adjusted the cladding panels to ensure a seamless finish.
• Unexpected weather fluctuations, such as strong winds or high temperatures, posed difficulties in handling and securing the cladding panels. Work schedules were adjusted to optimize installation during favorable weather. Hard-to-reach areas required seamless integration with existing infrastructure and services.
• Ensuring accurate alignment of the cladding panels, especially around corners and edges, required meticulous attention to detail. Our team used laser-leveling tools and precise measurement techniques to maintain alignment and achieve a professional finish.
• Properly securing the PVC cladding to withstand external elements such as wind and moisture was crucial for long-term durability. High-quality fasteners and sealants were used to reinforce the installation, ensuring a strong bond and enhanced resistance to weathering.

Key Moments:
To complete the PVC cladding installation within a limited time frame, we focused on detailed planning, efficient team coordination, and strategic resource allocation. By organizing tasks in parallel, optimizing work hours, and preparing materials in advance, we ensured smooth execution. We also adapted quickly to challenges, maintaining flexibility while sticking to the schedule. This approach allowed us to meet the deadline without compromising quality.`,
    imagesFolder: 'Project-2'
  },
  'project-3': {
    title: 'Smoke Duct – Dubai Mall',
    client: 'Cloud Space',
    duration: 'Aug 2024 – Oct 2024',
    brief: `We successfully designed and installed state-of-the-art smoke duct system at Dubai Mall, meeting the highest safety and engineering standards. This vital project was undertaken to significantly improve fire safety measures within the facility, ensuring the efficient extraction of smoke during emergencies. The installation was meticulously executed to comply with stringent local building codes and regulations, reflecting our commitment to quality, safety, and precision in every aspect of the project.

Challenges and Solutions:
• Complex Mall Layout and existing services: Mapped out the mall's intricate architecture and existing services to design an efficient smoke extraction pathway. Coordination: Collaborated closely with mall management and other contractors to minimize disruption during installation. Precision Work: Utilized advanced tools and techniques to install ducts in hard-to-reach areas, ensuring seamless integration with existing infrastructure and services.

Outcome:
• Area of ducts installed: 1900m²
• Project duration: 52 Days
• Man-hours: 3,744 Labour Hours
• Improved fire safety measures, providing a safer environment for shoppers and staff
• Successfully met project deadlines and quality benchmarks, garnering praise from mall management and safety inspectors

Top Moments:
Our workers meticulously altered the ducts to ensure precise adjustments for the final fittings. With careful planning and skilled execution, they modified the ductwork to achieve a perfect fit, ensuring optimal functionality and seamless integration. Their attention to detail and commitment to quality allowed the installation process to proceed smoothly, meeting all specifications and project requirements.`,
    imagesFolder: 'Project-3'
  },
  'project-4': {
    title: 'Painting Works - MOE Part – 2',
    client: 'Mall of Emirates',
    duration: '2024',
    brief: `Project Overview
Our team successfully executed painting works at Mall of the Emirates during night hours (12:00 AM – 6:00 AM) to ensure zero disruption to mall operations. The scope included precision painting of internal pillars, carried out with strict protection and safety measures to maintain the mall's pristine environment.

Scope of Work
• Night-time interior painting of mall pillars
• High-precision application with controlled techniques
• Full protection of floors and surrounding areas

Challenges & Solutions

1. Limited Working Timeframe
Challenge: Completing work within restricted night hours
Solution: Implemented a well-structured execution plan; deployed skilled manpower with efficient task allocation; maintained high-quality standards without delays.

2. Preventing Paint Damage
Challenge: Risk of paint spills or splashes on mall flooring and interiors
Solution: Used protective coverings and masking tapes; applied controlled spray and brush techniques; ensured continuous supervision for cleanliness and precision.

3. Elevated Work at Pillars
Challenge: Safe access to high-level pillar surfaces
Solution: Utilized secure scaffolding and lift equipment; followed strict safety protocols for workers.

Project Outcome
• Total Area Painted: 1,900 m²
• Project Duration: 8 Days
• Manhours: 840 Labour Hours

Results Achieved
• Delivered a refreshed and visually appealing interior environment
• Enhanced overall shopping experience
• Successfully met project timelines and quality benchmarks
• Received positive feedback from mall management and tenants

Top Moments
Following the successful completion of our first painting project at Mall of the Emirates, our team earned the trust and confidence of mall management, leading to the award of a second project.
The management was particularly impressed by:
• Exceptional workmanship quality
• Meticulous protection of surrounding areas
• Zero paint damage to existing interiors
• Strict adherence to tight schedules
This recognition reaffirmed our commitment to excellence and reinforced confidence in our ability to deliver complex projects under demanding conditions.`,
    imagesFolder: 'Project-5'
  },
  'project-5': {
    title: 'Painting Works – Mall of the Emirates (Part 1)',
    client: 'Mall of the Emirates',
    duration: '2024',
    brief: `Project Overview
Our team successfully executed painting works at Mall of the Emirates during night hours (12:00 AM – 6:00 AM) to ensure zero disruption to mall operations. The scope included precision painting of internal pillars, carried out with strict protection and safety measures to maintain the mall's pristine environment.

Scope of Work
• Night-time interior painting of mall pillars
• High-precision application with controlled techniques
• Full protection of floors and surrounding areas

Challenges & Solutions

1. Limited Working Timeframe
Challenge:
• Completing work within restricted night hours
Solution:
• Implemented a well-structured execution plan
• Deployed skilled manpower with efficient task allocation
• Maintained high-quality standards without delays

2. Preventing Paint Damage
Challenge:
• Risk of paint spills or splashes on mall flooring and interiors
Solution:
• Used protective coverings and masking tapes
• Applied controlled spray and brush techniques
• Ensured continuous supervision for cleanliness and precision

3. Elevated Work at Pillars
Challenge:
• Safe access to high-level pillar surfaces
Solution:
• Utilized secure scaffolding and lift equipment
• Followed strict safety protocols for workers

Project Outcome
• Total Area Painted: 1,900 m²
• Project Duration: 8 Days
• Manhours: 840 Labour Hours

Results Achieved
• Delivered a refreshed and visually appealing interior environment
• Enhanced overall shopping experience
• Successfully met project timelines and quality benchmarks
• Received positive feedback from mall management and tenants

Top Moments
Following the successful completion of our first painting project at Mall of the Emirates, our team earned the trust and confidence of mall management, leading to the award of a second project.
The management was particularly impressed by:
• Exceptional workmanship quality
• Meticulous protection of surrounding areas
• Zero paint damage to existing interiors
• Strict adherence to tight schedules
This recognition reaffirmed our commitment to excellence and reinforced confidence in our ability to deliver complex projects under demanding conditions.`,
    imagesFolder: 'Project-4'
  },
  'project-6': {
    title: 'Washroom Refurbishment',
    client: 'Ventura',
    duration: 'Jan 2025',
    brief: `The Washroom Refurbishment project involved a complete upgrade of the existing washroom to improve functionality, hygiene, and visual appeal. The scope included reconfiguration of sanitary layouts, modification of plumbing and drainage systems, comprehensive waterproofing, and high-quality finishing works to deliver a durable and modern washroom space.

The project required precise coordination between civil and MEP works, particularly during the relocation of essential services. All works were executed with minimal disruption and in compliance with applicable safety, quality, and waterproofing standards.

Key Highlights:
• Sanitary Reconfiguration: Relocated WC units and optimized the washroom layout for improved space utilization and user comfort.
• Plumbing & Drainage Works: Shifted and modified essential pipelines and drainage lines to suit the new layout, ensuring proper flow and leak-free performance.
• Waterproofing Works: Applied approved waterproofing systems to floors and wet areas, including proper treatment of joints and penetrations to prevent seepage.
• Tiling Works: Installed high-quality wall and floor tiles with precise alignment and durable finishes.
• Fixtures & Finishing: Installed sanitary fixtures and accessories to achieve a clean, functional, and modern appearance.
• Testing & Commissioning: Conducted water ponding tests, pressure testing, and drainage checks to ensure long-term reliability.`,
    imagesFolder: 'Project-6'
  },
  'project-7': {
    title: 'Maintenance work Villa 7',
    client: 'Private Client',
    duration: '2024',
    brief: 'Maintenance and repair work for Villa 7.',
    imagesFolder: 'Project-7'
  },
  'project-8': {
    title: 'Flat Renovation',
    client: 'Private Client',
    duration: '2024',
    brief: 'Complete flat renovation project.',
    imagesFolder: 'Project-8'
  },
  'project-9': {
    title: 'Madam Farm Renovation',
    client: 'Private Client',
    duration: '2024',
    brief: 'Design and renovation project.',
    imagesFolder: 'Project-9'
  },
  'project-10': {
    title: 'Foundation work for plants',
    client: 'Private Client',
    duration: '2024',
    brief: 'Foundation work for plant installation.',
    imagesFolder: 'Project-10'
  },
  'project-11': {
    title: 'Dubai Municipality – Ducting Installation',
    client: 'Dubai Municipality',
    duration: 'April 2025 - July 2025',
    brief: `The Dubai Municipality Ducting Installation project involved the supply, fabrication, and installation of a complete HVAC ducting system to enhance indoor air distribution, ventilation efficiency, and overall environmental comfort within the facility. The scope focused on delivering a reliable, energy-efficient, and compliant air management system aligned with municipal standards and operational requirements.

Given the operational nature of the facility, the works required careful planning, coordinated execution, and minimal disruption to ongoing activities. Our team ensured precise installation, adherence to safety regulations, and high-quality workmanship throughout the project lifecycle. The installation was completed on schedule with zero safety incidents and fully met performance expectations.

Key Highlights:
• Duct Fabrication & Installation: Fabricated and installed high-quality GI ducts with proper insulation to ensure efficient airflow and thermal performance.
• Air Distribution Optimization: Designed and positioned ducts, diffusers, and grills for balanced airflow and improved ventilation efficiency.
• Support & Mounting Systems: Installed robust supports and hangers to ensure structural stability and long-term durability.
• Testing & Sealing: Conducted air leakage testing, sealing, and insulation checks to maintain system efficiency and reduce energy loss.
• Commissioning: Performed final inspection, airflow balancing, and system commissioning to ensure compliance with Dubai Municipality standards.`,
    imagesFolder: 'Project-11'
  },
  'project-12': {
    title: 'Staircase Renovation',
    client: 'Private Client',
    duration: '2024',
    brief: 'Staircase renovation and refurbishment.',
    imagesFolder: 'Project-12'
  },
  'project-13': {
    title: 'Villa Shutter work for Parking',
    client: 'Private Client',
    duration: '2024',
    brief: 'Shutter installation work for villa parking area.',
    imagesFolder: 'Project-13'
  },
  'project-14': {
    title: 'Locker – Rooftop Signboard',
    client: 'Brandfolio',
    duration: 'Dec 2025',
    brief: `The Locker Rooftop Signboard project involved the design, fabrication, and installation of a high-visibility rooftop signage system to enhance brand presence and create a strong visual identity for the client. The objective was to deliver a durable, aesthetically striking, and structurally secure installation that could withstand outdoor environmental conditions while ensuring maximum visibility from long distances.

Working at height and within tight timelines presented logistical and safety challenges, requiring detailed planning, precise coordination, and strict adherence to safety protocols. Despite these complexities, the project was completed efficiently, maintaining high quality standards and achieving zero safety incidents.

Key Highlights:
• Structural Preparation: Conducted site inspection and reinforced mounting areas to ensure safe and stable rooftop installation.
• Fabrication & Installation: Manufactured custom-built signboard components using weather-resistant materials and installed with precision for long-term durability.
• Electrical & Lighting Works: Integrated energy-efficient LED lighting systems for enhanced night-time visibility and reduced power consumption.
• Safety & Compliance: Executed all works with proper access systems, height safety measures, and compliance with local regulations.
• Testing & Commissioning: Performed complete electrical testing and final alignment to ensure optimal illumination, visibility, and performance.`,
    imagesFolder: 'Project-14'
  },
  'project-15': {
    title: 'Dubai Municipality – Ducting Installation',
    client: 'Dubai Municipality',
    duration: 'April 2025 - July 2025',
    brief: `The Dubai Municipality Ducting Installation project involved the supply, fabrication, and installation of a complete HVAC ducting system to enhance indoor air distribution, ventilation efficiency, and overall environmental comfort within the facility. The scope focused on delivering a reliable, energy-efficient, and compliant air management system aligned with municipal standards and operational requirements.

Given the operational nature of the facility, the works required careful planning, coordinated execution, and minimal disruption to ongoing activities. Our team ensured precise installation, adherence to safety regulations, and high-quality workmanship throughout the project lifecycle. The installation was completed on schedule with zero safety incidents and fully met performance expectations.

Key Highlights:
• Duct Fabrication & Installation: Fabricated and installed high-quality GI ducts with proper insulation to ensure efficient airflow and thermal performance.
• Air Distribution Optimization: Designed and positioned ducts, diffusers, and grills for balanced airflow and improved ventilation efficiency.
• Support & Mounting Systems: Installed robust supports and hangers to ensure structural stability and long-term durability.
• Testing & Sealing: Conducted air leakage testing, sealing, and insulation checks to maintain system efficiency and reduce energy loss.
• Commissioning: Performed final inspection, airflow balancing, and system commissioning to ensure compliance with Dubai Municipality standards.`,
    imagesFolder: 'Project-15'
  },
  'project-16': {
    title: 'Corridor Renovation',
    client: 'Private Client',
    duration: '2024',
    brief: 'Corridor renovation and refurbishment project.',
    imagesFolder: 'Project-16'
  },
  'project-17': {
    title: 'Corridor Gypsum Ceiling works',
    client: 'Private Client',
    duration: '2024',
    brief: 'Gypsum ceiling installation for corridors.',
    imagesFolder: 'Project-17'
  }
};

// Sticky header: add blue banner and button styles after scrolling past hero
function initHeaderScrollState() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  function updateHeader() {
    const offset = window.scrollY || window.pageYOffset || 0;
    if (offset > 40) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

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

const DISCOVER_BATCH = 20;

async function autoDiscoverImagesByPrefix(prefix, limit = 80) {
  const base = 'assets/images/Projects/';
  const found = [];
  for (let start = 1; start <= limit; start += DISCOVER_BATCH) {
    const batch = [];
    for (let n = start; n < start + DISCOVER_BATCH && n <= limit; n++) {
      batch.push(tryFile(`${base}${prefix}`, n).then(function (url) { return url ? { n: n, url: url } : null; }));
    }
    const results = await Promise.all(batch);
    results.forEach(function (r) { if (r) found.push(r); });
  }
  found.sort(function (a, b) { return a.n - b.n; });
  return found.map(function (f) { return f.url; });
}

async function autoDiscoverImagesInFolder(folder, limit = 80) {
  const base = `assets/images/Projects/${folder}/`;
  const found = [];
  for (let start = 1; start <= limit; start += DISCOVER_BATCH) {
    const batch = [];
    for (let n = start; n < start + DISCOVER_BATCH && n <= limit; n++) {
      batch.push(tryFile(base, n).then(function (url) { return url ? { n: n, url: url } : null; }));
    }
    const results = await Promise.all(batch);
    results.forEach(function (r) { if (r) found.push(r); });
  }
  found.sort(function (a, b) { return a.n - b.n; });
  return found.map(function (f) { return f.url; });
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

// Fast path: only try first image (for gallery thumbnails). At most a few requests per project.
async function getFirstProjectImage(projectId, data) {
  if (data.images && data.images[0]) return data.images[0];
  const folder = data.imagesFolder || projectId;
  if (folder) {
    const base = `assets/images/Projects/${folder}/`;
    const url = await tryFile(base, 1);
    if (url) return url;
  }
  const base = `assets/images/Projects/${projectId}/`;
  const url = await tryFile(base, 1);
  return url || null;
}

async function renderProjectDetail() {
  const container = document.getElementById('project-detail');
  if (!container) return; // Not on project page

  const id = getQueryParam('id');
  const data = id && ProjectData[id] || {};

  const titleEl = document.getElementById('project-title');
  const clientEl = document.getElementById('project-client');
  const metaEl = document.getElementById('project-meta');
  const briefEl = document.getElementById('project-brief');
  const photosEl = document.getElementById('project-photos');
  const coverEl = document.getElementById('project-cover');

  if (titleEl) titleEl.textContent = data.title || '';
  if (clientEl) clientEl.textContent = data.client ? `Client: ${data.client}` : '';
  if (metaEl && data.duration) metaEl.textContent = `Timeframe: ${data.duration}`;
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

  // Resolve first image for all projects in parallel (fast: only 1 image per project)
  const results = await Promise.all(Array.from(cards).map(async (card) => {
    const projectId = card.getAttribute('data-project-id');
    const imgEl = card.querySelector('img.card-img');
    const data = ProjectData[projectId] || {};
    const src = (data.cover) || (await getFirstProjectImage(projectId, data)) || PROJECT_FALLBACK_IMAGE;
    return { imgEl, projectId, data, src };
  }));

  results.forEach(({ imgEl, projectId, data, src }) => {
    if (!imgEl) return;
    const card = imgEl.closest('.gallery-item');
    if (card) {
      const overlay = card.querySelector('.gallery-item-overlay');
      if (overlay) {
        const titleEl = overlay.querySelector('h3');
        const clientEl = overlay.querySelector('.gallery-item-client');
        if (titleEl && data.title) titleEl.textContent = data.title;
        if (clientEl) clientEl.textContent = data.client ? `Client: ${data.client}` : '';
      }
    }
    function showWhenLoaded() {
      imgEl.classList.add('gallery-img-loaded');
    }
    imgEl.onload = showWhenLoaded;
    imgEl.onerror = function () {
      this.onerror = null;
      this.src = PROJECT_FALLBACK_IMAGE;
    };
    imgEl.alt = data.title || projectId;
    imgEl.loading = 'lazy';
    imgEl.src = src;
    if (imgEl.complete) showWhenLoaded();
  });
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

// Gallery search and filter functionality
function initGalleryFilters() {
  const searchInput = document.getElementById('gallery-search');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  if (!searchInput || !filterButtons.length || !galleryItems.length) return;

  let activeFilter = 'all';

  // Filter button click handler
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      activeFilter = btn.getAttribute('data-filter');
      filterGallery();
    });
  });

  // Search input handler
  searchInput.addEventListener('input', (e) => {
    filterGallery(e.target.value.toLowerCase().trim());
  });

  function filterGallery(searchTerm = '') {
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
      
      const matchesFilter = activeFilter === 'all' || category === activeFilter;
      const matchesSearch = !searchTerm || title.includes(searchTerm);
      
      if (matchesFilter && matchesSearch) {
        item.classList.remove('hidden');
        // Trigger animation
        setTimeout(() => {
          item.style.opacity = '0';
          item.style.animation = 'none';
          setTimeout(() => {
            item.style.animation = 'fadeIn 0.6s ease-out forwards';
          }, 10);
        }, 0);
      } else {
        item.classList.add('hidden');
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjectDetail();
  renderGalleryThumbnails();
  loadGoogleRating();
  initGalleryFilters();
  initHeaderScrollState();
});



