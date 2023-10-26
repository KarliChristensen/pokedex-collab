import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCarousel({ allPokemons }) {
  const [loading, setLoading] = useState(true);
  const [pokemonInfo, setPokemonInfo] = useState({});
  const [pokemonImageArray, setPokemonImageArray] = useState([]);

  const getPokemonImages = async () => {
    let imageArray = [];
    for (const pokemon of allPokemons) {
      const response = await axios.get(pokemon.url);
      imageArray.push(response.data.sprites.front_default);
    }
    setPokemonImageArray(imageArray);
  };

  useEffect(() => {
    getPokemonImages();
    setLoading(false);
  }, [allPokemons]);

  if (loading) {
    return <div className="loading"></div>;
  } else {
    return (
      <div className="w-full">
        <ul className="w-full flex overflow-x-auto">
          {pokemonImageArray.map((image, i) => (
            <div key={i} className="flex-shrink-0 bg-red-700 mr-5 rounded-lg ">
              <div className="flex flex-col">
                <img src={image} className="h-[200px] top-0" alt={`Item ${i}`} />
              </div>
            </div>
          ))}
        </ul>
      </div>
    );
  }
}
