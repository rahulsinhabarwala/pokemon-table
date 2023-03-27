import {useState, useEffect} from "react";
import useFetch from "./hooks/useFetch";
// import {fetchPokemonDetails} from "./utils/fetchPokemonDetails";
import Table from "./components/Table";

import "./App.css";

function App() {
  const {
    isLoading,
    error,
    data: pokemonList,
  } = useFetch("https://pokeapi.co/api/v2/pokemon/");

  const [pokemonsDetails, setPokemonsDetails] = useState([]);

  const columns = [
    {header: "Name", field: "name"},
    {header: "Abilities", field: "abilities"},
  ];

  const fetchPokemonDetails = async () => {
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
        abilities: pokemon.abilities
          .map((ability) => ability.ability.name)
          .join(", "),
      };
    });
    setPokemonsDetails(pokemonData);
  };

  useEffect(() => {
    if (pokemonList) {
      fetchPokemonDetails(pokemonList);
    }
  }, [pokemonList]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="App">
      <Table columns={columns} data={pokemonsDetails} />
    </div>
  );
}

export default App;
