import { SET_FAVORITES, SET_USER } from "../actions/types";

const initialUserState = {
  user: null,
  favorites: [],
};

const rootReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case SET_FAVORITES:
      return {
        ...state,
        favorites: action.favorites,
      };
    default:
      return state;
  }
};

export default rootReducer;
