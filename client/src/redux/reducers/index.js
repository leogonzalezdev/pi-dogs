const initialState = {
  dogsBreeds: [],
  dogsLoaded: [],
  dogDetails: {},
};

function rootReducer(state = initialState, action) {
  if (action.type === "GET_DOGS") {
    return {
      ...state,
      dogsLoaded: action.payload,
      showLoading: action.payload,
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
  return state;
}

export default rootReducer;