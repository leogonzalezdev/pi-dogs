import { Route } from "react-router-dom";
import CreateBreed from "./containers/CreateBreed/CreateBreed";
import DogDetails from "./containers/DogDetails/DogDetails.jsx";
import Welcome from "./containers/Welcome/Welcome.jsx";
import Home from "./containers/Home/Home.jsx";
import "./App.module.css";
import About from "./containers/About/About";

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
      <Route path="/about" render={() => <About />} />
    </>
  );
}

export default App;
