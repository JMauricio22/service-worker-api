const API_URL = "https://pokeapi.co/api/v2/pokemon";
const NUM_OF_POKEMONS = 12;

window.onload = () => {
  register();

  getPokemonList(API_URL, NUM_OF_POKEMONS)
    .then((data) => {
      return Promise.all(
        data.results.map(({ url }) => {
          return getPokemon(url);
        })
      );
    })
    .then(createCards)
    .catch((error) => console.log("No data..."));
};

const createCards = (pokemons) => {
  console.log(pokemons);
  const title = document.createElement("h1");
  title.innerHTML = "Pokemons";
  document.getElementById("app").appendChild(title);
  pokemons.map((pokemon) => {
    const card = document.createElement("div");
    const containerImage = document.createElement("div");
    const description = document.createElement("div");
    const image = document.createElement("img");
    const name = document.createElement("h2");
    const specie = document.createElement("p");
    const height = document.createElement("p");
    image.src = pokemon.sprites.other.dream_world.front_default;
    specie.innerHTML = "Specie: " + pokemon.species.name;
    name.innerHTML = "Name: " + pokemon.name;
    height.innerHTML = "Height: " + pokemon.height;
    title.classList.add("title");
    card.classList.add("card");
    containerImage.classList.add("card__container-image");
    image.classList.add("card__image");
    description.classList.add("card__description");
    containerImage.appendChild(image);
    description.appendChild(name);
    description.appendChild(specie);
    description.appendChild(height);
    card.appendChild(containerImage);
    card.appendChild(description);
    document.getElementById("app").appendChild(card);
  });
  document.querySelector(".spinner").remove();
};
