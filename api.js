function getPokemonList(url, limit) {
  return fetch(url + "?limit=" + limit).then((response) => response.json());
}

function getPokemon(url) {
  return fetch(url).then((response) => response.json());
}
