import React from "react";
import Card from "../Card/Card";
import styles from "./FiltersDogs.module.css";

const FiltersDogs = ({ dogs }) => {
  return (
    <>
      <div className={styles.filtersBreeds}>
        {dogs.map((dog) => {
          return <Card dog={dog} key={dog.id} />;
        })}
      </div>
    </>
  );
};

export default FiltersDogs;
