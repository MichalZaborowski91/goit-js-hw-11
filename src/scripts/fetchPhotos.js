'use strict';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const myApiKey = '36841303-60370a725d5fd0d1f3e01c212';

async function fetchPhotos(query, page, perPage) {
  try {
    const response = await axios.get(
      `?key=${myApiKey}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export { fetchPhotos };
