import { fetchBreeds, fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const errorMessage = document.querySelector('.error');
const loadingMessage = document.querySelector('.loader');
const catBreed = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');

catBreed.onchange = makeInfoCat;
errorMessage.style.display = 'none';
loadingMessage.style.display = 'none';
catInfo.style.display = 'none';

new SlimSelect({
  select: '#breed-select',
});

function makeSelect() {
  fetchBreeds()
    .then(data => {
      loadingMessage.style.display = 'none';
      catBreed.innerHTML = data
        .map(({ name, id }) => `<option value="${id}">${name}</option>`)
        .join('');
    })
    .catch(() => {
      errorMessage.style.display = 'block';
      console.log(errorMessage);
    });
}

makeSelect();

function makeInfoCat() {
  catInfo.style.display = 'none';
  loadingMessage.style.display = 'block';
  fetchCatByBreed(catBreed.value)
    .then(data => {
      if (data.length === 0) {
        return Notiflix.Notify.warning(
          'Sorry, nothing was found for the breed'
        );
      }
      loadingMessage.style.display = 'none';
      catInfo.style.display = 'block';
      showCatInfo(data[0]);
    })
    .catch(() => {
      errorMessage.style.display = 'none ';
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}

function showCatInfo(breed) {
  const markup = `
        <img src="${breed.url}" alt="${breed.breeds[0].name} height="600" width="500" ">
        <h1>${breed.breeds[0].name}</h1>
        <p>${breed.breeds[0].description}</p>
        <h2>Temperament: ${breed.breeds[0].temperament}</h2>`;
  catInfo.innerHTML = markup;
}
