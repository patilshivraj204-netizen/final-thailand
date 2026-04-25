const tabs = [...document.querySelectorAll('.tab-btn')];
const panels = [...document.querySelectorAll('.tab-panel')];

function switchTab(id) {
  tabs.forEach((b) => b.classList.toggle('active', b.dataset.tab === id));
  panels.forEach((p) => p.classList.toggle('active', p.id === id));
}

tabs.forEach((btn) => btn.addEventListener('click', () => switchTab(btn.dataset.tab)));
document.getElementById('startJourney').addEventListener('click', () => switchTab('itinerary'));

const checklistData = {
  Essentials: ['Passport', 'Visa copy', 'Cash (THB)', 'Forex card'],
  Clothing: ['Beachwear', 'Linen shirts', 'Flip flops'],
  Tech: ['Power bank', 'Charger', 'Adapter'],
  Health: ['Sunscreen', 'Medicines', 'Motion sickness pills'],
};

const checklistKey = 'thailand2026-checklist';
const checked = JSON.parse(localStorage.getItem(checklistKey) || '{}');
const checklistContainer = document.getElementById('checklistContainer');

function renderChecklist() {
  checklistContainer.innerHTML = '';
  let total = 0;
  let done = 0;
  Object.entries(checklistData).forEach(([cat, items]) => {
    const wrap = document.createElement('section');
    wrap.className = 'check-category';
    wrap.innerHTML = `<h4>${cat}</h4>`;
    items.forEach((item) => {
      total += 1;
      const id = `${cat}-${item}`;
      const isChecked = Boolean(checked[id]);
      if (isChecked) done += 1;
      const row = document.createElement('label');
      row.className = `check-item ${isChecked ? 'checked' : ''}`;
      row.innerHTML = `<input type="checkbox" ${isChecked ? 'checked' : ''}/> ${item}`;
      row.querySelector('input').addEventListener('change', (e) => {
        checked[id] = e.target.checked;
        localStorage.setItem(checklistKey, JSON.stringify(checked));
        renderChecklist();
      });
      wrap.appendChild(row);
    });
    checklistContainer.appendChild(wrap);
  });
  const pct = Math.round((done / total) * 100) || 0;
  document.getElementById('checklistProgressBar').style.width = `${pct}%`;
  document.getElementById('checklistProgressText').textContent = `${pct}% complete (${done}/${total})`;
}
renderChecklist();

const itinerary = [
  {
    day: 'Day 1 — Bangkok',
    timeline: ['Arrival → Suvarnabhumi Airport','Hotel → Citrus Sukhumvit 11','Breakfast → Sarnies','Temples → Grand Palace, Wat Pho, Wat Arun','Lunch → Boat noodles','Stop → Thai Hybrid','Rooftop → Tichuca','Night → Levels Club'],
    links: [['Sarnies','https://maps.google.com?q=Sarnies Bangkok'],['Grand Palace','https://maps.google.com?q=Grand Palace Bangkok'],['Wat Pho','https://maps.google.com?q=Wat Pho Bangkok'],['Wat Arun','https://maps.google.com?q=Wat Arun Bangkok'],['Thai Hybrid','https://maps.google.com?q=Thai Hybrid Dispensary Bangkok'],['Tichuca','https://maps.google.com?q=Tichuca Rooftop'],['Levels','https://maps.google.com?q=Levels Club Bangkok']],
    extras: ['Food: Sarnies, Boat noodles, Mango sticky rice','Tips: Reach rooftop early, Carry passport, Don’t overdrink early']
  },
  { day: 'Day 2 — Bangkok', timeline: ['ICONSIAM','Siam Paragon','Da Michele','Spa','Bus to Sai Tai Mai'], links: [['ICONSIAM','https://maps.google.com?q=ICONSIAM'],['Siam Paragon','https://maps.google.com?q=Siam Paragon'],['Da Michele','https://maps.google.com?q=Da Michele Bangkok'],['Let\'s Relax Onsen','https://maps.google.com?q=Let\'s Relax Onsen Thong Lo'],['Sai Tai Mai','https://maps.google.com?q=Sai Tai Mai Bus Terminal']]},
  { day: 'Day 3 — Phuket', timeline: ['Big Buddha','Wat Chalong','Old Town','Let\'s Relax Spa Patong','Patong Beach','Illuzion Club'], links: [['Big Buddha','https://maps.google.com?q=Big Buddha Phuket'],['Wat Chalong','https://maps.google.com?q=Wat Chalong'],['Phuket Old Town','https://maps.google.com?q=Phuket Old Town'],['Spa','https://maps.google.com?q=Let\'s Relax Spa Patong'],['Patong Beach','https://maps.google.com?q=Patong Beach'],['Illuzion','https://maps.google.com?q=Illuzion Phuket']]},
  { day: 'Day 4 — Phuket', timeline: ['One Chun','Torry Ice Cream','Lard Yai Market','Surin Beach Sunset'], links: [['One Chun','https://maps.google.com?q=One Chun Phuket'],['Torry','https://maps.google.com?q=Torry Ice Cream Phuket'],['Lard Yai Market','https://maps.google.com?q=Lard Yai Market'],['Surin Beach','https://maps.google.com?q=Surin Beach']]},
  { day: 'Day 5 — Island', timeline: ['Phi Phi Islands day trip'], links: [['Phi Phi Islands','https://maps.google.com?q=Phi Phi Islands']]},
  { day: 'Day 6 — Exit', timeline: ['Depart from Phuket Airport'], links: [['Phuket Airport','https://maps.google.com?q=Phuket Airport']]},
];

