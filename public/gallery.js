document.addEventListener('DOMContentLoaded', () => {
  let images = [];
  let currentIndex = 0;
  fetch('/images')
    .then(res => res.json())
    .then(imgs => {
      images = imgs;
      const gallery = document.getElementById('gallery');
      images.forEach((img, idx) => {
        const imgElem = document.createElement('img');
        imgElem.src = `/image/${encodeURIComponent(img)}`;
        imgElem.alt = img;
        imgElem.addEventListener('click', () => openModal(idx));
        gallery.appendChild(imgElem);
      });
    });

  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.getElementById('close');

  function openModal(idx) {
    currentIndex = idx;
    modal.style.display = 'flex';
    modalImg.src = `/image/${encodeURIComponent(images[currentIndex])}`;
  }

  function showImage(idx) {
    if (idx >= 0 && idx < images.length) {
      currentIndex = idx;
      modalImg.src = `/image/${encodeURIComponent(images[currentIndex])}`;
    }
  }

  closeBtn.onclick = () => {
    modal.style.display = 'none';
    modalImg.src = '';
  };

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      modalImg.src = '';
    }
  };

  document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowLeft') {
        showImage((currentIndex - 1 + images.length) % images.length);
      } else if (e.key === 'ArrowRight') {
        showImage((currentIndex + 1) % images.length);
      }
      // Optionally: up/down for scrolling
    }
  });

  // Tap left/right on modal image to switch images (for mobile)
  modalImg.addEventListener('touchstart', handleTouchStart, false);
  modalImg.addEventListener('touchend', handleTouchEnd, false);
  let xDown = null;

  function handleTouchStart(evt) {
    xDown = evt.touches[0].clientX;
  }

  function handleTouchEnd(evt) {
    if (!xDown) return;
    let xUp = evt.changedTouches[0].clientX;
    let diff = xUp - xDown;
    if (Math.abs(diff) > 40) { // swipe threshold
      if (diff < 0) {
        // swipe left, next image
        showImage((currentIndex + 1) % images.length);
      } else {
        // swipe right, previous image
        showImage((currentIndex - 1 + images.length) % images.length);
      }
    } else {
      // tap: left or right side of image
      const rect = modalImg.getBoundingClientRect();
      if (xUp - rect.left < rect.width / 2) {
        // tap left
        showImage((currentIndex - 1 + images.length) % images.length);
      } else {
        // tap right
        showImage((currentIndex + 1) % images.length);
      }
    }
    xDown = null;
  }

  // Dark mode toggle
  const darkToggle = document.getElementById('darkmode-toggle');
  darkToggle.onclick = () => {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      darkToggle.textContent = '☀️';
      localStorage.setItem('gallery-darkmode', '1');
    } else {
      darkToggle.textContent = '🌙';
      localStorage.setItem('gallery-darkmode', '0');
    }
  };
  // Load dark mode preference
  if (localStorage.getItem('gallery-darkmode') === '1') {
    document.body.classList.add('dark');
    darkToggle.textContent = '☀️';
  }
});
