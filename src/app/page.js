"use client";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import PokemonCard from "./components/card";
import PokemonCarousel from "./components/carousel";

export default function Home() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [onePokemon, setOnePokemon] = useState({});

  const getOnePokemon = (name) => {
    const foundOnePokemon = allPokemons.filter((pokemon) => {
      return pokemon.name === name;
    });
    setOnePokemon(foundOnePokemon);
  };

  const getAllPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=20")
      .then((response) => {
        setAllPokemons(response.data.results);
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>
      <PokemonCarousel allPokemons={allPokemons} />
      {onePokemon[0]?.name && (
        <p className="text-xl border rounded-md text-center px-5 py-2">
          {onePokemon[0].name}
        </p>
      )}
      <div className="text-left h-fit w-fit overflow-y-auto grid grid-cols-10 gap-1">
        {allPokemons.map((pokemon) => {
          return (
            <PokemonCard
              key={uuidv4()}
              pokemon={pokemon}
              getOnePokemon={getOnePokemon}
            />
          );
        })}
      </div>
    </main>
  );
}
