let AllPokemons = [];
let load = 20;
let currentLoad = 0;

function loadMore() {
    load += 20;
    loadPokemon();
  }

async function AddPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    let response = await fetch(url);
    let responseAsJson = await response.json();
    AllPokemons = responseAsJson['results'];
    loadPokemon();
}

async function loadPokemon(){
    for (let i = currentLoad; i < load; i++) {
        if (i >= AllPokemons.length) {
        return;}
        currentLoad++;
        let PokemonUrl = AllPokemons[i].url;
        let Pokemon = await fetch(PokemonUrl);
        let currentPokemon = await Pokemon.json();
        renderPokedex(currentPokemon, i);
    }
}

function renderPokedex(currentPokemon, i){
    let container = document.getElementById('pokedex');
    let card = document.createElement("div");
    card.className = "card";
    card.setAttribute = ("data-url", currentPokemon.url); // damit die URL gespeichert wird um die richtigen Daten zu laden
    card.onclick = function(){detail(currentPokemon, i)};// 
    card.innerHTML = `<div class="cardHead">
    <div class="pokeName">${currentPokemon.name}</div>
    <div class="pokeId">${"#" + currentPokemon.id}</div>
    </div>
    <img src="${currentPokemon.sprites.other["official-artwork"].front_default}">`;
    container.appendChild(card);
}

function detail(currentPokemon, i){
    removeDNone();
    let container = document.getElementById('pokeDetail');
    container.innerHTML += /*html*/`
    <div class="DetailCard">
            <div><img src="${currentPokemon.sprites.other["official-artwork"].front_default}"></div>
            <div>${currentPokemon.name}</div>
            <div class="DetailType">type: ${currentPokemon.types["0"].type.name}</div>
        <div class="DetailStats">
            <div>${currentPokemon.stats["0"].stat.name}: ${currentPokemon.stats["0"].base_stat}</div>
            <div>${currentPokemon.stats["1"].stat.name}: ${currentPokemon.stats["1"].base_stat}</div>
            <div>${currentPokemon.stats["2"].stat.name}: ${currentPokemon.stats["2"].base_stat}</div>
            <div>${currentPokemon.stats["5"].stat.name}: ${currentPokemon.stats["5"].base_stat}</div>
        </div>
        <button onclick="addDNone()">X</button>
    </div>`;
}

function removeDNone(){
    document.getElementById('pokeDetail').classList.remove('d-none');
}

function addDNone(){
    document.getElementById('pokeDetail').classList.add('d-none'); 
    let container = document.getElementById('pokeDetail');
    container.innerHTML =``;
}