const itineraryContainer = document.getElementById('itineraryContainer');
itinerary.forEach((entry) => {
  const el = document.createElement('article');
  el.className = 'accordion-item';
  el.innerHTML = `<button class="accordion-head">${entry.day}</button><div class="accordion-content"></div>`;
  const content = el.querySelector('.accordion-content');
  content.innerHTML = `
    <ul>${entry.timeline.map((x) => `<li>${x}</li>`).join('')}</ul>
    <p>${entry.links.map(([name,url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a>`).join(' • ')}</p>
    ${(entry.extras || []).map((x) => `<p>${x}</p>`).join('')}
  `;
  el.querySelector('.accordion-head').addEventListener('click', () => content.classList.toggle('open'));
  itineraryContainer.appendChild(el);
});

const exploreContainer = document.getElementById('exploreContainer');
exploreContainer.innerHTML = `
  <article class="card"><h3>Thai Food</h3><ul>
    <li>Pad Thai — stir-fried noodles (tip: less sweet)</li>
    <li>Tom Yum — hot & sour soup (tip: “mai phet”)</li>
    <li>Green Curry — creamy coconut curry</li>
    <li>Som Tam — papaya salad</li>
    <li>Moo Ping — grilled pork skewers</li>
    <li>Boat Noodles — rich broth noodles</li>
    <li>Khao Pad — fried rice</li>
    <li>Mango Sticky Rice — dessert</li>
  </ul></article>
  <article class="card"><h3>Drinks</h3><ul><li>Thai iced tea</li><li>Thai iced coffee</li><li>Coconut ice cream</li></ul></article>
  <article class="card"><h3>7-Eleven</h3>
    <p><a href="https://maps.google.com?q=7 eleven sukhumvit 11" target="_blank" rel="noopener noreferrer">Bangkok store</a></p>
    <p><a href="https://maps.google.com?q=7 eleven patong" target="_blank" rel="noopener noreferrer">Phuket store</a></p>
    <p>Must try: Toasties, Ready meals, Snacks</p><p>Combos: Milk tea + coffee, Red Bull + Sponsor</p>
  </article>
  <article class="card"><h3>Cosmetics & Stores</h3><p>Srichand, Mistine, Oriental Princess, Cute Press, Beauty Cottage, MizuMi, KA Sunscreen, Clear Nose, Vaseline Gluta-Hya, Snake Brand.</p>
  <p><a href="https://maps.google.com?q=Eve and Boy Thailand" target="_blank" rel="noopener noreferrer">Eve and Boy</a> • <a href="https://maps.google.com?q=Watsons Thailand" target="_blank" rel="noopener noreferrer">Watsons</a> • <a href="https://maps.google.com?q=Boots Thailand" target="_blank" rel="noopener noreferrer">Boots</a> • <a href="https://maps.google.com?q=Siam Paragon" target="_blank" rel="noopener noreferrer">Siam Paragon</a> • <a href="https://maps.google.com?q=CentralWorld Bangkok" target="_blank" rel="noopener noreferrer">CentralWorld</a> • <a href="https://maps.google.com?q=Chatuchak Market" target="_blank" rel="noopener noreferrer">Chatuchak</a></p></article>
