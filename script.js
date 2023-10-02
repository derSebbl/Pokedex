let AllPokemons = [];
let load = 20;
let currentLoad = 0;

function loadMore() {
  load += 20;
  loadPokemon();
  DisableBtn();
}

async function AddPokemon() {
  let url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  let response = await fetch(url);
  let responseAsJson = await response.json();
  AllPokemons = responseAsJson["results"];
  loadPokemon();
}

async function loadPokemon() {
  for (let i = currentLoad; i < load; i++) {
    if (i >= AllPokemons.length) {
      return;
    }
    currentLoad++;
    let PokemonUrl = AllPokemons[i].url;
    let Pokemon = await fetch(PokemonUrl);
    let currentPokemon = await Pokemon.json();
    renderPokedex(currentPokemon, i);
  }
}

function renderPokedex(currentPokemon, i) {
  let container = document.getElementById("pokedex");
  let card = document.createElement("div");
  card.className = "pokecard";
  card.setAttribute = ("data-url", currentPokemon.url); // damit die URL gespeichert wird um die richtigen Daten zu laden
  card.onclick = function () {
    OpenDetailCard(currentPokemon, i);
  }; 
  card.innerHTML = `<div class="cardHead">
    <div class="pokeName">${currentPokemon.name}</div>
    <div class="pokeId">${"#" + currentPokemon.id}</div>
    </div>
    <img src="${
      currentPokemon.sprites.other["official-artwork"].front_default
    }">`;
  container.appendChild(card);
}

function OpenDetailCard(currentPokemon, i) {
  removeDNone();
  AddHTMLDetail(currentPokemon, i);
  BtnAddDnone();
}

function AddHTMLDetail(currentPokemon, i) {
  let container = document.getElementById("pokeDetail");
  container.innerHTML += /*html*/ `
    <div id="DetailCard">
        <img src="${currentPokemon.sprites.other["official-artwork"].front_default}">
        <div class="DName">${currentPokemon.name}</div>
        <div class="DetailType">type: ${currentPokemon.types["0"].type.name}</div>
            <div class="Stats">
                <div class="HP">
                    <div class="StatArt">${currentPokemon.stats["0"].stat.name}:</div>
                    <div class="progress" role="progressbar" aria-label="Success example" aria-valuenow="${currentPokemon.stats["0"].base_stat}" aria-valuemin="0" aria-valuemax="200">
                    <div class="progress-bar bg-success" style="width: ${currentPokemon.stats["0"].base_stat}%">${currentPokemon.stats["0"].base_stat}</div>
                    </div>
                </div>
                <div class="Attack">
                    <div class="StatArt">${currentPokemon.stats["1"].stat.name}:</div>
                    <div class="progress" role="progressbar" aria-label="Info example" aria-valuenow="${currentPokemon.stats["1"].base_stat}" aria-valuemin="0" aria-valuemax="200">
                    <div class="progress-bar bg-info text-dark" style="width: ${currentPokemon.stats["1"].base_stat}%">${currentPokemon.stats["1"].base_stat}</div>
                    </div>
                </div>
                <div class="Defense">
                    <div class="StatArt">${currentPokemon.stats["2"].stat.name}:</div>
                    <div class="progress" role="progressbar" aria-label="Warning example" aria-valuenow="${currentPokemon.stats["2"].base_stat}" aria-valuemin="0" aria-valuemax="200">
                    <div class="progress-bar bg-warning text-dark" style="width: ${currentPokemon.stats["2"].base_stat}%">${currentPokemon.stats["2"].base_stat}</div>
                    </div>
                </div>
                <div class="Speed">
                    <div class="StatArt">${currentPokemon.stats["5"].stat.name}:</div>
                    <div class="progress" role="progressbar" aria-label="Danger example" aria-valuenow="${currentPokemon.stats["5"].base_stat}" aria-valuemin="0" aria-valuemax="200">
                    <div class="progress-bar bg-danger" style="width: ${currentPokemon.stats["5"].base_stat}%">${currentPokemon.stats["5"].base_stat}</div>
                    </div>
                </div>
            </div>
                <div>
                 <button type="button" class="btn btn-warning" id="X" onclick="addDNone()">x</button>
                </div>
    </div>`;
    closeWindow();
}

function removeDNone() {
  document.getElementById("pokeDetail").classList.remove("d-none");
}

function addDNone() {;
    let container = document.getElementById("pokeDetail");
    container.classList.add("d-none");
    container.innerHTML = ``;
    BtnRemoveDnone();
}

function closeWindow(){
    document.getElementById("pokeDetail").addEventListener('mouseup',function(event)
    {
        let div = document.getElementById("DetailCard");
        if(event.target != div && event.target.parentNode != div){
        addDNone();
        }})
        BtnRemoveDnone();
}

function BackToTop(){
  document.documentElement.scrollTop = 0;
}

function DisableBtn(){
  document.getElementById("More").disabled = true;
  setTimeout(function(){document.getElementById("More").disabled = false;},4000);
}

function BtnAddDnone(){
  document.getElementById('Top').classList.add('d-none');
}

function BtnRemoveDnone(){
  document.getElementById('Top').classList.remove('d-none');
}
