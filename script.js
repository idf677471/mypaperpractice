window.initPapers = function () {
  const data = window.paperData;
  let currentImageIndex = 0;
  let currentImageList = [];

  const container = document.getElementById('paper-list');
  data.forEach(paper => {
    const card = document.createElement('div');
    card.className = 'paper-card';

    const code = document.createElement('div');
    code.className = 'paper-code';
    code.innerText = paper.code;
    code.onclick = () => openGallery(paper.images);

    const title = document.createElement('div');
    title.innerText = paper.title;

    const date = document.createElement('div');
    date.innerText = paper.date;

    const grid = document.createElement('div');
    grid.className = 'image-grid';
    paper.images.forEach(img => {
      const thumb = document.createElement('img');
      thumb.src = img;
      thumb.onclick = () => openImageViewer(paper.images, paper.images.indexOf(img));
      grid.appendChild(thumb);
    });

    card.appendChild(code);
    card.appendChild(title);
    card.appendChild(date);
    card.appendChild(grid);
    container.appendChild(card);
  });

  function openGallery(images) {
    openImageViewer(images, 0);
  }

  function openImageViewer(images, index) {
    currentImageList = images;
    currentImageIndex = index;
    document.getElementById('popup-img').src = images[index];
    document.getElementById('popup').classList.remove('hidden');
  }

  document.getElementById('close-btn').onclick = () => {
    document.getElementById('popup').classList.add('hidden');
  };

  document.getElementById('nav-left').onclick = () => {
    currentImageIndex = (currentImageIndex - 1 + currentImageList.length) % currentImageList.length;
    document.getElementById('popup-img').src = currentImageList[currentImageIndex];
  };

  document.getElementById('nav-right').onclick = () => {
    currentImageIndex = (currentImageIndex + 1) % currentImageList.length;
    document.getElementById('popup-img').src = currentImageList[currentImageIndex];
  };

  // Swipe support for touch
  let touchStartX = 0;
  document.getElementById('popup').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  document.getElementById('popup').addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (dx > 50) document.getElementById('nav-left').click();
    else if (dx < -50) document.getElementById('nav-right').click();
  });
};
