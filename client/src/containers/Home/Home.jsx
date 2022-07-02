import React, { useEffect, useState } from "react";
import { getDogs, getTemperaments } from "../../redux/actions";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Cards from "../../components/Cards/Cards";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

const Home = ({ dogsLoaded, getDogs, getTemperaments, temperaments }) => {
  const [dogsToShow, setDogToShow] = useState([]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
 /**
  [
    {},
    {},
    {},
    {},
    {}
  ]
  */
 const indexOfLastPost = currentPage * postsPerPage;
 // 1 * 2 = 2
 // 2 * 2 = 4
 // 3 * 2 = 6
 const indexOfFirstPost = indexOfLastPost - postsPerPage;
 // 2 - 2 = 0
 // 4 - 2 = 2
 // 6 - 2 = 4

  const currentPosts = dogsToShow.slice(indexOfFirstPost, indexOfLastPost);
  
  useEffect(async function () {
    await getDogs();
    await getTemperaments();
  }, []);
  
  useEffect(() => {
    setDogToShow([...currentPosts]);
  }, []);
  
  useEffect(() => {
    setDogToShow([...dogsLoaded]);
  }, [dogsLoaded]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <section className={styles.home}>
      <Navbar />
      <SearchBar setDogToShow={setDogToShow} dogsToShow={dogsToShow} temperaments={temperaments} dogsLoaded={dogsLoaded} setCurrentPage={setCurrentPage}/>
      <h1 style={{ color: "white", textAlign: "center" }}>LISTADO DE PERROS</h1>
      {
        currentPosts.length > 0 
        ? 
        <Cards dogs={currentPosts} />
        : 
        <h3 className={styles.sinRegistros}>No hay resultados.</h3>
      }
      
      {Math.ceil(dogsToShow.length / postsPerPage) > 1 ? (
        <Pagination postsPerPage={postsPerPage} totalPosts={dogsToShow.length} paginate={paginate} />
      ) : null}
    </section>
  );
};

function mapStateToProps(state) {
  return {
    temperaments: state.temperaments,
    dogsLoaded: state.dogsLoaded,
  };
}

export default connect(mapStateToProps, { getDogs, getTemperaments })(Home);
