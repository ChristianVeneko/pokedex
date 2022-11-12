const pokemonContainer = document.querySelector('.pokemon-container')

function fetchPokemon(id){
    let pkm
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((resp) => {
        if(resp.ok){
            return resp.json();
        }
    }).then((json) => {
        createPokemon(json)
    })
}


function fetchPokemons(num){
    for(let i = 1; i <= num; i++){
        fetchPokemon(i)
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

fetchPokemons(151)