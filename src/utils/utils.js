export const fetchPokemonDetails = async ({pokemonList}) => {
  console.log('pokemonList', pokemonList)
  const requests = await pokemonList.results.map((pokemon) =>
    fetch(pokemon.url)
  );
  const pokemonsDetailsList = await Promise.all(requests);
  const pokemonDetails = await Promise.all(
    pokemonsDetailsList.map((pokemon) => pokemon.json())
  );
  const pokemonData = pokemonDetails.map((pokemon) => {
    return {
      name: pokemon.name,
      abilities: pokemon.abilities.map((ability) => ability.ability.name),
    };
  });
  setPokemonsDetails(pokemonData);
};
