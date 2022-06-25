import { Route } from "react-router-dom";
import "./App.module.css";
import CreateBreed from "./containers/CreateBreed/CreateBreed";
import DogDetails from "./containers/DogDetails/DogDetails.jsx";
import Home from "./containers/Home/Home.jsx";
import Welcome from "./containers/Welcome/Welcome.jsx";

function App() {
  return (
    <>
      <Route exact path="/" render={() => <Welcome />} />
      <Route path="/home" render={() => <Home />} />
      <Route
        path="/dogs/:id"
        render={({ match }) => {
          return <DogDetails id={match.params.id} />;
        }}
      />
      <Route path="/createBreed" render={() => <CreateBreed />} />

      {/* <Route
        path="*"
        render={() => (
          <>
            {" "}
            <p>No hay nada acá :) </p> <NavLink to="/home">Go Home</NavLink>
          </>
        )}
      /> */}
    </>
  );
}

export default App;
