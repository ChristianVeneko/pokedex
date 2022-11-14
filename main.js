const pokemonContainer = document.querySelector('.pokemon-container')
let pokemons 


function fetchPokemons(limit){
    let pkms
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    .then((res) => res.json())
    .then((data) => {
        data = JSON.stringify(data);
        pkms = JSON.parse(data);
        console.log(pkms);
        console.log(pkms.results[1]);
        console.log(pkms.results.length);
        //fetchPokemon1(pkms.results.length);
    })
}

fetchPokemons(151)

function fetchPokemon1(num){
    let pkm
    let url
    for(let i = 1; i <= num; i++){
        url = `https://pokeapi.co/api/v2/pokemon/${i}/`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
        data = JSON.stringify(data);
        pkm = JSON.parse(data);
        console.log(pkm.id)
        createPokemon(pkm);
    })
    }
}

function createPokemon(pokemon){
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    const type = document.createElement('p');
    type.classList.add('type');
    type.textContent = `Type: ${pokemon.types.map(type => type.type.name)}`;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(type);
    card.appendChild(name);

    pokemonContainer.appendChild(card);

}
