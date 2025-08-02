import { loadImagesIntoSection, startSlideshow } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {

  fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Overfishing')
    .then(r => r.json())
    .then(d => {
      const box = document.querySelector('.fact-box');
      if (box) {
        box.innerHTML = `
          <h3>${d.title}</h3>
          <p>${d.extract}</p>
          <a href="${d.content_urls.desktop.page}" target="_blank">Read more</a>`;
      }
    })
    .catch(e => console.error('Wiki fetch failed:', e));


  fetch('/api/overfishing-images')
    .then(r => r.json())
    .then(({ results }) => {
      loadImagesIntoSection(results, '.slideshow-container');
      startSlideshow('.slideshow-container');
    })
    .catch(e => console.error('Image fetch failed:', e));


  initSpeciesChart();
});


function initSpeciesChart() {
  const fromSel = document.getElementById('fromYear');
  const toSel   = document.getElementById('toYear');
  const btn     = document.getElementById('loadChart');

  if (!fromSel || !toSel || !btn) {
    console.warn('Chart controls missing');
    return;
  }


  const current = new Date().getFullYear();
  for (let y = 2000; y <= current; y++) {
    fromSel.appendChild(new Option(y, y));
    toSel.appendChild(new Option(y, y));
  }
  fromSel.value = 2000;
  toSel.value   = 2024;

  btn.addEventListener('click', () => fetchOBISData(+fromSel.value, +toSel.value));
 
  fetchOBISData(2020, 2024);
}

async function fetchOBISData(from, to) {
  try {
    const r = await fetch(`/api/species-sightings?from=${from}&to=${to}`);
    if (!r.ok) throw new Error(`server → ${r.status}`);
    const data   = await r.json();
    const labels = Object.keys(data);
    const values = Object.values(data);

    const ctx = document.getElementById('fishingChart').getContext('2d');

    if (window.fishingChart instanceof Chart) window.fishingChart.destroy();

    window.fishingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Species Sightings (OBIS)',
          data:  values,
          backgroundColor: 'rgba(195,211,214,0.6)',
          borderColor:     'rgba(0,180,216,1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, ticks: { color: '#fff' },
               grid: { color: 'rgba(235, 235, 243, 0.98)' } },
          x: { ticks: { color: '#fff' },
               grid: { color: 'rgba(250, 243, 243, 1)' } }
        },
        plugins: { legend: { labels: { color: '#fff' } } }
      }
    });
  } catch (e) {
    console.error('chart ✖', e);
    alert('Chart failed to load – check console.');
  }
}