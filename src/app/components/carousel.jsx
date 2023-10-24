import React from "react";
import { useEffect, useState } from "react";

export default function PokemonCarousel() {
  const [pokemonInfo, setPokemonInfo] = useState({});

  const getPokemonInfo = async () => {
    const response = await axios.get(pokemon.url);
    setPokemonInfo(response.data);
    setLoading(false);
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  //generate Pokemon picture array 

  return (
    <ul className="flex overflow-x-auto">
      {Array.from({ length: 18 }).map((_, i) => (
        <li key={i} className="flex-shrink-0">
          <img
            src={`https://picsum.photos/500?${i}`}
            width="250"
            height="250"
            alt={`Item ${i}`}
          />
        </li>
      ))}
    </ul>
  );
}
