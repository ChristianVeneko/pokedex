const pokemonContainer = document.querySelector('.pokemon-container')
let pokemons 

//funcion inutil pero la dejo pk es la primera que se hizo
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
        fetchPokemon(pkms.results.length);
    })
}

fetchPokemons(151)

const fetchPokemon = (num) => {
    const promises = [];
    for (let i = 1; i <= num; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites.front_default,
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        })).sort((a, b) => a.id > b.id ? 1 : -1);
        for(let i = 0; i <= num; i ++){
            createPokemon(pokemon[i])
        }
    });
}

function createPokemon(pokemon){
    const card = document.createElement('div');
    card.classList.add('pokemon-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.image

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    const type = document.createElement('p');
    type.classList.add('type');
    type.textContent = pokemon.type;

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(type);
    card.appendChild(name);

    pokemonContainer.appendChild(card);

}
