export const GET_DOGS = "GET_DOGS";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const GET_DOGS_BY_BREEDS = "GET_DOGS_BY_BREEDS";

export function getDogs() {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs")
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOGS", payload: json });
      });
  };
}

export function getDogDetails(id) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs/" + id)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOG_DETAILS", payload: json });
      });
  };
}

export function getDogsByBreeds(breed) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs?name=" + breed)
      .then((res) => res.json())
      .then((json) => {
        dispatch({ type: "GET_DOGS_BY_BREEDS", payload: json });
      });
  };
}
