let AllPokemonsUrl = [];
let AllPokemons = [];
let PokeInfo = [];


async function init(){
    await AddPokemon();
    await loadPokedex();
    PushInfo();
}


async function AddPokemon(){
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let results = responseAsJson['results'];

    for (i = 0; i < results.length; i++){
        const pokemon = results[i]['name'];
        const url = results[i]['url']
        AllPokemons.push(pokemon);
        AllPokemonsUrl.push(url);
    }
}

function loadPokedex(){
    for (let i = 0; i < AllPokemons.length; i++) {
        const pokemon = AllPokemons[i];
        let container = document.getElementById('pokedex');

        container.innerHTML +=`<div id="pokemon${i}">
        <h3>${pokemon}</h3>
        </div>`;
    }
}

async function PushInfo(){
    for (let i = 0; i < AllPokemonsUrl.length; i++) {
        const url = AllPokemonsUrl[i];
        let response = await fetch(url);
        let responseAsJson1 = await response.json();
        PokeInfo.push(responseAsJson1);
    }
}

function loadPictures (){
    let picture = PokeInfo[0]['id'];
    console.log(picture);
}