import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCarousel({ allPokemons }) {
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [pokemonImageArray, setPokemonImageArray] = useState([]);

  const getPokemonInfo = async () => {
    const response = await axios.get(allPokemons);
    setPokemonInfo(response.data);
    setLoading(false);
  };

  const fetchPokemonImage = () => {
    if (pokemonInfo.results) {
      const imageArray = pokemonInfo.results.map((pokemon) => {
        return pokemon.url.sprites.front_default;
      });
      setPokemonImageArray(imageArray);
    }
  };

  useEffect(() => {
    getPokemonInfo();
  }, []);

  useEffect(() => {
    if (!loading) {
      fetchPokemonImage();
    }
  }, [loading]);

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
