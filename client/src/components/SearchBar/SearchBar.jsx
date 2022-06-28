import React, { useState } from "react";
import { getDogsByBreeds } from "../../redux/actions";
import { connect } from "react-redux";
import styles from "./SearchBar.module.css";
// import Cards from "../Cards/Cards.jsx";
// import Card from "../Card/Card";
// import FiltersDogs from "../FiltersDogs/FiltersDogs";

function SortArrayAsc(x, y) {
  return x.name.localeCompare(y.name, "fr", { ignorePunctuation: true });
}

function SortArrayDec(x, y){
  return y.name.localeCompare(x.name, 'fr', {ignorePunctuation: true});
}

function SearchBar({ getDogsByBreeds, dogsBreeds, setDogToShow, dogsToShow }) {
  const [breed, setBreed] = useState("");

  async function handleInputChange(evento) {
    setBreed(evento.target.value);
    await getDogsByBreeds(breed);
    setDogToShow([...dogsBreeds]);
  }

  
  function handleSubmit(e) {
    e.preventDefault();
    getDogsByBreeds(breed);
    setBreed("");
  }
  
  function filterByOrder(e) {
    if (e.target.value === "az") {
      const dogsOrderByAZ = [...dogsToShow].sort(SortArrayAsc);
      setDogToShow(dogsOrderByAZ);
      return;
    }

    if (e.target.value === "za") {
      const dogsOrderByZA = [...dogsToShow].sort(SortArrayDec);
      setDogToShow(dogsOrderByZA);
      return;
    }
  }

  function filterByWeight(e) {
    if (e.target.value === "mayor") {
      console.log("mayor a menor");

      const dogsOrderByMayor = [...dogsToShow].sort(function (dog1, dog2) {
        return parseInt(dog2.weight.imperial) - parseInt(dog1.weight.imperial);
      });

      setDogToShow(dogsOrderByMayor);
      return;
    }
    if (e.target.value === "menor") {
      console.log("menor a mayor");

      const dogsOrderByMenor = [...dogsToShow].sort(function (dog1, dog2) {
        return parseInt(dog1.weight.imperial) - parseInt(dog2.weight.imperial);
      });

      setDogToShow(dogsOrderByMenor);
      return;
    }
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
            onChange={(e) => handleInputChange(e)}
          />
          <button className={styles.searchBtn} type="submit">
            Search
          </button>
          <select className="select" onChange={(e) => filterByOrder(e)}>
            <option value="az">A-Z / Z-A</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          <select className="select" onChange={(e) => filterByWeight(e)}>
            <option value="menor">Weight</option>
            <option value="mayor">Mayor a Menor</option>
            <option value="menor">Menor a Mayor</option>
          </select>
        </form>
      </div>
      {/* {breed ? (
        <p className={styles.textTitle}>
          {dogsBreeds.length === 0 ? "No hay resultados" : "Estas razas coiciden con tu búsqueda"}
        </p>
      ) : null}
      <FiltersDogs dogs={dogsBreeds} /> */}
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
