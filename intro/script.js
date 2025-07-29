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
;

  (function () {
  const ACCESS_KEY = "";

  const IMAGE_API_OVERFISHING = `https://api.unsplash.com/search/photos?query=overfishing&per_page=10&client_id=${ACCESS_KEY}`;

  fetch(IMAGE_API_OVERFISHING)
    .then(response => response.json())
    .then(data => {
      loadImagesIntoSection(data.results, '.slideshow-container');
      startSlideshow('.slideshow-container');
    })
  .catch(err => console.error("Error fetching overfishing images:", err));

const IMAGE_API_POLLUTION = `https://api.unsplash.com/search/photos?query=marine+pollution&per_page=10&client_id=${ACCESS_KEY}`;

  fetch(IMAGE_API_POLLUTION)
    .then(response => response.json())
    .then(data => {
      loadImagesIntoSection(data.results, '.slideshow-container2');
      startSlideshow('.slideshow-container2');
    })
    .catch(error => console.error('Failed to load marine pollution images:', error));

  function loadImagesIntoSection(images, containerSelector) {
    const container = document.querySelector(containerSelector);
    let counter = 1;

    images.forEach(img => {
      const imgTag = document.createElement('img');
      imgTag.src = img.urls.regular;
      imgTag.setAttribute('data-id', counter);
      imgTag.className = counter === 1 ? 'active' : 'inactive';
      imgTag.style.width = '600px';
      imgTag.style.height = '350px';
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

