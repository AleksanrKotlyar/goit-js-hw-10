const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages,',
});
const url = 'https://restcountries.com/v2/name';
function fetchCountries(name) {
  return fetch(`${url}/${name}?${searchParams}`).then(response => {
    if (response.status === 404) {
      throw new Error();
    }
    return response.json();
  });
}

export { fetchCountries };
