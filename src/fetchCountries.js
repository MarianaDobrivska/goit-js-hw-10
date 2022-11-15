export function fetchCountries(name) {
  const searchParams =
    'fields=name,capital,currencies,population,flags,languages';
  const url = `https://restcountries.com/v3/name/${name}?${searchParams}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
