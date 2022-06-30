import React, { useEffect } from "react";
import { getDogDetails } from "../../redux/actions";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./DogDetails.module.css";

const DogDetails = ({ dogDetails, getDogDetails, id }) => {
  useEffect(() => {
    getDogDetails(id);
  }, []);
  console.log(dogDetails);

  return (
    <section>
      <Navbar />
      <div className={styles.detailsContainer}>
        {dogDetails.image?.url ? (
          <img className={styles.backgroundImage} src={dogDetails.image.url} />
        ) : (
          <img
            className={styles.backgroundImage}
            src={`https://cdn2.thedogapi.com/images/${dogDetails.reference_image_id}.jpg`}
          />
        )}
        <div className={styles.details}>
          {dogDetails.image?.url ? (
            <img className={styles.portadaImage} src={dogDetails.image.url} />
          ) : (
            <img
              className={styles.portadaImage}
              src={`https://cdn2.thedogapi.com/images/${dogDetails.reference_image_id}.jpg`}
            />
          )}
          <div className={styles.description}>
            <h3>{dogDetails.name}</h3>
            <p>{dogDetails.temperament}.</p>
            <p>Altura: {dogDetails.height?.metric ? dogDetails.height.metric : dogDetails.height} cm</p>

            <p>Peso: {dogDetails.weight?.metric ? dogDetails.weight.metric : dogDetails.weight} Kg</p>
            <p>Años de vida: {dogDetails.life_span}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

function mapStateToProps(state) {
  return {
    dogDetails: state.dogDetails,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getDogDetails: (id) => dispatch(getDogDetails(id)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DogDetails);
