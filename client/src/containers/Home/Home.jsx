import React, { useEffect, useState } from "react";
import { getDogs } from "../../redux/actions";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Cards from "../../components/Cards/Cards";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";

const Home = ({ dogsLoaded, getDogs }) => {

  const [dogsToShow, setDogToShow] = useState([]);
  // PAGINATION 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);

  const indexOfLastPost = currentPage * postsPerPage;
  // 1 * 8 = 8
  // 2 * 8 = 16
  // 3 * 8 = 24


  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // 8 - 8 = 0
  // 16 - 8 = 8

  const currentPosts = dogsToShow.slice(indexOfFirstPost, indexOfLastPost);
  /*
  [
    0:{}
    1:{}
    2:{}
    3:{}
    4:{}
    5:{}
    6:{}
    7:{}
  ]
  */

  useEffect(()=>{
    setDogToShow([...currentPosts])
  }, [])

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(async function () {
    await getDogs();
  }, []);

  useEffect(() => {
    setDogToShow([...dogsLoaded]);
  }, [dogsLoaded]);

  return (
    <section className={styles.home}>
      <Navbar />
      <SearchBar setDogToShow={setDogToShow} dogsToShow={dogsToShow} />
      <h1 style={{ color: "white", textAlign: "center" }}>LISTADO DE PERROS</h1>
      <Cards dogs={currentPosts} />
      <Pagination postsPerPage={postsPerPage} totalPosts={dogsToShow.length} paginate={paginate} />
    </section>
  );
};

function mapStateToProps(state) {
  return {
    dogsLoaded: state.dogsLoaded,
  };
}

export default connect(mapStateToProps, { getDogs })(Home);
