import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  container: document.querySelector('.cat-info'),
};

refs.select.addEventListener('change', handlerClick);

function handlerClick(e) {
  const breeds = e.target.value;
  refs.loader.hidden = false;
  refs.select.hidden = true;
  refs.container.hidden = true;

  fetchCatByBreed(breeds)
    .then(data => {
      refs.container.innerHTML = createMarkup(data);
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok'
      );
    })
    .finally(() => {
      refs.loader.hidden = true;
      refs.select.hidden = false;
      refs.container.hidden = false;
    });
}

function createOptions() {
  refs.select.hidden = true;
  fetchBreeds()
    .then(data => {
      refs.select.innerHTML = data
        .map(
          el => `
<option value="${el.id}">${el.name}</option>
`
        )
        .join('');
      new SlimSelect({
        select: '#selectCat',
        settings: {
          placeholderText: 'Select Cat',
        },
      });
    })
    .catch(error => {
      Notiflix.Report.failure(
        'Oops!',
        'Something went wrong! Try reloading the page!',
        'Ok'
      );
    })
    .finally(() => {
      refs.error.hidden = true;
      refs.loader.hidden = true;
      refs.select.hidden = false;
    });
}
createOptions();

function createMarkup(array) {
  return array
    .map(({ url, breeds: [{ description, name, temperament }] }) => {
      return `<img src="${url}" alt="${name}" width="400"/>
    <h2>${name}</h2>
    <h3>Description</h3>
    <p class="descr">${description}</p>
    <h3>Temperament</h3>
    <p class="temperament">${temperament}</p>`;
    })
    .join('');
}
