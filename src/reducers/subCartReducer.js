let initialState = [];

// load cart items from local storage
if (typeof window !== "undefined") {
  if (localStorage.getItem("subCart")) {
    initialState = JSON.parse(localStorage.getItem("subCart"));
  } else {
    initialState = [];
  }
}

export const subCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_SUBCART":
      return action.payload;
    default:
      return state;
  }
};