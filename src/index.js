'use strict';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import { fetchPhotos } from './scripts/fetchPhotos';
import { loadGallery } from './scripts/gallery';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let page = 1;
let query = '';
const perPage = 40;
let simpleLightbox;

input.addEventListener('submit', searchHandler);
loadMoreBtn.addEventListener('click', loadButton);

function searchHandler(event) {
  event.preventDefault();
  page = 1;
  query = event.currentTarget.searchQuery.value.trim(); //wyszukiwanie frazy przez użytkownika bez spacji
  gallery.innerHTML = '';
  if (query === '') {
    //jesli nie ma inputa to ukrywa przycisk load-more
    loadMoreBtn.classList.add('is-hidden');
    return Notiflix.Notify.failure(
      //zwrotka komunikatu
      'The search string cannot be empty. Please specify your search query.'
    );
  }
  fetchPhotos(query, page, perPage) //pobiera zdjecia z Api
    .then(({ data }) => {
      if (data.totalHits === 0) {
        //jesli nie znajduje zdjec zwraca komunikat
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      loadGallery(data.hits); //w innym przypadku laduje zdjecia
      simpleLightbox = new SimpleLightbox('.gallery  a').refresh(); //biblioteka simplelightbox
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`); //komunikat

      if (data.totalHits > perPage) {
        //jesli jest wiecej zdjec niz na stronie perPage
        loadMoreBtn.classList.remove('is-hidden'); //to pokazuje przycisk
      }
    })
    .catch(error => console.error(error));
}

function loadButton() {
  //funkcja ladowania przycisku
  page += 1; //dodaje kolejna strone
  fetchPhotos(query, page, perPage) //pobiera zdjecia
    .then(({ data }) => {
      loadGallery(data.hits); //laduje galerie
      simpleLightbox = new SimpleLightbox('.gallery a').refresh();
      const totalPages = Math.ceil(data.totalHits / perPage); //odnajduje liczbe wszystkich stron - zaokragla do gory
      if (page >= totalPages) {
        //warunek jesli aktualna strona jest wieksza lub rowna liczbie wszystkich stron
        loadMoreBtn.classList.add('is-hidden'); //to ukrywa przycisk
        return Notiflix.Notify.failure(
          "We're sorry, but you've reached the end of search results."
        ); //i zwraca komunikat
      }
    })
    .catch(error => console.error(error));
}
