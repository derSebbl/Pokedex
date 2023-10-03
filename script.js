let AllPokemons = [];
let load = 20;
let currentLoad = 0;
const typeColors = {
  normal: "#929DA3",
  poison: "#AA6BC8",
  bug: "#91C12F",
  fire: "#FF9D55",
  electric: "#F4D23C",
  dragon: "#0B6DC3",
  fighting: "#CE416B",
  ground: "#D97845",
  ghost: "#5269AD",
  water: "#5090D6",
  psychic: "#FA7179",
  dark: "#5A5465",
  flying: "#8FA9DE",
  rock: "#C5B78C",
  steel: "#5A8EA2",
  grass: "#63BC5A",
  ice: "#73CEC0",
  fairy: "#EC8FE6",
  default: "#E6D8BC",
};

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
  let type = currentPokemon.types["0"].type.name;
  let backgroundColor = setTypeBackground(type);
  container.innerHTML += /*html*/`
      <div id="DetailCard"  style="background-color: ${backgroundColor};">
          <div class="DetailBtn">
           <button type="button" class="btn btn-warning" id="X" onclick="addDNone()">x</button>
          </div>
        <img src="${currentPokemon.sprites.other["official-artwork"].front_default}">
        <div class="DName">${currentPokemon.name}</div>
        <div class="DetailType">type: ${type}</div>
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
    </div>`;
  closeWindow();
}

function removeDNone() {
  document.getElementById("pokeDetail").classList.remove("d-none");
}

function addDNone() {
  let container = document.getElementById("pokeDetail");
  container.classList.add("d-none");
  container.innerHTML = ``;
  BtnRemoveDnone();
}

function closeWindow() {
  document
    .getElementById("pokeDetail")
    .addEventListener("mouseup", function (event) {
      let div = document.getElementById("DetailCard");
      if (event.target != div && event.target.parentNode != div) {
        addDNone();
      }
    });
  BtnRemoveDnone();
}

function BackToTop() {
  document.documentElement.scrollTop = 0;
}

function DisableBtn() {
  document.getElementById("More").disabled = true;
  setTimeout(function () {
    document.getElementById("More").disabled = false;
  }, 4000);
}

function BtnAddDnone() {
  document.getElementById("Top").classList.add("d-none");
}

function BtnRemoveDnone() {
  document.getElementById("Top").classList.remove("d-none");
}

function setTypeBackground(typeName) {
  return typeColors[typeName] || typeColors.default;
}
