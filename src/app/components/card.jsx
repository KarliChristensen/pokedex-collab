import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCard({ pokemon, getOnePokemon }) {
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState({});

  const getPokemonInfo = async () => {
    const response = await axios.get(pokemon.url);
    setPokemonInfo(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  if (loading) {
    return <div className="loading"></div>;
  } else {
    return (
      <div
        className="border border-gray-600 h-fit hover:cursor-pointer opacity-70 hover:opacity-100"
        onClick={() => getOnePokemon(pokemon?.name)}
      >
        <img src={pokemonInfo.sprites.front_default} alt="sprite" />
        <p className="text-center font-extralight">
          {pokemonInfo.species?.name}
        </p>
      </div>
    );
  }
}