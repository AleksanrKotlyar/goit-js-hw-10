import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const ulRef = document.querySelector('.country-list');
const divInfoRef = document.querySelector('.country-info');
const inputRef = document
  .querySelector('#search-box')
  .addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(e) {
  const searchCountries = e.target.value.trim();
  if (searchCountries === '') {
    ulRef.innerHTML = '';
    divInfoRef.innerHTML = '';
  } else {
    const findedCountries = fetchCountries(searchCountries)
      .then(result => {
        if (result.length > 10) {
          divInfoRef.innerHTML = '';
          ulRef.innerHTML = '';
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (2 < result.length && result.length < 10) {
          ulRef.innerHTML = '';
          divInfoRef.innerHTML = '';
          const createMarkup = result
            .map(({ name, flags }) => {
              return `
             <li>
              <img src=${flags.svg} alt="flag" width='30' />
              <span>${name}</span>
            </li>
   
        `;
            })
            .join('');
          ulRef.innerHTML = createMarkup;
        } else if (result.length === 1) {
          divInfoRef.innerHTML = '';
          ulRef.innerHTML = '';

          const createMarkup = result
            .map(({ name, flags }) => {
              return `
             <li>
                <img src=${flags.svg} alt="flag" width="30" />
                <span class ='bold'>${name}</span>
              </li>
   
        `;
            })
            .join('');

          ulRef.innerHTML = createMarkup;

          const createMarkupInfo = result
            .map(({ capital, population, languages }) => {
              return `
           
        <p><span>Capital:</span> ${capital}</span>
        <p><span>Population:</span> ${population}</p>
        <p><span>Language:</span> ${languages[0].name}</p>
   
        `;
            })
            .join('');

          divInfoRef.innerHTML = createMarkupInfo;
        }
      })
      .catch(error => {
        ulRef.innerHTML = '';
        divInfoRef.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      });
  }
}
