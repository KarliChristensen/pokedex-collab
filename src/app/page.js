"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

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
      .get("https://pokeapi.co/api/v2/pokemon/?limit=1300")
      .then((response) => {
        setAllPokemons(response.data.results);
      });
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

      {onePokemon[0]?.name && (
        <p className="text-xl border rounded-md text-center px-5 py-2">
          {onePokemon[0].name}
        </p>
      )}
      <div className="text-left h-[200px] w-[400px] overflow-y-auto grid grid-cols-3">
        {allPokemons.map((pokemon) => {
          return (
            <p
              className="hover:cursor-pointer"
              key={uuidv4()}
              onClick={() => getOnePokemon(pokemon.name)}
            >
              {pokemon.name}
            </p>
          );
        })}
      </div>
    </main>
  );
}
