import React, { useEffect, useState } from "react";
import { getDogsByBreeds } from "../../redux/actions";
import { connect } from "react-redux";
import styles from "./SearchBar.module.css";

function SearchBar({ getDogsByBreeds, dogsBreeds, setDogToShow, dogsToShow, temperaments, dogsLoaded, setCurrentPage}) {
  const [breed, setBreed] = useState("");

  useEffect(()=>{
    setCurrentPage(1)
    setDogToShow(dogsBreeds)
  }, [dogsBreeds])

  async function handleInputChange(evento) {
    setBreed(evento.target.value);
    getDogsByBreeds(breed);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (breed === '') {
      return setDogToShow(dogsLoaded)
    }
    getDogsByBreeds(breed);
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
      const dogsOrderByMayor = [...dogsToShow].sort(function (dog1, dog2) {
        return parseInt(dog2.weight.imperial) - parseInt(dog1.weight.imperial);
      });

      setDogToShow(dogsOrderByMayor);
      return;
    }

    if (e.target.value === "menor") {
      const dogsOrderByMenor = [...dogsToShow].sort(function (dog1, dog2) {
        return parseInt(dog1.weight.imperial) - parseInt(dog2.weight.imperial);
      });

      setDogToShow(dogsOrderByMenor);
      return;
    }
  }

  function filterByTemperaments(e) {
    const dogsOrderByTemperaments = [];
    dogsLoaded.forEach((dog) => {
      if (dog.temperament?.includes(e.target.value)) {
        dogsOrderByTemperaments.push(dog);
      }
    });
    setDogToShow(dogsOrderByTemperaments);
  }

  function getAllDogs(e) {
    setDogToShow(dogsLoaded);
  }

  function SortArrayAsc(x, y) {
    return x.name.localeCompare(y.name, "fr", { ignorePunctuation: true });
  }

  function SortArrayDec(x, y) {
    return y.name.localeCompare(x.name, "fr", { ignorePunctuation: true });
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} className={styles.searchBar}>
        <div className={styles.searchInputContainer}>
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
            buscar
          </button>
        </div>
        <div className={styles.selectContainer}>
          <select className="select" onChange={(e) => filterByOrder(e)}>
            <option value="az">A-Z / Z-A</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
          <select className="select" onChange={(e) => filterByWeight(e)}>
            <option value="menor">Peso</option>
            <option value="mayor">Mayor a Menor</option>
            <option value="menor">Menor a Mayor</option>
          </select>
          <select className="select" onChange={(e) => filterByTemperaments(e)}>
            <option value="">Temperamentos</option>
            {temperaments?.map((temperamento) => {
              return (
                <option key={temperamento.id} value={temperamento.name}>
                  {temperamento.name}
                </option>
              );
            })}
          </select>
          <img onClick={() => getAllDogs()} className={styles.resetBtn} src="https://img.icons8.com/material-sharp/96/000000/reboot.png"/>
        </div>
      </form>
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