`;

const moodboardImages = [
  'https://res.cloudinary.com/dx0ebootb/image/upload/v1777145918/Exotic_Beaches_of_Phuket_Thailand_flrsce.webp',
  'https://res.cloudinary.com/dx0ebootb/image/upload/v1777145910/couples_beach_photos_may25a.webp',
  'https://res.cloudinary.com/dx0ebootb/image/upload/v1777145901/CHIANG_RAI_THAILAND_nhe3en.webp',
  'https://res.cloudinary.com/dx0ebootb/image/upload/v1777145891/Big_Buddha_Phuket_cpindx.jpg',
  'https://res.cloudinary.com/dx0ebootb/image/upload/v1777145872/Capturing_the_beauty_and_chaos_of_Bangkok_nladxi.jpg',
  'https://res.cloudinary.com/dx0ebootb/image/upload/v1777145824/Sweet_vibes_in_Krabi_kzm43l.webp'
];
const moodboardGrid = document.getElementById('moodboardGrid');
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
moodboardImages.forEach((src) => {
  const img = document.createElement('img');
  img.src = src;
  img.loading = 'lazy';
  img.alt = 'Thailand mood';
  img.addEventListener('click', () => {
    modalImage.src = src;
    modal.showModal();
  });
  moodboardGrid.appendChild(img);
});
document.getElementById('closeModal').addEventListener('click', () => modal.close());

const masterLinks = [...new Map(itinerary.flatMap((d) => d.links).map(([name,url]) => [name,url])).entries()];
document.getElementById('masterLinks').innerHTML = masterLinks.map(([name,url]) => `<p><a href="${url}" target="_blank" rel="noopener noreferrer">${name}</a></p>`).join('');

const weatherKey = 'thailand2026-weather-cache';
const weatherWidget = document.getElementById('weatherWidget');

async function loadWeather() {
  const places = [
    { name: 'Bangkok', lat: 13.7563, lon: 100.5018 },
    { name: 'Phuket', lat: 7.8804, lon: 98.3923 },
  ];
  let data = [];
  try {
    const results = await Promise.all(
      places.map(async (p) => {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${p.lat}&longitude=${p.lon}&current=temperature_2m,weather_code,wind_speed_10m`);
        const j = await res.json();
        return { ...p, current: j.current };
      })
    );
    data = results;
    localStorage.setItem(weatherKey, JSON.stringify({ timestamp: new Date().toISOString(), data }));
  } catch {
    const cache = JSON.parse(localStorage.getItem(weatherKey) || '{}');
    data = cache.data || [];
  }
  weatherWidget.innerHTML = data.length
    ? data.map((x) => `<div class="weather-cell"><strong>${x.name}</strong><p>${x.current?.temperature_2m ?? 'N/A'}°C</p><p>Wind ${x.current?.wind_speed_10m ?? 'N/A'} km/h</p></div>`).join('')
    : '<p class="muted">No weather cached yet. Connect to Wi-Fi once to sync weather for offline use.</p>';
}
loadWeather();

function renderCalendar() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const tripDays = [1, 2, 3, 4, 5, 6];
  let html = `<table class="calendar"><caption>${date.toLocaleString('default',{ month:'long'})} ${year}</caption><thead><tr>${['Su','Mo','Tu','We','Th','Fr','Sa'].map(d=>`<th>${d}</th>`).join('')}</tr></thead><tbody><tr>`;
  for (let i=0; i<first; i++) html += '<td></td>';
  for (let d=1; d<=days; d++) {
    const cls = tripDays.includes(d) ? 'trip-day' : '';
    html += `<td class="${cls}">${d}</td>`;
    if ((d + first) % 7 === 0) html += '</tr><tr>';
  }
  html += '</tr></tbody></table><p class="muted">Trip days highlighted. Works offline by using your device date.</p>';
  document.getElementById('calendarWidget').innerHTML = html;
}
renderCalendar();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'));
}
