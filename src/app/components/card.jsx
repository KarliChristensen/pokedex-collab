import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCard({ pokemon, getOnePokemon }) {
    const [pokemonInfo, setPokemonInfo] = useState({})

    const getPokemonInfo = async () => {
        const response = await axios.get(pokemon.url)
        setPokemonInfo(response.data)
    }

    useEffect(() => {
        getPokemonInfo()
    }, [])

    console.log(pokemonInfo)

  return (
    <div className="border border-neutral">
    <img src={pokemonInfo.sprites?.front_default} alt="sprite"/>
      <p
        className="hover:cursor-pointer"
        onClick={() => getOnePokemon(pokemon.species.name)}
      >
        {pokemon.name}
      </p>
    </div>
  );
}
