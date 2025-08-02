fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Overfishing")
    .then(res => res.json())
    .then(data => {
      const factBox = document.querySelector(".fact-box");
      factBox.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.extract}</p>
        <a href="${data.content_urls.desktop.page}" target="_blank">Read more</a>
      `;
    })
    .catch(err => console.error("Error fetching Wikipedia fact:", err));

(function () {

  fetch('/api/overfishing-images')
    .then(response => response.json())
    .then(data => {
      loadImagesIntoSection(data.results, '.slideshow-container');
      startSlideshow('.slideshow-container');
    })
    .catch(err => console.error("Error fetching overfishing images:", err));

  fetch('/api/pollution-images')
    .then(response => response.json())
    .then(data => {
      loadImagesIntoSection(data.results, '.slideshow-container2');
      startSlideshow('.slideshow-container2');
    })
    .catch(error => console.error('Failed to load marine pollution images:', error));

  function loadImagesIntoSection(images, containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) {
      console.error(`Container ${containerSelector} not found`);
      return;
    }
    
    if (!images || !Array.isArray(images)) {
      console.error('No images array provided');
      container.innerHTML = '<p>Unable to load images</p>';
      return;
    }
    
    let counter = 1;

    images.forEach(img => {
      const imgTag = document.createElement('img');
      imgTag.src = img.urls.regular;
      imgTag.setAttribute('data-id', counter);
      imgTag.className = counter === 1 ? 'active' : 'inactive';
      imgTag.style.width = '900px';
      imgTag.style.height = '500px';
      container.appendChild(imgTag);
      counter++;
    });
  }

  function startSlideshow(containerSelector) {
    setInterval(() => {
      const container = document.querySelector(containerSelector);
      const active = container.querySelector('.active');
      if (!active) return;

      active.classList.remove('active');
      active.classList.add('inactive');

      let next = active.nextElementSibling;
      if (!next) next = container.firstElementChild;

      next.classList.remove('inactive');
      next.classList.add('active');
    }, 5000);
  }

  fetch("https://en.wikipedia.org/api/rest_v1/page/summary/Ocean_pollution")
    .then(res => res.json())
    .then(data => {
      const factBox = document.querySelector(".fact-box2");
      factBox.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.extract}</p>
        <a href="${data.content_urls.desktop.page}" target="_blank">Read more</a>
      `;
    })
    .catch(err => console.error("Error fetching Wikipedia fact:", err));
})();

// Initialize chart controls and button when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeChartControls();
  initializeChartButton();
});

function initializeChartControls() {
  const fromYearSelect = document.getElementById('fromYear');
  const toYearSelect = document.getElementById('toYear');
  
  if (!fromYearSelect || !toYearSelect) {
    console.warn('Chart year selectors not found');
    return;
  }
  
  console.log('Initializing chart controls...');
  
  // Populate year dropdowns (2000-2024)
  const currentYear = new Date().getFullYear();
  const startYear = 2000;
  
  for (let year = startYear; year <= currentYear; year++) {
    const fromOption = document.createElement('option');
    fromOption.value = year;
    fromOption.textContent = year;
    fromYearSelect.appendChild(fromOption);
    
    const toOption = document.createElement('option');
    toOption.value = year;
    toOption.textContent = year;
    toYearSelect.appendChild(toOption);
  }
  
  // Set default values
  fromYearSelect.value = '2020';
  toYearSelect.value = '2024';
}

// Initialize chart button
function initializeChartButton() {
  const loadChartButton = document.getElementById('loadChart');
  
  if (!loadChartButton) {
    console.warn('Load chart button not found');
    return;
  }
  
  console.log('Setting up chart button...');
  
  // Chart functionality
  loadChartButton.addEventListener("click", () => {
    const from = document.getElementById("fromYear").value;
    const to = document.getElementById("toYear").value;
    console.log(`Loading chart data from ${from} to ${to}`);
    fetchOBISData(from, to);
  });
}
async function fetchOBISData(from ,to) {
  try {
    const response = await fetch(`/api/species-sightings?from=${from}&to=${to}`);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const data = await response.json();
    const labels = Object.keys(data);
    const values = Object.values(data);

    const ctx = document.getElementById('fishingChart').getContext('2d');

     window.fishingChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Species Sightings (OBIS)',
          data: values,
          backgroundColor: 'rgba(195, 211, 214, 0.6)',
          borderColor: 'rgba(0, 180, 216, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: {
            ticks: { color: 'white' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        },
        plugins: {
          legend: {
            labels: { color: 'white' }
          }
        }
      }
    });

    console.log('✅ Chart created successfully');
  } catch (err) {
    console.error(' Error loading OBIS data:', err.message);
    alert('Error loading chart data. Please try again.');
  }
}