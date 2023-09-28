import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { HashRouter, Link, Routes, Route } from "react-router-dom";
import Pokemons from "./Pokemons";
import Trainers from "./Trainers";
import Pokemon from "./Pokemon";
import Trainer from "./Trainer";
import Assign from "./Assign";
import Create from "./Create";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [trainers, setTrainers] = useState([]);
  

  useEffect(() => {
    const fetchPokemon = async () => {
      const { data } = await axios.get("/api/pokemons");
      setPokemons(data);
    };
    fetchPokemon();
  }, []);
  useEffect(() => {
    const fetchTrainers = async () => {
      const { data } = await axios.get("/api/trainers");
      setTrainers(data);
    };
    fetchTrainers();
  }, []);

  const assignTrainer = async (trainerId, pokemonId) => {
    console.log(trainerId, pokemonId);
    const chosenPoke = pokemons.find((poke) => {
      return pokemonId == poke.id;
    });
    const updatedPoke = { ...chosenPoke, trainer_id: trainerId };
    console.log(updatedPoke);

    const response = await axios.put(
      `/api/pokemons/${updatedPoke.id}`,
      updatedPoke
    );
    const pokemon = response.data;
    setPokemons(
      pokemons.map((poke) => (poke.id === pokemon.id ? pokemon : poke))
    );
  };

  const createPokemon = async (pokemonName) => {
    try {
      // Make a POST request to add the new Pokémon to your database
      const response = await axios.post("/api/pokemons", {
        name: pokemonName,
        // You may need to provide additional data or fields as needed
      });

      // Update the state with the newly created Pokémon
      setPokemons([...pokemons, response.data]);
    } catch (error) {
      console.error("Error creating Pokémon:", error);
    }
  };

  const createTrainer = async (trainerName) => {
    try {
      const response = await axios.post("/api/trainers", {
        name: trainerName,
      });

      setTrainers([...trainers, response.data]);
    } catch (error) {
      console.error("Error creating trainer:", error);
    }
  };


  return (
    <div>
      <h1>Pokemon World</h1>
      <nav>
        <Link to="/pokemon">
          <button className="css-button-3d--red">All Pokemon</button>
        </Link>
        <Link to="/trainers">
        <button className="css-button-3d--red">All Trainers</button>
        </Link>
        <Link to="/assign">
        <button className="css-button-3d--red">Assign</button>
        </Link>
        <Link to="/create">
        <button className="css-button-3d--red">Create</button>
        </Link>
      </nav>

      <Routes>
        <Route path="/pokemon" element={<Pokemons pokemons={pokemons} />} />
        <Route path="/trainers" element={<Trainers trainers={trainers} />} />
        <Route
          path="/assign"
          element={
            <Assign
              pokemons={pokemons}
              trainers={trainers}
              assignTrainer={assignTrainer}
            />
          }
        />
        <Route
          path="/create"
          element={<Create createPokemon={createPokemon} createTrainer={createTrainer} />}
        />
        <Route
          path="/pokemon/:id"
          element={<Pokemon pokemons={pokemons} trainers={trainers} />}
        />
        <Route
          path="/trainers/:id"
          element={<Trainer trainers={trainers} pokemons={pokemons} />}
        />
      </Routes>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <HashRouter>
    <App />
  </HashRouter>
);
