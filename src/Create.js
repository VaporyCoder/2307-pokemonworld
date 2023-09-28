import React, { useState } from "react";

const Create = ({ createPokemon, createTrainer }) => {
  const [pokemonName, setPokemonName] = useState("");
  const [name, setName] = useState("");

  const handleCreateTrainer = async (e) => {
    e.preventDefault();
    createTrainer(name);
    setName("");
  };

  const handleCreatePokemon = async (e) => {
    e.preventDefault();
    createPokemon(pokemonName);
    setPokemonName("");
  };

  return (
    <div>
      <h2>Create a New Trainer</h2>
      <form onSubmit={handleCreateTrainer}>
        <input
          type="text"
          placeholder="Enter Trainer's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit">Add Trainer</button>
      </form>

      <h2>Create a New Pokémon</h2>
      <form onSubmit={handleCreatePokemon}>
        <input
          type="text"
          placeholder="Enter Pokémon Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <button type="submit">Spawn Pokémon</button>
      </form>
    </div>
  );
};

export default Create;
