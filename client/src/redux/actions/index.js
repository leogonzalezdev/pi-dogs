// const axios = require('axios');
import axios from "axios";
import { BASE_URL } from "../../constantes";
export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const GET_DOGS_BY_BREEDS = "GET_DOGS_BY_BREEDS";
export const GET_TEMPERAMENTS = "GET_TEMPERAMENTS";

// ----------  GET  ----------
// export function getDogs() {
//   return function (dispatch) {
//     return fetch("http://localhost:3001/dogs")
//       .then((res) => res.json())
//       .then((json) => {
//         dispatch({ type: "GET_DOGS", payload: json });
//       });
//   };
// }

export function getDogs() {
  return async function (dispatch) {
    const respuesta = await axios(`${BASE_URL}/dogs`);
    dispatch({ type: "GET_DOGS", payload: respuesta.data });
  };
}

export function getDogDetails(id) {
  return function (dispatch) {
    return fetch(`${BASE_URL}/dogs/${id}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOG_DETAILS", payload: json });
      });
  };
}

export function getDogsByBreeds(breed) {
  return function (dispatch) {
    return fetch(`${BASE_URL}/dogs?name=${breed}`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOGS_BY_BREEDS", payload: json });
      });
  };
}

export function getTemperaments() {
  return function (dispatch) {
    return fetch(`${BASE_URL}/temperaments`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_TEMPERAMENTS", payload: json });
      });
  };
}
// ---------- POST ----------
// export function createNewBreed(){
//   return function (dispatch) {
//     return
//   }
// }
