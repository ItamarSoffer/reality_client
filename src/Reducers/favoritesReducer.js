const favoritesLocalStorage = window.localStorage.getItem('favorites');

const initState = {
    favorites: (favoritesLocalStorage !== null ? JSON.parse(favoritesLocalStorage) : ''),
};

const favoritesReducer = (state = initState, action) => {

    switch(action.type){
        case "FAVORITES_SET":
            window.localStorage.setItem('favorites',JSON.stringify(action.favoritesList));
            state = {...state,
                favorites: action.favoritesList,
            };
            break;
        default:
            break;
    }

    return state;
};

export default favoritesReducer;