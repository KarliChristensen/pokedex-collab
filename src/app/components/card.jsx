import axios from "axios";
import { useEffect, useState } from "react";

export default function PokemonCard({ pokemon, getOnePokemon }) {
  const [hoverStatus, setHoverStatus] = useState(false);
  const [hoverImage, setHoverImage] = useState(false);
  const [noHoverImage, setNoHoverImage] = useState("");
  const [image, setImage] = useState("");
  const [pokemonInfo, setPokemonInfo] = useState({});

  const getPokemonInfo = async () => {
    const response = await axios.get(pokemon.url);
    setPokemonInfo(response.data);
    setNoHoverImage(response.data.sprites.front_default);
    setHoverImage(response.data.sprites.front_shiny);
    setImage(response.data.sprites.front_default);
  };

  const changePicture = () => {
    if (!hoverStatus) {
      setImage(noHoverImage);
    }
    if (hoverStatus) {
      setImage(hoverImage);
    }
  };

  useEffect(() => {
    getPokemonInfo();
    setImage(pokemonInfo?.sprites?.front_default);
  }, []);

  useEffect(() => {
    changePicture();
  }, [hoverStatus]);

  return (
    <div
      className="border border-neutral h-fit hover:cursor-pointer"
      onClick={() => getOnePokemon(pokemon?.name)}
      onMouseEnter={() => setHoverStatus(true)}
      onMouseLeave={() => setHoverStatus(false)}
    >
      <img src={image} alt="sprite" />
      <p className="text-center">{pokemonInfo.species?.name}</p>
    </div>
  );
}
