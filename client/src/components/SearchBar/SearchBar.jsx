import React, { useState } from "react";
import { getDogsByBreeds } from "../../redux/actions";
import { connect } from "react-redux";
import styles from "./SearchBar.module.css";
import Cards from "../Cards/Cards.jsx";
import Card from "../Card/Card";
import FiltersDogs from "../FiltersDogs/FiltersDogs";

function SearchBar({ getDogsByBreeds, dogsBreeds }) {
  const [breed, setBreed] = useState("");

  function handleChange(evento) {
    setBreed(evento.target.value);
    getDogsByBreeds(breed);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getDogsByBreeds(breed);
    setBreed("");
  }

  return (
    <>
      <div className={styles.searchBar}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            className={styles.searchInput}
            type="text"
            id="breed"
            autoComplete="off"
            value={breed}
            placeholder="Ingresar una raza..."
            onChange={(e) => handleChange(e)}
          />
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
          <select className="select">
            <option>Ascendente</option>
            <option>Descendente</option>
          </select>
        </form>
      </div>
      {breed ? (
        <p className={styles.textTitle}>
          {dogsBreeds.length === 0 ? "No hay resultados" : "Estas razas coiciden con tu búsqueda"}
        </p>
      ) : null}
      <FiltersDogs dogs={dogsBreeds} />
    </>
  );
}
function mapStateToProps(state) {
  return {
    dogsBreeds: state.dogsBreeds,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDogsByBreeds: (breed) => dispatch(getDogsByBreeds(breed)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
