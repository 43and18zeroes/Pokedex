let pokemonDetails = [];

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
        renderPokemonListCard(i, singlePokemonJSON);
    }
}


function renderPokemonListCard(i, singlePokemonJSON) {
    const pokemonName = singlePokemonJSON['forms'][0]['name'];
    const pokemonImage = singlePokemonJSON['sprites']['other']['dream_world']['front_default'];
    const pokemonType = singlePokemonJSON['types'][0]['type']['name'];

    const pokemonAbility = singlePokemonJSON['abilities'][0]['ability']['name'];
    const pokemonHeight = singlePokemonJSON['height'];
    const pokemonWeight = singlePokemonJSON['weight'];

    pushSinglePokemonDetails(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight);

    renderPokemonListCardHTML(i, pokemonName, pokemonImage, pokemonType);
}


function pushSinglePokemonDetails(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight) {
    const pokemon = {
        'name': pokemonName,
        'img': pokemonImage,
        'type': pokemonType,
        'ability': pokemonAbility,
        'height': pokemonHeight,
        'weight': pokemonWeight
    }

    pokemonDetails.push(pokemon);
}


function renderPokemonListCardHTML(i, pokemonName, pokemonImage, pokemonType) {
    $("listPokemonCards").innerHTML += `
        <div class="col-12 col-sm-6 col-md-4" onclick="openDetailView(${i})">
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


function openPopup() {
    document.getElementsByClassName("popup")[0].classList.add("active");
    $("bgoverlay").classList.remove("d-none");
}


function closeDetailView() {
    document.getElementsByClassName("popup")[0].classList.remove("active");
    $("bgoverlay").classList.add("d-none");
}


function openDetailView(i) {
    const pokemonName = pokemonDetails[i].name;
    const pokemonImage = pokemonDetails[i].img;
    const pokemonType = pokemonDetails[i].type;
    const pokemonAbility = pokemonDetails[i].ability;
    const pokemonHeight = pokemonDetails[i].height;
    const pokemonWeight = pokemonDetails[i].weight;

    renderDetailViewHTML(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight);
}


function renderDetailViewHTML(pokemonName, pokemonImage, pokemonType, pokemonAbility, pokemonHeight, pokemonWeight) {
    $("detailPopup").innerHTML = `
        <div class="detail__header" id="detail-header">
            <h2 id="detailName">
                ${pokemonName}
            </h2>
            <div class="hover-area noSelect" onclick="closeDetailView()">
                <div class="transform-circle"></div>
                <span class="material-icons-outlined single-icon">close</span>
            </div>
        </div>
        <div class="detail__pic__container">
            <img src="${pokemonImage}" alt="" class="detail__picture" id="detailPicture">
        </div>
        <div class="detail__stats alert alert-secondary">
            <p>Ability: <span id="detailAbility">${pokemonAbility}</span></p>
            <p>Height: <span id="detailHeight">${pokemonHeight}</span></p>
            <p>Weight: <span id="detailWeight">${pokemonWeight}</span></p>
        </div>
        `;

    styleDetailView(pokemonType);
    openPopup();
}


function styleDetailView(pokemonType) {
    const styleDetailViewVar = $("detailPopup");

    styleDetailViewVar.className = '';
    styleDetailViewVar.classList.add(`popup`);
    styleDetailViewVar.classList.add(`center`);
    styleDetailViewVar.classList.add(`shadow`);
    styleDetailViewVar.classList.add(`card__text__bg__${pokemonType}`);
}


function $(id) {
    return document.getElementById(id);
}
