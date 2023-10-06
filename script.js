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

let currentIndex = 0;

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
  currentIndex = i;
  removeDNone();
  AddHTMLDetail(currentPokemon, i);
  showStats(currentPokemon);
  BtnAddDnone();
}

function AddHTMLDetail(currentPokemon, i) {
  let container = document.getElementById("pokeDetail");
  let type = currentPokemon.types["0"].type.name;
  let backgroundColor = setTypeBackground(type);
  container.innerHTML += /*html*/`
      <div id="DetailCard" style="background-color: ${backgroundColor};">
          <div id="DetailBtn">
           
           
           <button type="button" class="btn btn-warning" id="X" onclick="addDNone()">x</button>
          </div>
          <div>
            <img src="${currentPokemon.sprites.other["official-artwork"].front_default}">
         </div>
         <div class="btnimg">
           <button type="button" class="btn btn-warning" id="back" onclick="backPokemon()"><<<</button>
          <div class="DName">${currentPokemon.name}</div>
        <button type="button" class="btn btn-warning" id="next" onclick="nextPokemon()">>>></button>
        </div>
        <div class="DetailType">type: ${type}</div>
        <div id="InfoContainer">
          <div><span id="StatSpan" onclick="showStats()">Stats</span></div>
          <div><span id="MoveSpan"onclick="showMoves()">Moves</span></div>
          <div><span id="MeasurSpan"onclick="showBody()">Measurements</span></div>
        </div>
        <div id="Result"></div>
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
  document.getElementById("pokeDetail").addEventListener("mouseup", function (event) {
      let div = document.getElementById('pokeDetail');
      if (event.target == div) {
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

async function nextPokemon(){
  if(currentIndex >= AllPokemons.length){
    addDNone();
  }
  if(currentIndex >= currentLoad){
    await loadMore();
    nextPokemon();
  }
  else{
    currentIndex++;
    let NextPokemonUrl = AllPokemons[currentIndex].url;
    let pokemon= await fetch(NextPokemonUrl);
    let NextPokemon = await pokemon.json();
    document.getElementById('DetailCard').remove();
    OpenDetailCard(NextPokemon, currentIndex)
  }
  }

  async function backPokemon(){
    document.getElementById('DetailCard').remove();
    if(currentIndex <= 0){
      addDNone();
    }
    else{
    currentIndex--;
    let NextPokemonUrl = AllPokemons[currentIndex].url;
    let pokemon= await fetch(NextPokemonUrl);
    let NextPokemon = await pokemon.json();
    OpenDetailCard(NextPokemon, currentIndex)
  }
  }

  function SearchPokemon(){
    
  }

   async function showStats(){
    let NextPokemonUrl = AllPokemons[currentIndex].url;
    let pokemon= await fetch(NextPokemonUrl);
    let currentPokemon = await pokemon.json();
    let statcontainer = document.getElementById('Result');
    statcontainer.innerHTML = ``;
    statcontainer.innerHTML = `
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
    `;
    document.getElementById('StatSpan').classList.add("Underline");
    document.getElementById('MoveSpan').classList.remove("Underline");
    document.getElementById('MeasurSpan').classList.remove("Underline");
  }

  async function showMoves(){
    let NextPokemonUrl = AllPokemons[currentIndex].url;
    let pokemon= await fetch(NextPokemonUrl);
    let currentPokemon = await pokemon.json();
    let statcontainer = document.getElementById('Result');
    statcontainer.innerHTML = ``;
    statcontainer.innerHTML =`
    <div class="moves">
    <div>
    <div class="move">1. ${currentPokemon.moves["0"].move.name}</div>
    <div class="move">3. ${currentPokemon.moves["2"].move.name}</div>
    </div>
    <br>
    <div>
    <div class="move">2. ${currentPokemon.moves["1"].move.name}</div>
    <div class="move">4. ${currentPokemon.moves["3"].move.name}</div>
    </div>
    </div>`;
    document.getElementById('StatSpan').classList.remove("Underline");
    document.getElementById('MoveSpan').classList.add("Underline");
    document.getElementById('MeasurSpan').classList.remove("Underline");
  };

 async function showBody(){
    let NextPokemonUrl = AllPokemons[currentIndex].url;
    let pokemon= await fetch(NextPokemonUrl);
    let currentPokemon = await pokemon.json();
    let statcontainer = document.getElementById('Result');
    let height = currentPokemon.height / 10;
    let weight = currentPokemon.weight / 10;
    statcontainer.innerHTML = ``;
    statcontainer.innerHTML =`
    <div class="measur">
      <div class="height">
        <div>Height:</div><div>${height} m</div>
      </div>
      <div class="weight">
        <div>Weight:</div><div>${weight} kg</div>
      </div>
    </div>
   `; 
   document.getElementById('StatSpan').classList.remove("Underline");
   document.getElementById('MoveSpan').classList.remove("Underline");
   document.getElementById('MeasurSpan').classList.add("Underline");
  }


