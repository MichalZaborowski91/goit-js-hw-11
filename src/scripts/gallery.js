'use strict';
const gallery = document.querySelector('.gallery');

function loadGallery(images) {
  const allImages = images
    .map(image => {
      const {
        id,
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;
      return `<a class="gallery__link" href="${largeImageURL}">
       <img class="gallery__img" id="${id}" src="${webformatURL}" alt="${tags}" loading="lazy" />
      <ul class="list">
        <li class="list__item">Likes: <b>${likes}</b></li>
        <li class="list__item">Views: <b>${views}</b></li>
        <li class="list__item">Comments: <b>${comments}</b></li>
        <li class="list__item">Downloads: <b>${downloads}</b></li>
      </ul>
    </a>`;
    })
    .join('');

  gallery.insertAdjacentHTML('beforeend', allImages);
}

export { loadGallery };
