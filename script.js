function init() {
    getPokemonAPIData();
}


async function getPokemonAPIData() {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`;
    const response = await fetch(url);
    const pokemonJSON = await response.json();

    getSinglePokemonData(pokemonJSON);
}


async function getSinglePokemonData(pokemonJSON) {
    for (let i = 0; i < pokemonJSON.results.length; i++) {
        const singlePokemonURL = pokemonJSON['results'][i]['url'];
        const response = await fetch(singlePokemonURL);
        const singlePokemonJSON = await response.json();
        renderPokemonListCard(singlePokemonJSON);
    }
}


function renderPokemonListCard(singlePokemonJSON) {
    const pokemonName = singlePokemonJSON['forms'][0]['name'];
    const pokemonImage = singlePokemonJSON['sprites']['other']['dream_world']['front_default'];
    const pokemonType = singlePokemonJSON['types'][0]['type']['name'];

    renderPokemonListCardHTML(pokemonName, pokemonImage, pokemonType);
}


function renderPokemonListCardHTML(pokemonName, pokemonImage, pokemonType) {
    document.getElementById("listPokemonCards").innerHTML += `
        <div class="col-12 col-sm-6 col-md-4">
            <div class="card mb-4 list__card shadow-sm hvr-float-shadow">
                <img id="listPokemonImage" class="list__pokemon__image"  src="${pokemonImage}" alt="${pokemonName}">
                <div class="card-body">
                    <h5 id="listPokemonName" class="card-title">${pokemonName}</h5>
                    <span id="listPokemonFeature" class="card__text card__text__bg__${pokemonType}">${pokemonType}</span>
                </div>
            </div>
        </div>
        `;
}