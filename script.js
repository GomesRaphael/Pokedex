const pokemonName = document.querySelector('.pokemon__Name');
const pokeId = document.querySelector('.pokemon__Number');
const form = document.querySelector('.form')
const searchInput = document.querySelector('.input__search')
const pokemonImage = document.querySelector('.pokemon__image')
const btnNext = document.querySelector('.button.btn-next')
const btnPrev = document.querySelector('.button.btn-prev')
let currentPokemonId = 1

async function fetchPokemon(pokemon) {
    try {
        const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        if (APIResponse.status == 200) {
            const data = await APIResponse.json();
            return data;
        }

    } catch (error) {
        alert("Não foi possivel se comunicar com a PokéAPI")
    }
}

async function renderPokemon(pokemon) {
    const data = await fetchPokemon(pokemon);

    if (data) {

        pokemonName.innerHTML = data.name;
        pokeId.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        currentPokemonId = data.id;
    } else {
        pokemonName.innerHTML = 'Não Encontrado';
        currentPokemonId = 0
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderPokemon(searchInput.value)
    searchInput.value = ""
    return false
});
btnNext.addEventListener("click", () => {
    renderPokemon(++currentPokemonId)
});
btnPrev.addEventListener("click", () => {
    if (currentPokemonId > 1)
        renderPokemon(--currentPokemonId)
});

renderPokemon(currentPokemonId) //renderizar pela primeira vez