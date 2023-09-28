import React, { useState } from "react";

const Create = ({ createPokemon }) => {
  const [pokemonName, setPokemonName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createPokemon(pokemonName);
    setPokemonName("");
  };

  return (
    <div>
      <h2>Create a New Pokémon</h2>
      <form onSubmit={handleSubmit}>
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
