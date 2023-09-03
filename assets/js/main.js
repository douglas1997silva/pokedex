const pokemonList = document.getElementById('pokemonList')
const maisButton = document.getElementById('maisButton')

const maxRecords = 151
const limit = 15
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function PokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const Html = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += Html
    })
}

PokemonItens(offset, limit)

maisButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        PokemonItens(offset, newLimit)

        maisButton.parentElement.removeChild(maisButton)
    } else {
        PokemonItens(offset, limit)
    }
})

