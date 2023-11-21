import { SET_FAVORITES, SET_USER } from './types'

const setUser = (user) => {
  return {
    type: SET_USER,
    user: user
  };
};
const setFavorites = (favorites) => {
  return {
    type: SET_FAVORITES,
    favorites: favorites
  };
};

export { setUser, setFavorites };
