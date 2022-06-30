import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ dog }) => {
  return (
    <Link className={styles.card} to={`/dogs/${dog.id}`}>
      <div className={styles.container}>
        {
        dog.image?.url 
        ? <img src={dog.image?.url} alt={dog.name}/>
        : <img src={`https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`} alt={dog.name}/>
        }
      </div>
      <div className={styles.details}>
        <h3>{dog.name}</h3>
        <p className={styles.temperaments}>Temperamentos: {dog.temperament}</p>
        <p>Peso: {dog.weight.imperial} Kg</p>
      </div>
    </Link>
  );
};
export default Card;
