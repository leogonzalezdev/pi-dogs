import React, { useEffect } from "react";
import { getDogs } from "../../redux/actions";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Cards from "../../components/Cards/Cards";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = ({ dogsLoaded, getDogs }) => {
  // useEffect(() => {
  //   dispatch(getDogs());
  // }, [dispatch]);
  useEffect(async function () {
    await getDogs();
  }, []);

  return (
    <section className={styles.home}>
      <Navbar />
      <SearchBar />
      <h1 style={{ color: "white", textAlign: "center" }}>LISTADO DE PERROS</h1>
      <Cards dogs={dogsLoaded} />
    </section>
  );
};

function mapStateToProps(state) {
  return {
    dogsLoaded: state.dogsLoaded,
  };
}
// function mapDispatchToProps(dispatch) {
//   return {
//     getDogs: () => dispatch(getDogs()),
//   };
// }

export default connect(mapStateToProps, { getDogs })(Home);
