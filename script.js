let currentPokemon;
let blank = 'https://pokeapi.co/api/v2/pokemon/';
let ids = [];


async function loadPokemon(){
    loadID();
    let url = blank + ids[0];
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemonInfo();
}

function renderPokemonInfo(){
    document.getElementById('pokeName').innerHTML = currentPokemon[`name`];
    document.getElementById('pokeImg').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}


async function loadPokedex(){
    loadID();
    for (let i = 0; i < ids.length; i++) {
        const poke = ids[i];
    let url = blank + poke;
    let response = await fetch(url);
    currentPokemon = await response.json();
    renderPokemondex(poke);
}}

function renderPokemondex(poke){
    document.getElementById('Pokedex').innerHTML += `
    <div class="Pokedexcards">
    <img id="pokeimg${poke}" src= ${currentPokemon['sprites']['other']['official-artwork']['front_default']}>
    <p>${currentPokemon['types']['0']['type']['name']}</p> 
    <div class="headings">
    <h3 id="pokemon${poke}">${currentPokemon['name']}</h3>
    <h4>#${currentPokemon['id']}</h4>
    </div>
    </div>`
    console.log(currentPokemon);
}

function loadID(){
    for (let i = 1; i < 152; i++) {
        ids.push(i);
    }
}

function removeDnone(){
    let element = document.getElementById('pokedex-card');
    element.classList.remove('d-none');
}