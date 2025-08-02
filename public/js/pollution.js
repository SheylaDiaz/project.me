import { loadImagesIntoSection, startSlideshow } from './shared.js';

document.addEventListener('DOMContentLoaded', () => {
 
  fetch('https://en.wikipedia.org/api/rest_v1/page/summary/Ocean_pollution')
    .then(r => r.json())
    .then(d => {
      const box = document.querySelector('.fact-box2');
      if (box) {
        box.innerHTML = `
          <h3>${d.title}</h3>
          <p>${d.extract}</p>
          <a href="${d.content_urls.desktop.page}" target="_blank">Read more</a>`;
      }
    })
    .catch(e => console.error('Wiki fetch failed:', e));

  /* ——— Unsplash slideshow ——— */
  fetch('/api/pollution-images')
    .then(r => r.json())
    .then(({ results }) => {
      loadImagesIntoSection(results, '.slideshow-container2');
      startSlideshow('.slideshow-container2');
    })
    .catch(e => console.error('Image fetch failed:', e));


  initPollutionChart();
});


function initPollutionChart() {
  const fromSel = document.getElementById('fromYearpollution');
  const toSel   = document.getElementById('toYearpollution');
  const btn     = document.getElementById('loadChartpollution');

  if (!fromSel || !toSel || !btn) {
    console.warn('Pollution chart controls missing');
    return;
  }

  const current = new Date().getFullYear();
  for (let y = 2000; y <= current; y++) {
    fromSel.appendChild(new Option(y, y));
    toSel.appendChild(new Option(y, y));
  }
  fromSel.value = 2020;
  toSel.value   = 2024;

  btn.addEventListener('click', () => fetchPollutionData(+fromSel.value, +toSel.value));
  fetchPollutionData(2020, 2024);
}

async function fetchPollutionData(from, to) {
  try {
    const r = await fetch(`/api/species-sightings?from=${from}&to=${to}`);
    if (!r.ok) throw new Error(r.status);
    const data   = await r.json();
    const labels = Object.keys(data);
    const values = Object.values(data);

    const ctx = document.getElementById('pollutionChart').getContext('2d');
    if (window.pollutionChart instanceof Chart) window.pollutionChart.destroy();

    window.pollutionChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Occurrences (proxy)',
          data:  values,
          fill:  false,
          borderWidth: 2
        }]
      },
      options: { responsive: true }
    });
  } catch (e) {
    console.error('pollution chart ✖', e);
  }
}