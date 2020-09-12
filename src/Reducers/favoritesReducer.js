/*
Favorites Reducer:
Saves the favorites of the user as a local json.
The favorites is presented in the sideMenu everywhere, so i didnt want to fetch it from the server everytime.
The favorites will update after these actions:
    1. login
    2. adding favorite
    3. remove favorite
    4. logout
# Its important to save them as Json. otherwise it wont work.
# The rerender is from the refreshing after one of the above action has accrued
 */
const favoritesLocalStorage = window.localStorage.getItem('favorites');

const initState = {
    favorites: (favoritesLocalStorage !== null ? JSON.parse(favoritesLocalStorage) : ''),
    favoritesRerender: false
};

const favoritesReducer = (state = initState, action) => {

    switch(action.type){
        case "FAVORITES_SET":
            window.localStorage.setItem('favorites',JSON.stringify(action.favoritesList));
            state = {...state,
                favorites: action.favoritesList,
            };
            break;
        case "FAVORITES_RERENDER":
            state = {...state, favoritesRerender: action.payload};
            break;
        case "FAVORITES_CLEAR":
            state = {...state, favorites: ''};
            window.localStorage.removeItem('favorites');
            break;
        default:
            break;
    }

    return state;
};

export default favoritesReducer;