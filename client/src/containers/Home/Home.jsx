import React, { useEffect, useRef, useState } from "react";
import { getDogs } from "../../redux/actions";
import { connect } from "react-redux";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Cards from "../../components/Cards/Cards";
import styles from "./Home.module.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Pagination from "../../components/Pagination/Pagination";


const Home = ({ dogsLoaded, getDogs }) => {
  // useEffect(() => {
  //   dispatch(getDogs());
  // }, [dispatch]);
  const pageRef = useRef(1);
  const totalPagesRef = useRef(0)
  const itemsPerPage = 8;

  const [items, setItems] = useState([...dogsLoaded].splice(0, itemsPerPage))

  useEffect(async function () {
    await getDogs();
  }, []);
  
  useEffect(()=>{
    // totalPagesRef.current = (Math.ceil(dogsLoaded.length / 8));
    setTimeout(() => {
      console.log(totalPagesRef);
    },5000);
  }, [dogsLoaded])

  return (
    <section className={styles.home}>
      <Navbar />
      {/* <Pagination pageRef={pageRef} totalPagesRef={totalPagesRef}/> */}
      <SearchBar />
      <h1 style={{ color: "white", textAlign: "center" }}>LISTADO DE PERROS</h1>
      <Cards pageRef={pageRef} totalPagesRef={totalPagesRef}  dogs={dogsLoaded} />
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
