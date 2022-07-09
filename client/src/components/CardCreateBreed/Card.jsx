import React from "react";
import styles from "./Card.module.css";

const Card = ({ dog, input, setInput }) => {
  function deleteSpan(e) {
    const arrayFilter = input.temperament.filter((t, i) => i != e.target.id);
    setInput({ ...input, temperament: arrayFilter });
  }

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        {
          dog.image === ''
          ? <img src='https://cdn.pixabay.com/photo/2021/05/17/10/40/dog-6260301_960_720.jpg'alt={dog.name} />
          : <img src={dog.image} alt={dog.name} />
        }
      </div>
      <div className={styles.details}>
        <h3>{dog.name}</h3>
        {dog.weightMin || dog.weightMax ? (
          <p>
            Peso: {dog.weightMin} - {dog.weightMax} kg
          </p>
        ) : null}
        {dog.heightMin || dog.heightMax ? (
          <p>
            Altura: {dog.heightMin} - {dog.heightMax} cm
          </p>
        ) : null}
        {dog.life_span ? <p>Años de vida: {dog.life_span}</p> : null}
        <div className={styles.temperaments}>
          {input.temperament.leght > 0 ? (
            <p>Temperaments: </p>
          ) : (
            input.temperament?.map((temperament, index) => {
              return (
                <span className={styles.span} key={index} id={index} onClick={(e) => deleteSpan(e)}>
                  {temperament}
                </span>
              );
            })
          )}
        </div>
      </div>
    </div>
    // <img className={styles.cardIcon} src={dog.image.url}/>
    // <p className={styles.cardDescription}>
    //   {dog.id + dog.name}
    // </p>
  );
};
export default Card;
