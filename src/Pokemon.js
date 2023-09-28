import React from "react";
import { useParams, Link } from "react-router-dom";

const Pokemon = ({ pokemons, trainers }) => {
  const { id } = useParams();
  const idNum = id * 1;

  const pokemon = pokemons.find((poke) => {
    return poke.id === idNum;
  });
  console.log(pokemon);

  const trainer = trainers.find((train) => {
    return pokemon.trainer_id === train.id;
  });
  console.log(trainer);

  const handleRemoveTrainer = () => {
    // Update the trainer_id property of the pokemon to null
    pokemon.trainer_id = null;
    setTrainer(null);
  };

  if (!pokemon) {
    return null;
  }
  return (
    <div>
      <h1>{pokemon.name}</h1>
      <hr />
      <h3>Current Trainer:</h3>
      {trainer ? (
      <div>
        <Link to={`/trainers/${trainer.id}`}>
          <h5>{trainer.name}</h5>{" "}
        </Link>
        <button onClick={handleRemoveTrainer}>Remove Trainer</button>
      </div>
      ) : (
        <h5>No Trainer</h5>
      )}
    </div>
  );
};

export default Pokemon;
