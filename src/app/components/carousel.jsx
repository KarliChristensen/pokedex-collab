import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCarousel({ allPokemons }) {
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [pokemonImageArray, setPokemonImageArray] = useState([]);

  const getPokemonImages = () => {
    let imageArray = [];
    allPokemons.forEach(async(pokemon) => {
      const response = await axios.get(pokemon.url)
        imageArray.push(response.data.sprites.front_default)
    });
    setPokemonImageArray(imageArray)
  };

  useEffect(() => {
    getPokemonImages();
    setLoading(false)
  }, [allPokemons]);

  if (loading) {
    return <div className="loading"></div>;
  } else {
    return (
      <ul className="flex overflow-x-auto">
        {pokemonImageArray.map((image, i) => (
          <li key={i} className="flex-shrink-0">
            <img src={image} width="250" height="250" alt={`Item ${i}`} />
          </li>
        ))}
      </ul>
    );
  }
}
