const initialState = {
  dogsBreeds: [],
  dogsLoaded: [],
  dogDetails: {},
  temperaments: []
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_DOGS") {
    return {
      ...state,
      dogsLoaded: action.payload,
    };
  }
  if (action.type === "GET_DOG_DETAILS") {
    return {
      ...state,
      dogDetails: action.payload,
    };
  }
  if (action.type === "GET_DOGS_BY_BREEDS") {
    return {
      ...state,
      dogsBreeds: action.payload,
    };
  }
  if (action.type === "GET_TEMPERAMENTS") {
    return {
      ...state,
      temperaments: action.payload,
    };
  }
  return state;
}

export default rootReducer;