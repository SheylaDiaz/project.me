export function loadImagesIntoSection(images, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = '';                // reset on navigation
  let counter = 1;

  images.forEach(img => {
    const tag      = document.createElement('img');
    tag.src        = img.urls.regular;
    tag.dataset.id = counter;
    tag.className  = counter === 1 ? 'active' : 'inactive';
    tag.style.cssText = 'width:900px;height:500px;object-fit:cover;';
    container.appendChild(tag);
    counter++;
  });
}

export function startSlideshow(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  setInterval(() => {
    const active = container.querySelector('.active');
    if (!active) return;

    active.classList.replace('active', 'inactive');

    const next = active.nextElementSibling ?? container.firstElementChild;
    next.classList.replace('inactive', 'active');
  }, 5_000);
}