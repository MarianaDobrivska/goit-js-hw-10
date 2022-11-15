import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const textinput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');
const minCountriesQuantity = 1;
const maxCountriesQuantity = 10;

function onTextInput(e) {
  let inputValue = e.target.value.trim();
  if (inputValue === '' || inputValue !== e.target.value) {
    clearMarkup();
    return '';
  }
  fetchCountries(inputValue)
    .then(results => {
      if (results.length === 1) {
        clearMarkup();
        countryDiv.innerHTML = createMarkupItem(results);
      } else if (
        results.length > minCountriesQuantity &&
        results.length <= maxCountriesQuantity
      ) {
        clearMarkup();
        countryList.innerHTML = createMarkupList(results);
      } else {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
    });
}

function clearMarkup() {
  countryDiv.innerHTML = '';
  countryList.innerHTML = '';
}

function createMarkupList(results) {
  return results
    .map(result => {
      const countryMarkup = `<li class="country-list__item">
    <img src="${result.flags[0]}" alt="${result.name.official} flag" class="country-list__img">
    <p class="country-list__name">${result.name.official}</p>
</li>`;
      return countryMarkup;
    })
    .join('');
}

function createMarkupItem(results) {
  return results
    .map(result => {
      const countryMarkup = `<div class="country-info__wrapper">
      <img src="${result.flags[0]}" alt="${
        result.name.official
      } flag" class="country-info__img">
      <p class="country-info__name">${result.name.official}</p></div>
      <p class="country-info__meta">Capital: <span>${result.capital}</span></p>
      <p class="country-info__meta">Population: <span>${
        result.population
      }</span></p>
      <p class="country-info__meta">Languages: <span>${Object.values(
        result.languages
      )}</span></p>
      `;
      return countryMarkup;
    })
    .join('');
}

textinput.addEventListener('input', debounce(onTextInput, DEBOUNCE_DELAY));
